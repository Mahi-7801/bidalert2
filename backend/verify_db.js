const { pool } = require('./database');
const config = require('./config');

async function verify() {
    try {
        console.log('--- Database Config ---');
        console.log('DB_NAME:', config.database.database);
        console.log('DB_USER:', config.database.user);
        console.log('DB_HOST:', config.database.host);

        const [dbName] = await pool.query('SELECT DATABASE() as db');
        console.log('Active DB:', dbName[0].db);

        const [users] = await pool.query('SELECT id, name, email, role FROM users');
        console.log('--- Users ---');
        console.table(users);
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

verify();
