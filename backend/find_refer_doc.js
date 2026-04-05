const { pool } = require('./database');

async function findReferDoc() {
    try {
        const tables = ['gem_tenders', 'eprocurement_tenders', 'ireps_tenders'];
        for (const table of tables) {
            const [rows] = await pool.query(`SELECT tender_id, tender_ecv, tender_emd FROM ${table} WHERE tender_ecv LIKE '%Refer%' OR tender_emd LIKE '%Refer%'`);
            if (rows.length > 0) {
                console.log(`--- Found "Refer" in ${table} ---`);
                console.table(rows);
            } else {
                console.log(`No "Refer" values in ${table}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

findReferDoc();
