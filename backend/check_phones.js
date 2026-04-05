require('dotenv').config();
const { pool } = require('./database');

async function checkPhone() {
    try {
        const [users] = await pool.query('SELECT name, phone FROM users ORDER BY id DESC LIMIT 5');
        console.log(users);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkPhone();
