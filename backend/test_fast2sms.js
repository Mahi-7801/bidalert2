require('dotenv').config();
const { sendSMS, checkBalance } = require('./fast2sms_service');

async function test() {
    console.log('--- Fast2SMS Test Tool ---');
    
    // 1. Check Balance
    const balance = await checkBalance();
    if (balance.success) {
        console.log(`✅ Connection Successful! Wallet Balance: ₹${balance.wallet}`);
    } else {
        console.error(`❌ Connection Failed: ${balance.error}`);
        console.log('Please check your FAST2SMS_API_KEY in .env');
        return;
    }

    // 2. Optional: Send Test SMS
    // To test sending, uncomment the lines below and replace with your number
    /*
    const testNumber = '9999999999'; 
    const testResult = await sendSMS(testNumber, 'Test message from BidAlert System');
    if (testResult.success) {
        console.log('✅ Test SMS Sent!');
    } else {
        console.error(`❌ Test SMS Failed: ${testResult.error}`);
    }
    */
}

test();
