
const { pool } = require('./database');

async function searchGlobale() {
    try {
        const [rows] = await pool.query("SHOW TABLES LIKE '%global%'");
        console.log('Tables containing "global":', rows);

        const [rows2] = await pool.query("SHOW TABLES LIKE '%tool%'");
        console.log('Tables containing "tool":', rows2);

        // Check if there's a typo like 'globale_tenders' 
        const [rows3] = await pool.query("SHOW TABLES LIKE '%globale%'");
        console.log('Tables containing "globale":', rows3);

        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
searchGlobale();
