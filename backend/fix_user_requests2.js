const { pool } = require('./database');

async function fixTable() {
    try {
        console.log("Modifying user_id column...");
        await pool.query(`ALTER TABLE user_requests MODIFY COLUMN user_id INT NULL`);
        console.log("Modified user_id to allow NULLs");
    } catch(e) { console.log(e.message) }

    try {
        const [rows] = await pool.query('DESCRIBE user_requests');
        console.log(rows);
    } catch(e) { console.log(e.message) }

    console.log("Done");
    process.exit(0);
}

fixTable();
