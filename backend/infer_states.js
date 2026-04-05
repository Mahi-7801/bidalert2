const { pool } = require('./database');

const states = [
    "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

async function inferStates() {
    try {
        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        const [floating] = await pool.query(`
            SELECT id, name_of_work 
            FROM eprocurement_tenders 
            WHERE (state_name IS NULL OR state_name = "") AND ${activeFilter}
        `);
        console.log(`Analyzing ${floating.length} floating tenders...`);

        const inferences = {};
        for (const tender of floating) {
            let found = false;
            for (const state of states) {
                if (tender.name_of_work.toLowerCase().includes(state.toLowerCase())) {
                    inferences[state] = (inferences[state] || 0) + 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Check common cities
                if (tender.name_of_work.toLowerCase().includes('ahmedabad') || tender.name_of_work.toLowerCase().includes('rajkot')) {
                    inferences['Gujarat'] = (inferences['Gujarat'] || 0) + 1;
                } else if (tender.name_of_work.toLowerCase().includes('mumbai') || tender.name_of_work.toLowerCase().includes('pune')) {
                    inferences['Maharashtra'] = (inferences['Maharashtra'] || 0) + 1;
                } else {
                    inferences['Unknown'] = (inferences['Unknown'] || 0) + 1;
                }
            }
        }
        console.table(inferences);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
inferStates();
