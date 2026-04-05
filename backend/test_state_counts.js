const { pool } = require('./database');

async function checkCounts() {
    try {
        console.log('Checking state_name values in gem_tenders:');
        const [gemStates] = await pool.query('SELECT state_name, COUNT(*) as count FROM gem_tenders WHERE state_name IS NOT NULL GROUP BY state_name');
        console.table(gemStates);

        console.log('Checking state_name values in eprocurement_tenders:');
        const [eprocStates] = await pool.query('SELECT state_name, COUNT(*) as count FROM eprocurement_tenders WHERE state_name IS NOT NULL GROUP BY state_name');
        console.table(eprocStates);

        console.log('Checking state_name values in ireps_tenders:');
        const [irepsStates] = await pool.query('SELECT state_name, COUNT(*) as count FROM ireps_tenders WHERE state_name IS NOT NULL GROUP BY state_name');
        console.table(irepsStates);

        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        console.log('Checking with ACTIVE filter as in server.js:');
        const query = `
            SELECT state_name as state, SUM(cnt) as count FROM (
                SELECT state_name, COUNT(*) as cnt FROM gem_tenders WHERE state_name IS NOT NULL AND state_name != '' AND ${activeFilter} GROUP BY state_name
                UNION ALL
                SELECT state_name, COUNT(*) as cnt FROM eprocurement_tenders WHERE state_name IS NOT NULL AND state_name != '' AND ${activeFilter} GROUP BY state_name
                UNION ALL
                SELECT state_name, COUNT(*) as cnt FROM ireps_tenders WHERE state_name IS NOT NULL AND state_name != '' AND ${activeFilter} GROUP BY state_name
            ) as combined
            GROUP BY state_name
            ORDER BY count DESC
        `;
        const [results] = await pool.query(query);
        console.table(results);

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkCounts();
