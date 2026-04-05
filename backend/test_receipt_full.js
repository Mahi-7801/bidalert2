
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
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; color: #333;">
                <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eee; padding: 30px;">
                    <h1 style="color: #004d40;">BidAlert Receipt</h1>
                    <h2 style="margin: 15px 0 5px 0;">₹${amount}</h2>
                    <p>Customer: ${userName}</p>
                    <p>Plan: ${planName}</p>
                    <p>Payment ID: ${paymentId}</p>
                    <p>Date: ${date}</p>
                    <p>Status: ${status.toUpperCase()}</p>
                </div>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

sendReceiptEmail('support@bidalert.in', {
    userName: 'Full Template Test',
    planName: 'Premium',
    amount: '12500',
    paymentId: 'TEST_FULL_' + Date.now(),
    date: new Date().toISOString(),
    status: 'active'
}).then(info => {
    console.log('Full Receipt sent:', info.messageId);
    process.exit(0);
}).catch(err => {
    console.error('Failed:', err.message);
    process.exit(1);
});
