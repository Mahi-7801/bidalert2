const { pool } = require('./database');

async function testInsert() {
    try {
        const [result] = await pool.query(
            'INSERT INTO images (image_url, title) VALUES (?, ?)',
            ['/uploads/test.jpg', 'Test Image']
        );
        console.log('✅ Insert successful, ID:', result.insertId);
        process.exit(0);
    } catch (err) {
        console.error('❌ Insert failed:', err);
        process.exit(1);
    }
}

testInsert();
