
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support@bidalert.in',
        pass: 'hfhukbgfokadttxr'
    }
});

const sendReceiptEmail = async (userEmail, receiptData) => {
    const { userName, planName, amount, paymentId, date, status } = receiptData;

    const mailOptions = {
        from: '"BidAlert Payments" <support@bidalert.in>',
        to: userEmail,
        cc: 'support@bidalert.in',
        subject: `Payment Successful - Receipt for ${planName} Plan`,
        html: `<h1>Test Receipt</h1><p>Amt: ${amount}</p>`
    };

    return transporter.sendMail(mailOptions);
};

console.log('Testing sendReceiptEmail to support@bidalert.in...');
sendReceiptEmail('support@bidalert.in', {
    userName: 'Admin Test',
    planName: 'Basic',
    amount: '1.00',
    paymentId: 'TEST_' + Date.now(),
    date: new Date().toISOString(),
    status: 'active'
}).then(info => {
    console.log('Email sent:', info.messageId);
    process.exit(0);
}).catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
});
