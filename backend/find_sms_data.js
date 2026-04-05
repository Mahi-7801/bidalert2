const { pool } = require('./database');

async function findData() {
    try {
        const keywords = ['gas', 'road', 'software'];
        const results = [];

        for (const kw of keywords) {
            console.log(`Searching for: ${kw}`);
            
            // Query GEM
            const [gemRows] = await pool.query(
                `SELECT tender_id, name_of_work FROM gem_tenders WHERE name_of_work LIKE ? LIMIT 1`, 
                [`%${kw}%`]
            );
            
            // Query eProcurement
            const [eprocRows] = await pool.query(
                `SELECT tender_id, name_of_work FROM eprocurement_tenders WHERE name_of_work LIKE ? LIMIT 1`, 
                [`%${kw}%`]
            );

            results.push({ 
                keyword: kw, 
                items: [...gemRows, ...eprocRows] 
            });
        }

        let msg = "BidAlert Tenders Found:\n";
        results.forEach(res => {
            msg += `\n[${res.keyword.toUpperCase()}]\n`;
            if (res.items.length === 0) {
                msg += "- No current matches\n";
            } else {
                res.items.forEach(item => {
                    msg += `- ${item.name_of_work.substring(0, 40)}... (ID: ${item.tender_id})\n`;
                });
            }
        });
        
        console.log('\n--- MESSAGE TO SEND ---');
        console.log(msg);
        
        process.exit(0);
    } catch (error) {
        console.error('Error searching data:', error);
        process.exit(1);
    }
}

findData();
