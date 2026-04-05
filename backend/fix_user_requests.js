const { pool } = require('./database');

async function fixTable() {
    try {
        console.log("Adding columns if missing...");
        await pool.query(`ALTER TABLE user_requests ADD COLUMN user_name VARCHAR(255)`);
        console.log("Added user_name");
    } catch(e) { console.log(e.message) }
    
    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN user_email VARCHAR(255)`);
        console.log("Added user_email");
    } catch(e) { console.log(e.message) }
    
    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN user_phone VARCHAR(50)`);
        console.log("Added user_phone");
    } catch(e) { console.log(e.message) }
    
    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN keyword VARCHAR(255)`);
        console.log("Added keyword");
    } catch(e) { console.log(e.message) }

    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN state VARCHAR(500)`);
        console.log("Added state");
    } catch(e) { console.log(e.message) }

    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN country VARCHAR(500)`);
        console.log("Added country");
    } catch(e) { console.log(e.message) }

    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN department VARCHAR(255)`);
        console.log("Added department");
    } catch(e) { console.log(e.message) }

    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN duration_value VARCHAR(20)`);
        console.log("Added duration_value");
    } catch(e) { console.log(e.message) }

    try {
        await pool.query(`ALTER TABLE user_requests ADD COLUMN duration_unit VARCHAR(20) DEFAULT 'MONTHS'`);
        console.log("Added duration_unit");
    } catch(e) { console.log(e.message) }

    try {
        await pool.query(`ALTER TABLE user_requests MODIFY COLUMN status ENUM('new','processing','curation','replied','archived','read') DEFAULT 'new'`);
        console.log("Modified status ENUM to include 'read'");
    } catch(e) { console.log(e.message) }

    try {
        const [rows] = await pool.query('DESCRIBE user_requests');
        console.log(rows);
    } catch(e) { console.log(e.message) }

    console.log("Done");
    process.exit(0);
}

fixTable();
