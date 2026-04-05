const { pool } = require('./database');

async function checkData() {
    try {
        const tables = ['gem_tenders', 'eprocurement_tenders', 'ireps_tenders'];
        for (const table of tables) {
            console.log(`--- Sample Data for ${table} ---`);
            const [rows] = await pool.query(`SELECT tender_id, tender_ecv, tender_emd FROM ${table} LIMIT 10`);
            console.table(rows);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

checkData();
