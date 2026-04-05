const { pool } = require('./database');

async function checkImagesTable() {
    try {
        const [rows] = await pool.query('SELECT * FROM images');
        console.log('--- Images in Database ---');
        console.table(rows);
        process.exit(0);
    } catch (err) {
        if (err.code === 'ER_NO_SUCH_TABLE') {
            console.error('❌ Table "images" DOES NOT EXIST.');
        } else {
            console.error('❌ Error querying images:', err);
        }
        process.exit(1);
    }
}

checkImagesTable();
