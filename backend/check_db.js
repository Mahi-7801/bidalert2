
const { pool } = require('./database');
async function check() {
    try {
        const [schema] = await pool.query('DESCRIBE images');
        console.log('Images Table Schema:', JSON.stringify(schema, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
check();
