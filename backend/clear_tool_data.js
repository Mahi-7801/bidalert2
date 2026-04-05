
const { pool } = require('./database');

async function clearTables() {
    const tables = [
        'gem_tenders',
        'eprocurement_tenders',
        'ireps_tenders',
        'temp_tenders_global'
    ];

    console.log('Starting to clear tool-specific tender tables...');

    try {
        for (const table of tables) {
            console.log(`Clearing table: ${table}...`);
            await pool.query(`TRUNCATE TABLE \`${table}\``);
            console.log(`Successfully cleared ${table}.`);
        }

        console.log('Clearing archived records for these tools...');
        const [archiveResult] = await pool.query(`
            DELETE FROM archived_tenders 
            WHERE source_table IN ('GEM', 'eProcurement', 'iREPS', 'Global')
        `);
        console.log(`Successfully deleted ${archiveResult.affectedRows} archived records.`);

        console.log('\nAll specified tool data has been cleared successfully (including archives).');
        process.exit(0);
    } catch (err) {
        console.error('Error clearing tables:', err.message);
        process.exit(1);
    }
}

clearTables();
