const { pool } = require('./database');

async function checkNulls() {
    try {
        console.log('--- gem_tenders ---');
        const [gemTotal] = await pool.query('SELECT COUNT(*) as count FROM gem_tenders');
        const [gemNotNull] = await pool.query('SELECT COUNT(*) as count FROM gem_tenders WHERE state_name IS NOT NULL AND state_name != ""');
        console.log(`Total: ${gemTotal[0].count}, Not NULL: ${gemNotNull[0].count}`);

        console.log('--- eprocurement_tenders ---');
        const [eprocTotal] = await pool.query('SELECT COUNT(*) as count FROM eprocurement_tenders');
        const [eprocNotNull] = await pool.query('SELECT COUNT(*) as count FROM eprocurement_tenders WHERE state_name IS NOT NULL AND state_name != ""');
        console.log(`Total: ${eprocTotal[0].count}, Not NULL: ${eprocNotNull[0].count}`);

        console.log('--- ireps_tenders ---');
        const [irepsTotal] = await pool.query('SELECT COUNT(*) as count FROM ireps_tenders');
        const [irepsNotNull] = await pool.query('SELECT COUNT(*) as count FROM ireps_tenders WHERE state_name IS NOT NULL AND state_name != ""');
        console.log(`Total: ${irepsTotal[0].count}, Not NULL: ${irepsNotNull[0].count}`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkNulls();
