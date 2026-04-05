
const nodemailer = require('nodemailer');
const { pool } = require('./database');
const config = require('./config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support@bidalert.in',
        pass: 'hfhukbgfokadttxr'
    }
});

async function sendTestEmail() {
    try {
        const recipient = "sobhabidalert@gmail.com";
        const [tenders] = await pool.query("SELECT * FROM gem_tenders WHERE tender_id = 'BIDALERT-GEM-26-00572'");

        if (tenders.length === 0) {
            console.log("Tender not found in database.");
            process.exit(1);
        }

        const t = tenders[0];
        const tenderLink = `${config.server.frontendUrl}/tenders/${t.tender_id}`;

        const mailOptions = {
            from: '"BidAlert Test" <support@bidalert.in>',
            to: recipient,
            subject: 'Test Tender Alert: Software Tender in Andhra Pradesh',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                    <h2 style="color: #004d40;">New Tender Found!</h2>
                    <p>Hello,</p>
                    <p>As per your request, we found a matching tender for <strong>Software in Andhra Pradesh</strong>.</p>
                    
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #1a202c;">${t.name_of_work}</p>
                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #4a5568;"><strong>Tender ID:</strong> ${t.tender_id}</p>
                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #4a5568;"><strong>Department:</strong> ${t.tender_dept}</p>
                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #4a5568;"><strong>State:</strong> ${t.state_name}</p>
                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #b91c1c;"><strong>Closing Date:</strong> ${t.closing_date}</p>
                        <div style="margin-top: 15px;">
                            <a href="${tenderLink}" style="display: inline-block; padding: 10px 20px; background-color: #004d40; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">View Details →</a>
                        </div>
                    </div>

                    <p style="font-size: 12px; color: #888;">This is a test notification from BidAlert.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully to ' + recipient);
        console.log('Message ID:', info.messageId);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error sending test email:', error);
        process.exit(1);
    }
}

sendTestEmail();
