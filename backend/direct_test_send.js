const axios = require('axios');

async function testKeySend() {
    const key = 'liC1J9ahFPOIboL40HRvKGQ7AeNsY8VzkXfmMTgnyUuE325ZrSKTyuNRvJP3xWIz1DFi8fGqjVOlEAhd';
    
    try {
        console.log('Testing Fast2SMS Key for Sending (bulkV2)...');
        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
            route: 'q',
            message: 'Test',
            numbers: '9106323130'
        }, {
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

testKeySend();
