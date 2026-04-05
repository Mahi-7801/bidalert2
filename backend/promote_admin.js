const { pool } = require('./database');

async function promoteAdmin() {
    try {
        const [result] = await pool.query("UPDATE users SET role = 'admin' WHERE id = 1 OR email = 'pmahi7801@gmail.com'");
        console.log('✅ Promotion complete:', result.affectedRows, 'users updated to admin.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error promoting users:', err);
        process.exit(1);
    }
}

promoteAdmin();
