
const { pool } = require('./database');

async function checkData() {
    try {
        const [rows] = await pool.query("SELECT * FROM ireps_tenders LIMIT 5");
        console.log('IREPS:', JSON.stringify(rows, null, 2));

        const [rows2] = await pool.query("SELECT * FROM eprocurement_tenders LIMIT 5");
        console.log('eProcurement:', JSON.stringify(rows2, null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
checkData();
