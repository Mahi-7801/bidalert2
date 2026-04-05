const mysql = require('mysql2/promise');
const config = require('./config');

// Create connection pool
const pool = mysql.createPool(config.database);

// Test connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log(`✅ MySQL Database connected successfully! (Database: ${config.database.database})`);

        // Ensure context cache table exists
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tender_context_cache (
                id VARCHAR(255) PRIMARY KEY,
                raw_text LONGTEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
        `);

        connection.release();
        return true;
    } catch (error) {
        console.error('❌ MySQL connection error:', error);
        return false;
    }
}

module.exports = { pool, testConnection };
