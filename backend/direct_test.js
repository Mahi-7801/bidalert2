const axios = require('axios');

async function testKey() {
    const key = 'liC1J9ahFPOIboL40HRvKGQ7AeNsY8VzkXfmMTgnyUuE325ZrSKTyuNRvJP3xWIz1DFi8fGqjVOlEAhd';
    
    try {
        console.log('Testing Fast2SMS Key for Wallet Balance...');
        const response = await axios.get('https://www.fast2sms.com/dev/wallet', {
            headers: {
                'authorization': key
            }
        });
        console.log('SUCCESS!');
        console.log('Response:', response.data);
    } catch (err) {
        console.log('FAILED!');
        if (err.response) {
            console.log('Status:', err.response.status);
            console.log('Data:', err.response.data);
        } else {
            console.log('Error:', err.message);
        }
    }
}

testKey();
