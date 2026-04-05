const { pool } = require('./database');

async function testStats() {
    try {
        console.log('Testing stats queries...');
        
        console.log('1. User count...');
        const [userCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "user"');
        console.log('User count:', userCount[0].count);

        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        console.log('2. Gem tenders...');
        const [gemCount] = await pool.query(`SELECT COUNT(*) as count FROM gem_tenders WHERE ${activeFilter}`);
        console.log('Gem count:', gemCount[0].count);

        console.log('3. Blog posts...');
        const [blogCount] = await pool.query('SELECT COUNT(*) as count FROM blog_posts');
        console.log('Blog count:', blogCount[0].count);

        console.log('4. Subscriptions...');
        const [totalRevenue] = await pool.query('SELECT SUM(amount) as total FROM subscriptions WHERE status = "active"');
        console.log('Total revenue (active):', totalRevenue[0].total);

        console.log('5. Recent requests...');
        const [recentRequests] = await pool.query(`
            SELECT r.*, u.name as user_name, u.email as user_email, u.phone as user_phone 
            FROM user_requests r
            JOIN users u ON r.user_id = u.id
            ORDER BY r.created_at DESC
            LIMIT 5
        `);
        console.log('Recent requests found:', recentRequests.length);

        console.log('✅ All queries succeeded!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Query failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

testStats();
