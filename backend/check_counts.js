const { pool } = require('./database');
async function run() {
    const tables = ['gem_tenders', 'eprocurement_tenders', 'ireps_tenders', 'temp_tenders_global', 'archived_tenders'];
    for (const t of tables) {
        try {
            const [rows] = await pool.query(`SELECT COUNT(*) as count FROM ??`, [t]);
            console.log(`${t}: ${rows[0].count}`);
        } catch (e) {
            console.error(`Error checking ${t}: ${e.message}`);
        }
    }
    pool.end();
}
run();
