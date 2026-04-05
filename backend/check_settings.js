const { pool } = require('./database');

async function checkAppSettingsTable() {
    try {
        const [rows] = await pool.query('SELECT * FROM app_settings');
        console.log('--- App Settings in Database ---');
        console.table(rows);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error querying app_settings:', err);
        process.exit(1);
    }
}

checkAppSettingsTable();
