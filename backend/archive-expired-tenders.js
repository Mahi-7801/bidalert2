const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bid2alert_db'
};

async function archiveExpiredTenders() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database for archiving...');

        // Tables to check for expired tenders
        const sourceTables = ['gem_tenders', 'eprocurement_tenders', 'ireps_tenders', 'temp_tenders_global'];
        
        for (const table of sourceTables) {
            console.log(`Processing ${table}...`);
            
            // 1. Identify expired tenders on table
            // Most tables store deadline as "dd/mm/yyyy" or "yyyy-mm-dd"
            const [rows] = await connection.execute(`
                SELECT * FROM ${table} 
                WHERE (closing_date IS NOT NULL AND closing_date != '')
            `);

            console.log(`Analyzing ${rows.length} rows in ${table} for potential expiry...`);

            const parseDate = (dateStr) => {
                if (!dateStr) return null;
                // Handle 24 MAR 2026 or similar
                const d = new Date(dateStr);
                if (!isNaN(d.getTime())) return d;
                
                // Handle dd/mm/yyyy
                if (dateStr.includes('/')) {
                    const [day, month, year] = dateStr.split(' ')[0].split('/');
                    return new Date(`${year}-${month}-${day}`);
                }
                return null;
            };

            const now = new Date();
            let archivedCount = 0;

            for (const tender of rows) {
                const deadline = tender.deadline || tender.closing_date;
                const deadlineDate = parseDate(deadline);
                
                if (deadlineDate && deadlineDate < now) {
                    try {
                        const tenderId = tender.tender_id || tender.id;
                        
                        // Check if already archived
                        const [existing] = await connection.execute(
                            'SELECT id FROM archived_tenders WHERE tender_id = ?',
                            [tenderId]
                        );

                        if (existing.length === 0) {
                            // 2. Insert into archived_tenders
                            let tableDisplayName = 'Other';
                            if (table === 'gem_tenders') tableDisplayName = 'GEM';
                            else if (table === 'eprocurement_tenders') tableDisplayName = 'eProcurement';
                            else if (table === 'ireps_tenders') tableDisplayName = 'iREPS';
                            else if (table === 'temp_tenders_global') tableDisplayName = 'Global';

                            const columns = ['tender_id', 'name_of_work', 'tender_category', 'tender_dept', 'tender_qty', 'tender_emd', 'emd_exemption', 'tender_ecv', 'state_name', 'location', 'apply_mode', 'source_site', 'gemdoclink', 'doclinks', 'closing_date', 'source_table', 'country', 'city', 'bidalert_user'];
                            
                            const values = [
                                tender.tender_id || null,
                                tender.name_of_work || null,
                                tender.tender_category || null,
                                tender.tender_dept || null,
                                tender.tender_qty || null,
                                tender.tender_emd || null,
                                tender.emd_exemption || null,
                                tender.tender_ecv || null,
                                tender.state_name || null,
                                tender.location || null,
                                tender.apply_mode || null,
                                tender.source_site || null,
                                tender.gemdoclink || tender.globaldoclink || null,
                                tender.doclinks || null,
                                deadline,
                                tableDisplayName,
                                tender.country || null,
                                tender.city || null,
                                tender.bidalert_user || null
                            ];

                            const placeholders = columns.map(() => '?').join(', ');
                            await connection.execute(
                                `INSERT INTO archived_tenders (${columns.join(', ')}) VALUES (${placeholders})`,
                                values
                            );
                            
                            // 3. Delete from original table
                            await connection.execute(`DELETE FROM ${table} WHERE id = ?`, [tender.id]);
                            archivedCount++;
                        } else {
                            // Just delete if already in archive
                            await connection.execute(`DELETE FROM ${table} WHERE id = ?`, [tender.id]);
                        }
                    } catch (err) {
                        console.error(`Error archiving tender from ${table}:`, err.message);
                    }
                }
            }
            console.log(`Finished ${table}. Archived ${archivedCount} tenders.`);
        }

        console.log('Archiving process completed.');
    } catch (error) {
        console.error('Archiving error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

// Run if called directly
if (require.main === module) {
    archiveExpiredTenders();
}

module.exports = archiveExpiredTenders;
