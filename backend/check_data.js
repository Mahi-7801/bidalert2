
const { pool } = require('./database');

async function checkData() {
    try {
        const [rows] = await pool.query("SELECT * FROM gem_tenders LIMIT 5");
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
checkData();
