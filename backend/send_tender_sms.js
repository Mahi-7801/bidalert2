require('dotenv').config();
const axios = require('axios');
const key = process.env.FAST2SMS_API_KEY;

const message = [
    'BidAlert - 48 Tenders Found!',
    'Keyword: Gas & Software',
    '',
    'TOP TENDERS:',
    '1) Rubber Expansion Compensator (Flue Gas) - Closes: 23-Mar',
    '2) DCS Software AMC Dudhsagar Dairy - Closes: 20-Mar',
    '3) Refrigerant Gas Mafron/Floron GSECL Ukai - Closes: 24-Mar',
    '4) Refrigerant Gas for AC Systems KLTPS - Closes: 25-Mar',
    '5) Desktop & MS Office Licenses Dudhsagar - Closes: 18-Mar',
    '6) District Regulating Skid (Vadodara Gas) - Closes: 23-Mar',
    '7) H2 Gas Cylinder Transport GSECL Ukai - Closes: 23-Mar',
    '8) Chlorine Gas Cylinders - Water Treatment - Closes: 20-Mar',
    '',
    '+40 more tenders available.',
    'View full list: bidalert.in',
    '-BidAlert Team'
].join('\n');

console.log('=== Tender SMS Sender ===');
console.log('To: 9106323103');
console.log('Message length:', message.length, 'chars');
console.log('Preview:\n' + message);
console.log('\nSending...');

axios.post('https://www.fast2sms.com/dev/bulkV2', {
    route: 'q',
    message: message,
    numbers: '9106323103',
    flash: 0
}, {
    headers: {
        'authorization': key,
        'Content-Type': 'application/json'
    }
}).then(r => {
    if (r.data.return) {
        console.log('\n✅ SMS Sent Successfully!');
        console.log('Request ID:', r.data.request_id);
    } else {
        console.log('\n❌ Failed:', r.data);
    }
}).catch(e => {
    console.log('\n❌ Error:', e.response ? JSON.stringify(e.response.data) : e.message);
});
