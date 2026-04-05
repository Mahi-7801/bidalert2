const { pool } = require('./database');
const fs = require('fs');
const path = require('path');

async function migrate() {
    try {
        console.log('🚀 Starting migration for archived_tenders table...');
        const sql = fs.readFileSync(path.join(__dirname, 'create-archived-tenders-table.sql'), 'utf8');
        const [results] = await pool.query(sql);
        console.log('✅ Migration successful!', results);
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
