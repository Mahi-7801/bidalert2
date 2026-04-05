
const { pool } = require('./database');

async function listTables() {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        const dbName = 'bidalert_bidalert2';
        const tables = rows.map(row => row[`Tables_in_${dbName}`]);
        console.log('Available tables:');
        console.log(tables);
        process.exit(0);
    } catch (err) {
        console.error('Error listing tables:', err.message);
        process.exit(1);
    }
}

listTables();
