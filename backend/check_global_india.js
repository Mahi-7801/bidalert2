const { pool } = require('./database');

async function checkGlobalIndia() {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM temp_tenders_global WHERE country LIKE "%India%"');
        console.log('India Global Tenders:', rows[0].count);

        const [samples] = await pool.query('SELECT tender_dept, location FROM temp_tenders_global WHERE country LIKE "%India%" LIMIT 5');
        console.table(samples);

        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}
checkGlobalIndia();
