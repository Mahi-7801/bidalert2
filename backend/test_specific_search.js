
const { pool } = require('./database');

async function testSearch() {
    try {
        console.log(`Checking all software tenders...`);

        const tables = ['gem_tenders', 'eprocurement_tenders', 'ireps_tenders', 'temp_tenders_global'];
        let allResults = [];

        for (const table of tables) {
            try {
                const sql = `SELECT * FROM ?? WHERE name_of_work LIKE ? OR tender_id LIKE ?`;
                const [rows] = await pool.query(sql, [table, `%software%`, `%software%`]);
                rows.forEach(r => r.source_table = table);
                allResults = allResults.concat(rows);
            } catch (e) {
                console.log(`Error querying ${table}: ${e.message}`);
            }
        }

        console.log(`Found ${allResults.length} software matches.`);
        allResults.forEach(r => {
            console.log(`- [${r.source_table}] ${r.tender_id}: ${r.name_of_work} | State: ${r.state_name || 'N/A'} | Location: ${r.location || 'N/A'}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Test error:', error);
        process.exit(1);
    }
}

testSearch();
