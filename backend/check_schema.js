const { pool } = require('./database');

async function checkSchema() {
    try {
        const [schema] = await pool.query('DESC eprocurement_tenders');
        console.table(schema);

        // Check some samples with empty state_name
        const [samples] = await pool.query('SELECT tender_dept, location, state_name FROM eprocurement_tenders WHERE state_name IS NULL OR state_name = "" LIMIT 10');
        console.log('Samples with empty state_name:');
        console.table(samples);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkSchema();
