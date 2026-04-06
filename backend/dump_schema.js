const mysql = require('mysql2/promise');
const config = require('./config');

async function dumpSchema() {
    try {
        const pool = mysql.createPool(config.database);
        const connection = await pool.getConnection();
        const [tables] = await connection.query("SHOW TABLES");
        const tableKeys = Object.keys(tables[0]);
        const key = tableKeys[0];

        let schemaString = "";

        for (const row of tables) {
            const tableName = row[key];
            const [createTableResult] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
            schemaString += `-- Table: ${tableName}\n`;
            schemaString += createTableResult[0]['Create Table'] + ";\n\n";
        }

        const fs = require('fs');
        fs.writeFileSync('actual_schema.sql', schemaString);
        console.log("Schema dumped to actual_schema.sql");
        connection.release();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

dumpSchema();
