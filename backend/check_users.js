const { pool } = require('./database');

async function checkUsers() {
    try {
        const [rows] = await pool.query('SELECT id, name, email, role FROM users');
        console.log('--- Users in Database ---');
        console.table(rows);
        process.exit(0);
    } catch (err) {
        console.error('Error querying users:', err);
        process.exit(1);
    }
}

checkUsers();
