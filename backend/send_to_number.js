require('dotenv').config();
const { sendSMS } = require('./fast2sms_service');

const phone = '9106323130';
const message = `BidAlert Tenders Found:

[GAS]
- Construction of Flood Protection Wall to... (ID: BIDALERT-EP-26-242)

[ROAD]
- CONSTRUCTION OF BOX CULVERT (1)... (ID: BIDALERT-EP-26-246)

[SOFTWARE]
- Work Of Comprehensive Operation & M... (ID: BIDALERT-EP-26-1563)

Visit bidalert.in for more info.`;

async function run() {
    console.log(`Attempting to send data to ${phone}...`);
    const result = await sendSMS(phone, message);
    
    if (result.success) {
        console.log('✅ SMS sent successfully!');
    } else {
        console.log('❌ Failed to send SMS.');
        console.log(`Reason: ${result.error}`);
    }
}

run();
