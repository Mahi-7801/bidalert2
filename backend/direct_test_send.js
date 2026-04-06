const axios = require('axios');

async function testDLTSend() {
    const key = 'R7SBxl67LXP1v8vSWyfo9KEOugPkenju9BpaH04usYl8N1tDEFIS8NHZYEHq';

    // Try different routes to find what works
    const routes = ['dlt_manual', 'dlt', 'q', 'p'];

    for (const route of routes) {
        console.log(`\n--- Testing route: "${route}" ---`);
        try {
            const payload = {
                route: route,
                message: 'Hello from BidAlert Test',
                numbers: '6301400137',
                flash: 0
            };

            // For dlt routes, add sender_id
            if (route.startsWith('dlt')) {
                payload.sender_id = 'BIDALT';
            }

            const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', payload, {
                headers: {
                    'authorization': key,
                    'Content-Type': 'application/json'
                }
            });
            console.log('SUCCESS!', JSON.stringify(response.data, null, 2));
        } catch (err) {
            if (err.response) {
                console.log(`FAILED: [${err.response.status}]`, JSON.stringify(err.response.data));
            } else {
                console.log('Error:', err.message);
            }
        }
    }

    // Also check wallet/account info
    console.log('\n--- Checking account wallet ---');
    try {
        const res = await axios.get(`https://www.fast2sms.com/dev/wallet?authorization=${key}`);
        console.log('Wallet:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.log('Wallet check failed:', err.response?.data || err.message);
    }
}

testDLTSend();
