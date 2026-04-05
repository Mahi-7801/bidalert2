/**
 * BidAlert System Health Check
 * Checks: DB connection, table columns, SMS config, email config, plan logic
 */
require('dotenv').config();
const { pool } = require('./database');
const { checkBalance } = require('./fast2sms_service');

async function runHealthCheck() {
    console.log('\n========================================');
    console.log('   BidAlert System Health Check');
    console.log('========================================\n');

    let passed = 0;
    let failed = 0;

    const ok  = (msg) => { console.log(`  ✅  ${msg}`); passed++; };
    const err = (msg) => { console.log(`  ❌  ${msg}`); failed++; };
    const warn = (msg) => { console.log(`  ⚠️   ${msg}`); };

    // ── 1. DATABASE CONNECTION ──────────────────────────────────────
    console.log('[ 1 ] Database Connection');
    try {
        const [rows] = await pool.query('SELECT 1 AS ok');
        if (rows[0].ok === 1) ok('Connected to MySQL');
        else err('MySQL query returned unexpected result');
    } catch (e) {
        err(`Cannot connect to DB: ${e.message}`);
    }

    // ── 2. USERS TABLE ─────────────────────────────────────────────
    console.log('\n[ 2 ] Users Table Columns');
    const requiredUserCols = ['id','name','email','phone','password','role',
        'subscription_status','plan_type','plan_expiry_date',
        'web_access','email_alerts','bidding_guidance','support_24_7','sms_alerts'];
    try {
        const [cols] = await pool.query('SHOW COLUMNS FROM users');
        const colNames = cols.map(c => c.Field);
        for (const col of requiredUserCols) {
            if (colNames.includes(col)) ok(`users.${col} exists`);
            else err(`users.${col} MISSING`);
        }
    } catch (e) {
        err(`Cannot read users table: ${e.message}`);
    }

    // ── 3. SUBSCRIPTIONS TABLE ─────────────────────────────────────
    console.log('\n[ 3 ] Subscriptions Table');
    try {
        const [cols] = await pool.query('SHOW COLUMNS FROM subscriptions');
        const colNames = cols.map(c => c.Field);
        const needed = ['id','user_id','plan_type','amount','razorpay_order_id','status','expires_at'];
        for (const col of needed) {
            if (colNames.includes(col)) ok(`subscriptions.${col} exists`);
            else err(`subscriptions.${col} MISSING`);
        }
    } catch (e) {
        err(`Cannot read subscriptions table: ${e.message}`);
    }

    // ── 4. USER_SAVED_TENDERS TABLE ────────────────────────────────
    console.log('\n[ 4 ] user_saved_tenders Table');
    try {
        const [cols] = await pool.query('SHOW COLUMNS FROM user_saved_tenders');
        const colNames = cols.map(c => c.Field);
        const needed = ['id','user_id','tender_id','source_table','notified_expiry'];
        for (const col of needed) {
            if (colNames.includes(col)) ok(`user_saved_tenders.${col} exists`);
            else err(`user_saved_tenders.${col} MISSING`);
        }
    } catch (e) {
        err(`Cannot read user_saved_tenders table: ${e.message}`);
    }

    // ── 5. NOTIFICATIONS TABLE ─────────────────────────────────────
    console.log('\n[ 5 ] Notifications Table');
    try {
        const [cols] = await pool.query('SHOW COLUMNS FROM notifications');
        const colNames = cols.map(c => c.Field);
        const needed = ['id','user_id','title','message','type','link','is_read'];
        for (const col of needed) {
            if (colNames.includes(col)) ok(`notifications.${col} exists`);
            else err(`notifications.${col} MISSING`);
        }
    } catch (e) {
        err(`Cannot read notifications table: ${e.message}`);
    }

    // ── 6. TENDER TABLES ───────────────────────────────────────────
    console.log('\n[ 6 ] Tender Tables Row Counts');
    const tenderTables = ['gem_tenders','eprocurement_tenders','ireps_tenders','temp_tenders_global','archived_tenders'];
    for (const t of tenderTables) {
        try {
            const [r] = await pool.query(`SELECT COUNT(*) as cnt FROM ${t}`);
            ok(`${t}: ${r[0].cnt} rows`);
        } catch (e) {
            err(`${t}: ${e.message}`);
        }
    }

    // ── 7. ENV VARIABLES ───────────────────────────────────────────
    console.log('\n[ 7 ] Environment Variables');
    const envVars = {
        'DB_HOST': process.env.DB_HOST,
        'DB_USER': process.env.DB_USER,
        'DB_NAME': process.env.DB_NAME,
        'JWT_SECRET': process.env.JWT_SECRET,
        'RAZORPAY_KEY_ID': process.env.RAZORPAY_KEY_ID,
        'RAZORPAY_KEY_SECRET': process.env.RAZORPAY_KEY_SECRET,
        'SMTP_HOST': process.env.SMTP_HOST,
        'SMTP_USER': process.env.SMTP_USER,
        'SMTP_PASS': process.env.SMTP_PASS,
        'FAST2SMS_API_KEY': process.env.FAST2SMS_API_KEY,
    };
    for (const [key, val] of Object.entries(envVars)) {
        if (val && val !== 'YOUR_META_PERMANENT_ACCESS_TOKEN_HERE') {
            ok(`${key} = ${val.substring(0,6)}...`);
        } else {
            err(`${key} NOT SET`);
        }
    }

    // ── 8. SMS WALLET BALANCE ──────────────────────────────────────
    console.log('\n[ 8 ] Fast2SMS Wallet Balance');
    try {
        const result = await checkBalance();
        if (result.success) ok(`Fast2SMS Wallet: ₹${result.wallet}`);
        else err(`Fast2SMS check failed: ${result.error}`);
    } catch (e) {
        err(`Fast2SMS error: ${e.message}`);
    }

    // ── 9. PLAN LOGIC VERIFICATION ─────────────────────────────────
    console.log('\n[ 9 ] Plan Feature Flag Logic (Simulation)');
    const plans = {
        'Basic Plan 1500':    { expected_sms: false, expected_email: false },
        'Standard Plan 3500': { expected_sms: false, expected_email: true  },
        'Diamond Plan 7500':  { expected_sms: false, expected_email: true  },
        'Premium Plan 12500': { expected_sms: true,  expected_email: true  },
        'AP MSME Plan':       { expected_sms: true,  expected_email: true  },
    };
    for (const [planName, exp] of Object.entries(plans)) {
        const p = planName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const sms   = p.includes('premium') || p.includes('msme') || p.includes('apmsme');
        const email = p.includes('standard') || p.includes('diamond') || p.includes('premium') || p.includes('msme');
        if (sms === exp.expected_sms && email === exp.expected_email) {
            ok(`${planName} → SMS:${sms} Email:${email} ✓`);
        } else {
            err(`${planName} → SMS:${sms}(exp:${exp.expected_sms}) Email:${email}(exp:${exp.expected_email}) MISMATCH`);
        }
    }

    // ── 10. SCHEDULER TIMING ───────────────────────────────────────
    console.log('\n[ 10 ] Scheduler Timing');
    const now = new Date();
    const next = new Date();
    next.setUTCHours(8, 30, 0, 0); // 2 PM IST
    if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
    const mins = Math.round((next - now) / 60000);
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    ok(`Next expiry alert fires in ${hours}h ${remMins}m (2:00 PM IST daily)`);

    // ── SUMMARY ────────────────────────────────────────────────────
    console.log('\n========================================');
    console.log(`   PASSED: ${passed}   FAILED: ${failed}`);
    console.log('========================================\n');

    await pool.end();
}

runHealthCheck().catch(e => { console.error('Health check crashed:', e); process.exit(1); });
