const { pool } = require('./database');

async function test() {
    try {
        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        const [rows] = await pool.query(`
            SELECT tender_id, name_of_work, closing_date, state_name, location, tender_dept 
            FROM eprocurement_tenders 
            WHERE (state_name IS NULL OR state_name = "") AND ${activeFilter} 
            LIMIT 10
        `);
        console.table(rows);
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}
test();
