const { pool } = require('./database');

async function checkActiveStates() {
    try {
        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        const [results] = await pool.query(`
            SELECT state_name, COUNT(*) as cnt 
            FROM eprocurement_tenders 
            WHERE ${activeFilter}
            GROUP BY state_name
        `);
        console.table(results);

        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}
checkActiveStates();
