const fs = require('fs');
const { pool } = require('./database');

async function handleImport(req, res, table) {
    let responseSent = false;
    try {
        const stats = fs.statSync(req.file.path);
        const fileContent = fs.readFileSync(req.file.path, 'utf8');
        const allLines = fileContent.split(/\r?\n/).filter(l => l.trim().length > 0);

        console.log(`📊 ROBUST IMPORT: Raw Lines Detected: ${allLines.length}`);

        let successCount = 0;
        let skippedCount = 0;
        let isFirstRow = true;
        const batchSize = 100;

        for (let i = 0; i < allLines.length; i += batchSize) {
            const batch = allLines.slice(i, i + batchSize);

            await Promise.all(batch.map(async (rawLine) => {
                // Regex-based CSV split to handle commas inside quotes
                const values = rawLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
                const row = {};
                values.forEach((v, idx) => { row[String(idx)] = v; });

                if (isFirstRow) {
                    isFirstRow = false;
                    if (Object.values(row).some(v => /tender_id|bid_no/i.test(String(v)))) {
                        skippedCount++;
                        return;
                    }
                }

                try {
                    const clean = (v) => v ? String(v).trim() : '';
                    // GEM/EP Mapping - Updated to include all fields
                    const map = {
                        bidalert_user: '0', tender_id: '1', name_of_work: '2',
                        tender_category: '3', tender_dept: '4', tender_qty: '5',
                        tender_emd: '6', emd_exemption: '7', tender_ecv: '8',
                        state_name: '9', location: '10', apply_mode: '11',
                        source_site: '12', gemdoclink: '13', doclinks: '14',
                        closing_date: '15'
                    };
                    const getValue = (f) => map[f] !== undefined ? clean(row[map[f]]) : '';

                    let tid = getValue('tender_id');
                    if (!tid || tid === '0' || tid === 'tender_id' || tid === 'bid_no') {
                        skippedCount++;
                        return;
                    }

                    // Try to parse closing date if it exists
                    let closing_date_val = '2099-12-31 23:59:59';
                    const rawDate = getValue('closing_date');
                    if (rawDate && rawDate !== 'N/A' && rawDate.length > 5) {
                        closing_date_val = rawDate;
                    }

                    if (table === 'temp_tenders_global') {
                        await pool.query(
                            `INSERT INTO temp_tenders_global (bidalert_user, tender_id, name_of_work, closing_date) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name_of_work=VALUES(name_of_work)`,
                            [getValue('bidalert_user'), tid, getValue('name_of_work'), closing_date_val]
                        );
                    } else {
                        const [resInsert] = await pool.query(
                            `INSERT INTO ?? (
                                bidalert_user, tender_id, name_of_work, tender_category, tender_dept, 
                                tender_qty, tender_emd, emd_exemption, tender_ecv, state_name, 
                                location, apply_mode, source_site, gemdoclink, doclinks, closing_date
                             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
                             ON DUPLICATE KEY UPDATE 
                                name_of_work=VALUES(name_of_work), 
                                tender_dept=VALUES(tender_dept), 
                                state_name=VALUES(state_name),
                                location=VALUES(location),
                                tender_category=VALUES(tender_category),
                                tender_ecv=VALUES(tender_ecv),
                                tender_emd=VALUES(tender_emd),
                                closing_date=VALUES(closing_date),
                                gemdoclink=VALUES(gemdoclink),
                                doclinks=VALUES(doclinks)`,
                            [
                                table,
                                getValue('bidalert_user'), tid, getValue('name_of_work'), getValue('tender_category'), getValue('tender_dept'),
                                getValue('tender_qty'), getValue('tender_emd'), getValue('emd_exemption'), getValue('tender_ecv'), getValue('state_name'),
                                getValue('location'), getValue('apply_mode'), getValue('source_site'), getValue('gemdoclink'), getValue('doclinks'), closing_date_val
                            ]
                        );

                        if (resInsert.insertId) {
                            let sc = table.includes('eprocurement') ? 'EP' : table.includes('gem') ? 'GEM' : table.includes('ireps') ? 'IR' : '';
                            if (sc) {
                                const formattedId = `BIDALERT-${sc}-${new Date().getFullYear().toString().slice(-2)}-${String(resInsert.insertId).padStart(3, '0')}`;
                                await pool.query(`UPDATE ?? SET tender_id = ? WHERE id = ?`, [table, formattedId, resInsert.insertId]);
                            }
                        }
                    }
                    successCount++;
                } catch (rowErr) {
                    console.error('Row skip:', rowErr.message);
                }
            }));

            if (i % 2000 === 0) console.log(`🚀 Import Progress: ${i}/${allLines.length} rows... (Success: ${successCount}, Skipped: ${skippedCount})`);
        }

        try { fs.unlinkSync(req.file.path); } catch (e) { }

        if (successCount > 0) {
            try {
                const tableNameNice = table.replace('_tenders', '').replace('temp_tenders_', '').toUpperCase();
                await pool.query('INSERT INTO notifications (title, message, type, user_id) VALUES (?, ?, ?, ?)',
                    ['🆕 New Tenders Uploaded', `Admin has uploaded ${successCount} new tenders to ${tableNameNice}.`, 'alert', null]);
            } catch (nErr) { console.error('Notification Error:', nErr.message); }
        }

        if (!responseSent) {
            responseSent = true;
            res.json({ success: true, message: `Successfully imported ${successCount} rows.`, stats: { success: successCount, total: allLines.length } });
        }
    } catch (fatal) {
        console.error('Fatal Import Error:', fatal.message);
        if (!responseSent) {
            responseSent = true;
            res.status(500).json({ message: 'Internal error: ' + fatal.message });
        }
    }
}

module.exports = { handleImport };
