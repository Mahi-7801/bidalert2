
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support@bidalert.in',
        pass: 'hfhukbgfokadttxr'
    }
});

const mailOptions = {
    from: '"BidAlert Test" <support@bidalert.in>',
    to: 'support@bidalert.in',
    subject: 'BidAlert System Test',
    text: 'This is a test email to verify the transporter works for support@bidalert.in'
};

console.log('Attempting to send test email to support@bidalert.in...');
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Test Failed:', error.message);
        process.exit(1);
    } else {
        console.log('Test Successful. Message ID:', info.messageId);
        process.exit(0);
    }
});
