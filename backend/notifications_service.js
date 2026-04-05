const { pool } = require('./database');
const config = require('./config');

// Helper to save tenders for user to track expiration
async function saveTendersForUser(userId, tenders) {
    try {
        console.log(`💾 Saving ${tenders.length} tenders for user ${userId}...`);

        for (const tender of tenders) {
            // Determine source table if not provided
            let sourceTable = tender.source_table || tender.source || 'GEM'; // Default fallback

            // Check if already saved
            const [exists] = await pool.query(
                'SELECT id FROM user_saved_tenders WHERE user_id = ? AND tender_id = ?',
                [userId, tender.tender_id || tender.id]
            );

            if (exists.length === 0) {
                await pool.query(
                    'INSERT INTO user_saved_tenders (user_id, tender_id, source_table) VALUES (?, ?, ?)',
                    [userId, tender.tender_id || tender.id, sourceTable]
                );
            }
        }
        console.log(`✅ Saved tenders for user ${userId}`);
    } catch (error) {
        console.error('❌ Error saving tenders for user:', error.message);
    }
}

// Job to check expiring tenders and notify users
async function checkExpiringSavedTenders() {
    try {
        console.log('⏰ Checking for expiring saved tenders...');

        // We need to check each source table.
        // The date format in DB is 'DD-MM-YYYY HH:mm:ss' or 'DD-MM-YYYY'
        // We use STR_TO_DATE for comparison.

        // Define query for a specific table
        const checkTable = async (tableName, sourceName, pathPrefix = '/tenders') => {
            const query = `
                SELECT 
                    ust.id as saved_id, 
                    ust.user_id,
                    u.email,
                    u.phone,
                    u.name as user_name,
                    u.email_alerts as can_email,
                    u.sms_alerts as can_sms,
                    t.tender_id,
                    t.name_of_work,
                    t.closing_date,
                    t.tender_category,
                    '${pathPrefix}' as path_prefix
                FROM user_saved_tenders ust
                JOIN ${tableName} t ON ust.tender_id COLLATE utf8mb4_unicode_520_ci = t.tender_id
                JOIN users u ON ust.user_id = u.id
                WHERE (ust.source_table = ? OR ust.source_table = ?)
                AND ust.notified_expiry = FALSE
                AND (
                    CASE 
                        WHEN t.closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}' THEN STR_TO_DATE(t.closing_date, '%Y-%m-%d %H:%i:%s')
                        WHEN t.closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(t.closing_date, '%Y-%m-%d')
                        WHEN t.closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}' THEN STR_TO_DATE(t.closing_date, '%d-%m-%Y %H:%i:%s')
                        WHEN t.closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(t.closing_date, '%d-%m-%Y')
                        ELSE NULL
                    END
                ) BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 48 HOUR)
            `;

            const [results] = await pool.query(query, [sourceName, sourceName.toLowerCase()]);
            return results;
        };

        // Check all 4 tables
        const gemExpiring = await checkTable('gem_tenders', 'GEM');
        const eprocExpiring = await checkTable('eprocurement_tenders', 'eProcurement');
        const irepsExpiring = await checkTable('ireps_tenders', 'iREPS');
        const globalExpiring = await checkTable('temp_tenders_global', 'Global', '/global-tenders');

        const allExpiring = [...gemExpiring, ...eprocExpiring, ...irepsExpiring, ...globalExpiring];

        if (allExpiring.length > 0) {
            console.log(`🔔 Found ${allExpiring.length} expiring tenders to notify.`);
            const { sendSMS } = require('./fast2sms_service');
            const nodemailer = require('nodemailer');

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT) || 465,
                secure: process.env.SMTP_PORT == '465',
                auth: {
                    user: process.env.SMTP_USER || 'support@bidalert.in',
                    pass: process.env.SMTP_PASS || 'hfhukbgfokadttxr'
                }
            });

            for (const item of allExpiring) {
                // 1. In-App Notification (Bell Icon) - Always send for saved tenders
                const title = `Tender Expiring Soon: ${item.tender_id}`;
                const message = `The tender "${(item.name_of_work || 'Untitled Tender').substring(0, 50)}..." is closing on ${item.closing_date}. Please submit your bid immediately.`;
                const link = `${item.path_prefix}/${item.tender_id}`;

                await pool.query(
                    'INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, ?, ?, ?, ?)',
                    [item.user_id, title, message, 'tender_close', link]
                );

                // 2. Email Alert (Premium Feature)
                if (item.can_email && item.email) {
                    const mailOptions = {
                        from: `"BidAlert Alerts" <${process.env.SMTP_USER || 'support@bidalert.in'}>`,
                        to: item.email,
                        subject: `🚨 URGENT: Tender Expiring - ${item.tender_id}`,
                        html: `
                            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ff4444; border-radius: 10px; max-width: 600px;">
                                <h2 style="color: #ff4444;">Tender Closing Soon!</h2>
                                <p>Hello ${item.user_name || 'User'},</p>
                                <p>The following tender you followed is closing in less than 48 hours:</p>
                                <div style="background: #fdf2f2; padding: 15px; border-radius: 5px; margin: 15px 0;">
                                    <strong>ID:</strong> ${item.tender_id}<br>
                                    <strong>Title:</strong> ${item.name_of_work}<br>
                                    <strong>Deadline:</strong> ${item.closing_date}
                                </div>
                                <p>Please ensure your documentation and bid submission are completed before the deadline.</p>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                <p style="font-size: 12px; color: #888;">This is a premium alert from your BidAlert Subscription.</p>
                            </div>
                        `
                    };
                    transporter.sendMail(mailOptions).catch(err => console.error(`Email failed for user ${item.user_id}:`, err.message));
                }

                // 3. SMS Alert (Premium Feature)
                if (item.can_sms && item.phone) {
                    const smsMsg = `🚨 URGENT: Tender ${item.tender_id} is closing soon (${item.closing_date}). Check your email or login to BidAlert to take action.`;
                    sendSMS(item.phone, smsMsg).catch(err => console.error(`SMS failed for user ${item.user_id}:`, err.message));
                }

                // Mark as notified
                await pool.query(
                    'UPDATE user_saved_tenders SET notified_expiry = TRUE WHERE id = ?',
                    [item.saved_id]
                );
            }
            console.log(`✅ Sent ${allExpiring.length} notifications.`);
        } else {
            console.log('✅ No expiring saved tenders found.');
        }

    } catch (error) {
        console.error('❌ Error checking expiring tenders:', error.message);
    }
}

// Helper to notify all users
async function notifyAllUsers(title, message, link, type = 'system') {
    try {
        console.log(`📣 Notifying all users: ${title}`);

        // Get all user IDs
        const [users] = await pool.query('SELECT id FROM users');

        if (users.length === 0) return;

        // Insert notification for each user
        const values = users.map(user => [user.id, title, message, type, link]);

        await pool.query(
            'INSERT INTO notifications (user_id, title, message, type, link) VALUES ?',
            [values]
        );

        console.log(`✅ Sent global notification to ${users.length} users.`);
    } catch (error) {
        console.error('❌ Error notifying all users:', error.message);
    }
}

// Job to check for expired subscriptions
async function checkSubscriptionExpirations() {
    try {
        console.log('⏰ Checking for expired user subscriptions...');

        // Find users whose plans have just expired
        // We look for 'pro' status users with expiry date in the past
        const [expiredUsers] = await pool.query(`
            SELECT id, name, email, plan_type 
            FROM users 
            WHERE subscription_status = 'pro' 
            AND plan_expiry_date < NOW()
        `);

        if (expiredUsers.length > 0) {
            console.log(`📉 Found ${expiredUsers.length} expired subscriptions to process.`);
            const nodemailer = require('nodemailer');

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT) || 465,
                secure: process.env.SMTP_PORT == '465',
                auth: {
                    user: process.env.SMTP_USER || 'support@bidalert.in',
                    pass: process.env.SMTP_PASS || 'hfhukbgfokadttxr'
                }
            });

            for (const user of expiredUsers) {
                // 1. Update User Table - Downgrade to free/expired
                await pool.query(`
                    UPDATE users SET 
                        subscription_status = 'expired',
                        web_access = 0,
                        email_alerts = 0,
                        bidding_guidance = 0,
                        support_24_7 = 0,
                        sms_alerts = 0
                    WHERE id = ?
                `, [user.id]);

                // 2. Update Subscriptions Table
                await pool.query(`
                    UPDATE subscriptions SET status = 'expired' 
                    WHERE user_id = ? AND status = 'active'
                `, [user.id]);

                // 3. Create In-App Notification (Bell Icon)
                const title = "Plan Expired 🚨";
                const message = `Your ${user.plan_type || 'Premium'} plan has expired. Please renew your subscription to continue accessing professional tender insights.`;

                await pool.query(
                    'INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, ?, ?, ?, ?)',
                    [user.id, title, message, 'subscription_expiry', '/plans']
                );

                // 4. Send Email Notification
                if (user.email) {
                    const mailOptions = {
                        from: `"BidAlert Billing" <${process.env.SMTP_USER || 'support@bidalert.in'}>`,
                        to: user.email,
                        subject: `Your BidAlert Plan has Expired - Action Required`,
                        html: `
                            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 12px; max-width: 600px;">
                                <div style="text-align: center; margin-bottom: 20px;">
                                    <h1 style="color: #41a367; margin: 0;">BidAlert</h1>
                                </div>
                                <h2 style="color: #333;">Subscription Expired</h2>
                                <p>Hello ${user.name || 'User'},</p>
                                <p>We wanted to let you know that your <strong>${user.plan_type || 'Basic'}</strong> plan has expired.</p>
                                <div style="background: #fff8f8; border-left: 4px solid #ff4444; padding: 15px; margin: 20px 0;">
                                    <p style="margin: 0; color: #cc0000; font-weight: bold;">Standard access and smart alerts have been paused.</p>
                                </div>
                                <p>To continue enjoying uninterrupted access to tender opportunities and AI tools, please renew your plan.</p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/plans" 
                                       style="background: #41a367; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                        Renew Subscription Now
                                    </a>
                                </div>
                                <p style="font-size: 13px; color: #666;">If you have any questions, reply to this email or contact support.</p>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                <p style="font-size: 11px; color: #999; text-align: center;">© 2026 BidAlert Management Portal. All rights reserved.</p>
                            </div>
                        `
                    };
                    transporter.sendMail(mailOptions).catch(err => console.error(`Expiration email failed for user ${user.id}:`, err.message));
                }
            }
            console.log(`✅ Processed ${expiredUsers.length} expired subscriptions.`);
        }
    } catch (error) {
        console.error('❌ Error checking subscription expirations:', error.message);
    }
}

module.exports = {
    saveTendersForUser,
    checkExpiringSavedTenders,
    notifyAllUsers,
    checkSubscriptionExpirations
};
