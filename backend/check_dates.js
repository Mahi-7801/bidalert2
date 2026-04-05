const { pool } = require('./database');

async function checkFutureTenders() {
    try {
        const [rows] = await pool.query(`
            SELECT COUNT(*) as count 
            FROM eprocurement_tenders 
            WHERE 
                (CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                    ELSE NULL
                END >= CURDATE())
                OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        `);
        console.log('Total Active/Future Tenders in eprocurement_tenders:', rows[0].count);

        const [lastDates] = await pool.query('SELECT closing_date FROM eprocurement_tenders ORDER BY closing_date DESC LIMIT 5');
        console.log('Recent closing dates (DESC):');
        console.table(lastDates);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkFutureTenders();
