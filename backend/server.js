require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const { body, validationResult } = require('express-validator');
const { pool, testConnection } = require('./database');
const config = require('./config');
const { extractText, analyzeTender, processBidGPTQuery } = require('./analyzer_handler');
const { saveTendersForUser, checkExpiringSavedTenders, notifyAllUsers, checkSubscriptionExpirations } = require('./notifications_service');
const { sendSMS } = require('./fast2sms_service');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_PORT == '465', // true for 465, false for other ports
    pool: true,
    maxConnections: 5,
    auth: {
        user: process.env.SMTP_USER || 'support@bidalert.in',
        pass: process.env.SMTP_PASS || 'hfhukbgfokadttxr'
    }
});

// Very simple headers to look like a personal reply
const defaultMailHeaders = {
    "X-Priority": "3" // Normal priority
};

// Server restarting...
console.log('🔄 Server restarting...');

const app = express();
const Razorpay = require('razorpay');

// Add global error handlers
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Razorpay initialization
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});


// Middleware
// Middleware
app.use(cors());
// Add Content Security Policy and Permissions-Policy middleware
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob: http: https:; frame-src *; connect-src *;"
    );
    res.setHeader(
        "Permissions-Policy",
        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=*, usb=()"
    );
    next();
});
app.use(express.json());
// Serve uploaded and exported files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/exports', express.static(path.join(__dirname, 'public/exports')));

// ==================== PASSPORT & SESSION SETUP ====================
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

app.use(session({
    secret: process.env.SESSION_SECRET || 'bidalert-session-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ==================== FILE UPLOAD SETUP ====================
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('Google Profile:', profile.emails?.[0]?.value);
            const email = profile.emails?.[0]?.value;

            if (!email) {
                console.error('Google Auth Error: No email found in profile');
                return done(new Error('No email found in Google profile'), null);
            }

            const name = profile.displayName;

            // Find or create user
            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            let user;
            if (users.length === 0) {
                const [result] = await pool.query(
                    'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
                    [name, email, 'oauth-user', '']
                );
                user = { id: result.insertId, name, email };
            } else {
                user = users[0];
            }
            return done(null, user);
        } catch (err) {
            console.error('Google Auth Error:', err);
            return done(err, null);
        }
    }));
}

// OAuth Routes - Always register to prevent 404s
app.get('/api/auth/google', (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return res.status(500).send('Google Authentication is not configured. Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env file.');
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/api/auth/google/callback', (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        return res.status(500).send('Google Authentication is not configured.');
    }
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` })(req, res, next);
}, (req, res) => {
    const token = jwt.sign({ userId: req.user.id, email: req.user.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}&user=${JSON.stringify(req.user)}`);
});

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/github/callback`,
        userAgent: 'bidalert'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('GitHub Profile Raw:', JSON.stringify(profile));
            const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
            const name = profile.displayName || profile.username;
            console.log('GitHub Auth processing for:', email);

            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            let user;
            if (users.length === 0) {
                const [result] = await pool.query(
                    'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
                    [name, email, 'oauth-user', '']
                );
                user = { id: result.insertId, name, email };
            } else {
                user = users[0];
            }
            return done(null, user);
        } catch (err) {
            console.error('GitHub Auth Error:', err);
            return done(err, null);
        }
    }));
}

// OAuth Routes - Always register to prevent 404s
app.get('/api/auth/github', (req, res, next) => {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        return res.status(500).send('GitHub Authentication is not configured. Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in .env file.');
    }
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

app.get('/api/auth/github/callback', (req, res, next) => {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        return res.status(500).send('GitHub Authentication is not configured.');
    }
    passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` })(req, res, next);
}, (req, res) => {
    const token = jwt.sign({ userId: req.user.id, email: req.user.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}&user=${JSON.stringify(req.user)}`);
});

// Test database connection on startup
testConnection();

// ==================== AUTH ROUTES ====================

// Register endpoint
app.post('/api/auth/register',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').trim().notEmpty().withMessage('Phone number is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, phone, password } = req.body;

            // Check if user already exists
            const [existingUsers] = await pool.query(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );

            if (existingUsers.length > 0) {
                return res.status(400).json({ message: 'User already exists with this email' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            const [result] = await pool.query(
                'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
                [name, email, phone, hashedPassword]
            );

            // Generate JWT token
            const token = jwt.sign(
                { userId: result.insertId, email },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: result.insertId,
                    name,
                    email,
                    phone
                }
            });
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({ message: 'Server error during registration' });
        }
    }
);

// Login endpoint
app.post('/api/auth/login',
    [
        // Removed isEmail() validation to allow "bidalert1" username
        body('email').notEmpty().withMessage('Username/Email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            // Hardcoded Admin Login (Bypasses Database)
            if (email === 'support@bidalert.in' && password === 'ajay_kumar@bidalert$123') {
                const token = jwt.sign(
                    { userId: 'admin_hardcoded', email: email },
                    config.jwt.secret,
                    { expiresIn: config.jwt.expiresIn }
                );

                return res.json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: 'admin_hardcoded',
                        name: 'System Admin',
                        email: email,
                        phone: '9106323130',
                        role: 'admin',
                        subscription_status: 'pro',
                        plan_type: 'premium',
                        plan_expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 10)), // 10 years from now
                        web_access: true,
                        email_alerts: true,
                        bidding_guidance: true,
                        support_24_7: true
                    }
                });
            }

            // Find user
            const [users] = await pool.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = users[0];

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    subscription_status: user.subscription_status,
                    plan_type: user.plan_type,
                    plan_expiry_date: user.plan_expiry_date,
                    web_access: user.web_access,
                    email_alerts: user.email_alerts,
                    bidding_guidance: user.bidding_guidance,
                    support_24_7: user.support_24_7
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error during login' });
        }
    }
);

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Admin check middleware
const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.userId) {
            console.warn('🚫 Admin access denied: No user ID in token');
            return res.status(403).json({ message: 'Access denied. Invalid token session.' });
        }

        // Bypass for hardcoded admin
        if (req.user.userId === 'admin_hardcoded') {
            return next();
        }

        console.log('🛡️ Admin check for user ID:', req.user.userId);
        const [users] = await pool.query('SELECT role FROM users WHERE id = ?', [req.user.userId]);

        if (users.length > 0) {
            const userRole = String(users[0].role || '').toLowerCase().trim();
            console.log(`👤 User ID ${req.user.userId} role in DB: "${userRole}"`);

            if (userRole === 'admin') {
                return next();
            }
        }

        console.warn(`🚫 Admin access denied for user: ${req.user.userId}. Role found: ${users[0]?.role || 'none'}`);
        res.status(403).json({
            message: 'Access denied. Admin role required.',
            userId: req.user.userId,
            roleFound: users[0]?.role || 'none'
        });
    } catch (error) {
        console.error('❌ Admin check error:', error);
        res.status(500).json({ message: 'Server error during admin check' });
    }
};

// ==================== ADMIN NOTIFICATION ROUTES ====================

// Get notification counts for admin dashboard
app.get('/api/admin/notifications/count', authenticateToken, isAdmin, async (req, res) => {
    try {
        const userId = req.user.userId;

        // 1. Count unresolved user requests (requirements)
        const [requests] = await pool.query(
            'SELECT COUNT(*) as count FROM user_requests WHERE status = "new"'
        );

        // 2. Count unread general alerts and messages from notifications table
        const [notifCounts] = await pool.query(`
            SELECT 
                SUM(CASE WHEN type = 'alert' AND is_read = 0 THEN 1 ELSE 0 END) as alerts,
                SUM(CASE WHEN type = 'message' AND is_read = 0 THEN 1 ELSE 0 END) as messages
            FROM notifications
            WHERE user_id IS NULL OR user_id = ?
        `, [userId]);

        const requirementsCount = requests[0]?.count || 0;
        const alertsCount = notifCounts[0]?.alerts || 0;
        const messagesCount = notifCounts[0]?.messages || 0;

        res.json({
            success: true,
            requirements: requirementsCount,
            alerts: alertsCount,
            messages: messagesCount,
            total: requirementsCount + alertsCount + messagesCount
        });
    } catch (error) {
        console.error('❌ Notification counts error:', error.message);
        res.status(500).json({ success: false, message: 'Database error fetching counts. Ensure MySQL is running.' });
    }
});

// Mark notifications as read
app.post('/api/admin/user-requests/mark-all-read', authenticateToken, isAdmin, async (req, res) => {
    try {
        await pool.query('UPDATE notifications SET is_read = 1 WHERE type = "requirement"');
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error marking read' });
    }
});

app.post('/api/admin/alerts/mark-all-read', authenticateToken, isAdmin, async (req, res) => {
    try {
        await pool.query('UPDATE notifications SET is_read = 1 WHERE type = "alert"');
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error marking read' });
    }
});

// Get recent notifications (Global)
app.get('/api/notifications', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM notifications WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 20',
            [req.user.userId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Notifications error:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
});

// ==================== USER REQUESTS ROUTES ====================

// Create notifications table if not exists
pool.query(`
    CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255),
        message TEXT,
        type VARCHAR(50) DEFAULT 'alert',
        link VARCHAR(255),
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).catch(err => console.error('notifications table error:', err.message));

// Create user_requests table if not exists (auto-setup)
pool.query(`
    CREATE TABLE IF NOT EXISTS user_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        user_name VARCHAR(255),
        user_email VARCHAR(255),
        user_phone VARCHAR(50),
        message TEXT NOT NULL,
        keyword VARCHAR(255),
        state VARCHAR(500),
        country VARCHAR(500),
        department VARCHAR(255),
        duration_value VARCHAR(20),
        duration_unit VARCHAR(20) DEFAULT 'MONTHS',
        status ENUM('new','processing','curation','replied','archived','read') DEFAULT 'new',
        last_sent_at DATETIME NULL,
        matches_found INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).then(async () => {
    // Migration: Check for last_sent_at and matches_found columns
    try {
        const [sentCols] = await pool.query('SHOW COLUMNS FROM user_requests LIKE "last_sent_at"');
        if (sentCols.length === 0) {
            await pool.query('ALTER TABLE user_requests ADD COLUMN last_sent_at DATETIME NULL AFTER status');
            console.log('✅ Added last_sent_at column to user_requests');
        }
        const [matchCols] = await pool.query('SHOW COLUMNS FROM user_requests LIKE "matches_found"');
        if (matchCols.length === 0) {
            await pool.query('ALTER TABLE user_requests ADD COLUMN matches_found INT DEFAULT 0 AFTER last_sent_at');
            console.log('✅ Added matches_found column to user_requests');
        }
    } catch (err) {
        console.error('Migration error (user_requests):', err.message);
    }
}).catch(err => console.error('user_requests table error:', err.message));

// Create app_settings table if not exists
pool.query(`
    CREATE TABLE IF NOT EXISTS app_settings (
        setting_key VARCHAR(255) PRIMARY KEY,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`).catch(err => console.error('app_settings table error:', err.message));

// Create images table if not exists as requested
pool.query(`
    CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_name VARCHAR(255),
        image_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).catch(err => console.error('images table error:', err.message));

// Create subscriptions table if not exists
pool.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        plan_type VARCHAR(255),
        amount DECIMAL(10, 2),
        razorpay_order_id VARCHAR(255),
        razorpay_payment_id VARCHAR(255),
        razorpay_signature TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        expires_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).catch(err => console.error('subscriptions table error:', err.message));

// POST /api/user-requests — User submits a new tender requirement
app.post('/api/user-requests', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { message, keyword, state, country, department, duration_value, duration_unit } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // Get user info and subscription status
        const [[userFromDb]] = await pool.query('SELECT name, email, phone, role FROM users WHERE id = ?', [userId]);

        // Fallback: if admin_hardcoded, DB returns no row — use known admin details
        const user = userFromDb || (userId === 'admin_hardcoded' ? {
            name: 'Admin',
            email: process.env.SMTP_USER || 'support@bidalert.in',
            phone: '9106323130',
            role: 'admin'
        } : null);

        const [subscriptions] = await pool.query(
            'SELECT status, plan_type FROM subscriptions WHERE user_id = ? AND status = "active" AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
            [userId]
        );

        // Treat Admins as premium users for testing purposes
        const hasActivePlan = subscriptions.length > 0 || (user?.role === 'admin' || userId === 'admin_hardcoded');
        const dbUserId = userId === 'admin_hardcoded' ? null : userId;

        await pool.query(
            `INSERT INTO user_requests (user_id, user_name, user_email, user_phone, message, keyword, state, country, department, duration_value, duration_unit, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                dbUserId,
                user?.name || 'Admin',
                user?.email || 'admin@bidalert.in',
                user?.phone || '',
                message.trim(),
                keyword || '',
                state || '',
                country || '',
                department || '',
                duration_value || '1',
                duration_unit || 'MONTHS',
                hasActivePlan ? 'processing' : 'new'
            ]
        );

        // Logic: If user has active plan, send automatic email
        console.log(`🔍 Checking subscription for User #${userId}. Active Plan Found: ${hasActivePlan}`);

        if (hasActivePlan) {
            const mailOptions = {
                from: `"BidAlert Support" <${process.env.SMTP_USER || 'support@bidalert.in'}>`,
                to: user.email,
                subject: `Requirement received: ${user.name}`,
                text: `Hi ${user.name},\n\nWe have received your request for: "${keyword || message.substring(0, 30)}".\n\nOur team is working on it and we will send the list to you shortly.\n\nBest regards,\nBidAlert Support`,
                html: `
                    <div style="font-family: Arial, sans-serif; border: 1px solid #eee; border-radius: 10px; padding: 20px; max-width: 600px;">
                        <h2 style="color: #00C853;">Hello ${user.name},</h2>
                        <p>We have successfully received your tender request for: <strong>"${keyword || message.substring(0, 40)}"</strong>.</p>
                        <p>Our team is searching for matches and will update you shortly.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #888;">This is an automated confirmation from BidAlert Support.</p>
                    </div>
                `
            };

            // Add in-app notification for the user
            if (dbUserId !== null) {
                await pool.query(
                    'INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, ?, ?, ?, ?)',
                    [dbUserId, 'Requirement Submitted', `We've received your request for "${keyword || 'Tenders'}". Manual verification is in progress.`, 'alert', '/my-requests']
                );
            }

            transporter.sendMail(mailOptions)
                .then(info => {
                    const log = `[${new Date().toLocaleString()}] ✅ Auto-Confirmation Email sent to ${user.email}\n`;
                    console.log(log);
                    require('fs').appendFileSync(path.join(__dirname, 'email_debug.log'), log);
                })
                .catch(err => {
                    const log = `[${new Date().toLocaleString()}] ❌ Auto-Confirmation Email FAILED to ${user.email}: ${err.message}\n`;
                    console.error(log);
                    require('fs').appendFileSync(path.join(__dirname, 'email_debug.log'), log);
                });

            // Send SMS and WhatsApp notifications
            if (user.phone) {
                const cleanName = String(user.name || '').substring(0, 15);
                const smsMessage = `Hi ${cleanName} 👋\nWe’ve received your request for ${keyword || 'Tenders'} tenders. 🔍\n📩 Full details are sent to your email. Please check your inbox (and spam folder).\n– BidAlert`;
                sendSMS(user.phone, smsMessage).catch(console.error);
            }

        }

        res.json({
            success: true,
            message: 'Request submitted successfully',
            isPremium: hasActivePlan
        });
    } catch (error) {
        console.error('Create user request error:', error);
        res.status(500).json({ message: 'Error submitting request' });
    }
});

// GET /api/user-requests/me — Logged-in user sees their own requests
app.get('/api/user-requests/me', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const [rows] = await pool.query(
            'SELECT * FROM user_requests WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Get my requests error:', error);
        res.status(500).json({ message: 'Error fetching requests' });
    }
});

// GET /api/admin/user-requests — Admin views all user requests
app.get('/api/admin/user-requests', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM user_requests ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Admin get requests error:', error);
        res.status(500).json({ message: 'Error fetching user requests' });
    }
});

// PATCH /api/admin/user-requests/:id — Admin updates request status (mark read / archive)
app.patch('/api/admin/user-requests/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowed = ['new', 'processing', 'curation', 'replied', 'archived', 'read'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        await pool.query('UPDATE user_requests SET status = ? WHERE id = ?', [status, id]);
        res.json({ success: true, message: 'Status updated' });
    } catch (error) {
        console.error('Update request status error:', error);
        res.status(500).json({ message: 'Error updating status' });
    }
});

// POST /api/admin/auto-send-matches — Admin sends matching tenders via email to the user
app.post('/api/admin/auto-send-matches', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { requestId } = req.body;
        if (!requestId) return res.status(400).json({ message: 'requestId is required' });

        const [reqs] = await pool.query('SELECT * FROM user_requests WHERE id = ?', [requestId]);
        if (reqs.length === 0) return res.status(404).json({ message: 'Request not found' });

        const request = reqs[0];

        // Search for matching tenders across ALL tables (GeM, eProc, IREPS, Global)
        const searchQuery = request.keyword || request.message?.substring(0, 40) || '';
        const searchResult = await getTendersLogic({
            q: searchQuery,
            limit: 10,
            state: request.state,
            country: request.country,
            category: request.category || request.department
        });
        const tenders = searchResult.tenders || [];

        // Format tender list as HTML email
        let tenderListHtml = '';
        if (tenders.length > 0) {
            tenderListHtml = tenders.map((t, i) =>
                `<tr>
                    <td style="padding:10px;border-bottom:1px solid #eee">${i + 1}</td>
                    <td style="padding:10px;border-bottom:1px solid #eee">${t.title}</td>
                    <td style="padding:10px;border-bottom:1px solid #eee">${t.authority}</td>
                    <td style="padding:10px;border-bottom:1px solid #eee">${t.state || t.country || 'N/A'}</td>
                    <td style="padding:10px;border-bottom:1px solid #eee">${t.deadline || 'N/A'}</td>
                </tr>`
            ).join('');
        } else {
            tenderListHtml = '<tr><td colspan="5" style="padding:20px;text-align:center;color:#888">No matching tenders found for this keyword. Try a different search term.</td></tr>';
        }

        const emailHtml = `
            <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden">
                <div style="background:#0D1B2A;padding:30px;text-align:center">
                    <h1 style="color:#00C853;margin:0;font-size:24px">BidAlert</h1>
                    <p style="color:#fff;margin:8px 0 0;font-size:13px">${req.body.customReply ? 'Response to your Inquiry' : 'Tender Match Results'}</p>
                </div>
                <div style="padding:30px">
                    <p style="color:#333">Hi <strong>${request.user_name || 'User'}</strong>,</p>
                    
                    ${req.body.customReply ?
                `<p style="color:#333;font-size:16px;white-space:pre-wrap;background:#f9f9f9;padding:15px;border-left:4px solid #00C853;">${req.body.customReply}</p>`
                :
                `<p style="color:#555">Based on your request: <em>"${request.message}"</em>, here are the matching tenders we found:</p>
                        <table style="width:100%;border-collapse:collapse;margin-top:20px">
                            <thead>
                                <tr style="background:#f5f5f5">
                                    <th style="padding:10px;text-align:left">#</th>
                                    <th style="padding:10px;text-align:left">Tender Name</th>
                                    <th style="padding:10px;text-align:left">Department</th>
                                    <th style="padding:10px;text-align:left">State</th>
                                    <th style="padding:10px;text-align:left">Deadline</th>
                                </tr>
                            </thead>
                            <tbody>${tenderListHtml}</tbody>
                        </table>
                        <p style="margin-top:30px;color:#555">Visit <a href="https://bidalert.in/tenders?q=${encodeURIComponent(searchQuery)}" style="color:#00C853">bidalert.in</a> to explore all matching results.</p>`
            }
                    
                    <p style="color:#888;font-size:12px;margin-top:20px">Team BidAlert | support@bidalert.in</p>
                </div>
            </div>
        `;

        let emailAttachments = [];
        if (!req.body.customReply && tenders.length > 0) {
            try {
                const exceljs = require('exceljs');
                const workbook = new exceljs.Workbook();
                const worksheet = workbook.addWorksheet('Matched Tenders');

                worksheet.columns = [
                    { header: 'S.No', key: 'sno', width: 6 },
                    { header: 'Tender Title', key: 'title', width: 60 },
                    { header: 'Reference No.', key: 'ref', width: 25 },
                    { header: 'Authority/Department', key: 'authority', width: 40 },
                    { header: 'Location', key: 'location', width: 20 },
                    { header: 'Deadline', key: 'deadline', width: 20 }
                ];

                // Style the header row
                worksheet.getRow(1).font = { bold: true };
                worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D1B2A' } };
                worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

                tenders.forEach((t, i) => {
                    worksheet.addRow({
                        sno: i + 1,
                        title: t.title || 'N/A',
                        ref: t.reference_number || t.id || 'N/A',
                        authority: t.authority || 'N/A',
                        location: t.state || t.country || t.city || 'N/A',
                        deadline: t.deadline || 'N/A'
                    });
                });

                const buffer = await workbook.xlsx.writeBuffer();
                emailAttachments.push({
                    filename: `Tender_Matches_${new Date().toISOString().split('T')[0]}.xlsx`,
                    content: buffer,
                    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
            } catch (err) {
                console.error("Failed to generate Excel attachment:", err);
                // Continue sending email without attachment if generation fails
            }
        }

        // Send email using the centralized transporter
        await transporter.sendMail({
            from: '"BidAlert Support" <support@bidalert.in>',
            to: request.user_email,
            subject: req.body.customReply ? `Response to your Inquiry - BidAlert` : `Your Tender Matches - BidAlert (${tenders.length} Found)`,
            html: emailHtml,
            attachments: emailAttachments
        });

        // Add in-app notification for the user
        await pool.query(
            'INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, ?, ?, ?, ?)',
            [request.user_id, 'Tender Matches Sent', `We've sent ${tenders.length} matching tenders to your email.`, 'message', `/tenders?q=${encodeURIComponent(searchQuery)}`]
        );

        const log = `[${new Date().toLocaleString()}] ✅ Admin Reply sent to ${request.user_email}\n`;
        require('fs').appendFileSync(path.join(__dirname, 'email_debug.log'), log);
        console.log(log);

        // Update status to 'replied'
        await pool.query('UPDATE user_requests SET status = ? WHERE id = ?', ['replied', requestId]);

        res.json({ success: true, message: req.body.customReply ? 'Reply sent successfully' : `Tender list emailed to ${request.user_email} (${tenders.length} tenders found)` });
    } catch (error) {
        const log = `[${new Date().toLocaleString()}] ❌ Admin Reply FAILED to ${requestId}: ${error.message}\n`;
        require('fs').appendFileSync(path.join(__dirname, 'email_debug.log'), log);
        console.error('Auto-send matches error:', error);
        res.status(500).json({ message: 'Error sending email: ' + error.message });
    }
});

// TEST EMAIL ENDPOINT
app.get('/api/test-email', async (req, res) => {
    try {
        const testTo = req.query.email || 'support@bidalert.in';
        await transporter.sendMail({
            from: '"BidAlert Test" <support@bidalert.in>',
            to: testTo,
            subject: 'BidAlert System Test Email',
            text: 'If you see this, your backend email system is working perfectly!',
            html: '<b>Success!</b> Your BidAlert email system is working.'
        });
        res.json({ success: true, message: `Test email sent to ${testTo}. Please check inbox/spam.` });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /api/contact — Contact page form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, Email, and Message are required' });
        }

        // Save to user_requests table as general inquiry
        const [result] = await pool.query(
            `INSERT INTO user_requests (user_id, user_name, user_email, user_phone, message, keyword, status)
             VALUES (NULL, ?, ?, ?, ?, ?, 'new')`,
            [name, email, phone || null, `[Contact Form] Subject: ${subject || 'General Inquiry'}\n\n${message}`, subject || '']
        );

        res.json({ success: true, message: 'Your inquiry has been received. We will get back to you shortly.' });

        if (phone) {
            const contactMsg = `Thank you ${name} for contacting BidAlert! We have received your inquiry and will get back to you soon.`;
            sendSMS(phone, contactMsg).catch(console.error);
        }

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Error submitting inquiry' });
    }
});

// ==================== APP SETTINGS ROUTES ====================

// Get setting value (Public)
app.get('/api/settings/:key', async (req, res) => {
    try {
        const [settings] = await pool.query('SELECT setting_value FROM app_settings WHERE setting_key = ?', [req.params.key]);
        if (settings.length > 0) {
            res.json({ success: true, value: settings[0].setting_value });
        } else {
            // Return 200 with null instead of 404 to prevent console noise
            res.json({ success: true, value: null });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update setting (Admin) - Supports file upload for images
app.post('/api/admin/settings', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { key, value } = req.body;
        let finalValue = value;

        // If a file was uploaded, use its path
        if (req.file) {
            finalValue = `/uploads/${req.file.filename}`;
        }

        if (!key) {
            return res.status(400).json({ success: false, message: 'Setting key is required' });
        }

        await pool.query(
            'INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
            [key, finalValue, finalValue]
        );

        res.json({ success: true, message: `Setting ${key} updated successfully`, value: finalValue });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/images - Fetch all images from the images table
app.get('/api/images', async (req, res) => {
    try {
        // Check theme setting
        const [settings] = await pool.query('SELECT setting_value FROM app_settings WHERE setting_key = "gallery_theme"');
        const theme = settings[0]?.setting_value || 'default';

        if (theme === 'default') {
            return res.json([
                { id: -1, image_path: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80', image_name: 'Quality Assurance' },
                { id: -2, image_path: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', image_name: 'Business Strategy' },
                { id: -3, image_path: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', image_name: 'Legal Documentation' },
                { id: -4, image_path: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', image_name: 'Data Analysis' },
            ]);
        }

        const [rows] = await pool.query('SELECT * FROM images ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/admin/gallery/sync - Sync current hero slides to images table
app.post('/api/admin/gallery/sync', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { images } = req.body; // Array of { name, path }

        // 1. Set theme to custom
        await pool.query(
            'INSERT INTO app_settings (setting_key, setting_value) VALUES ("gallery_theme", "custom") ON DUPLICATE KEY UPDATE setting_value = "custom"'
        );

        // 2. Clear old gallery if we want fixed 4 slides, or just append? 
        // User said "Save All 4 Slides", implying these 4 should be the gallery.
        await pool.query('DELETE FROM images');

        // 3. Insert new ones
        for (const img of images) {
            if (img.path) {
                await pool.query(
                    'INSERT INTO images (image_name, image_path) VALUES (?, ?)',
                    [img.name || 'Gallery Image', img.path]
                );
            }
        }

        res.json({ success: true, message: 'Gallery synced with slides successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/admin/gallery/reset - Reset gallery to default theme
app.post('/api/admin/gallery/reset', authenticateToken, isAdmin, async (req, res) => {
    try {
        await pool.query(
            'INSERT INTO app_settings (setting_key, setting_value) VALUES ("gallery_theme", "default") ON DUPLICATE KEY UPDATE setting_value = "default"'
        );
        res.json({ success: true, message: 'Theme reset to default' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/admin/images - Upload a new image to the images table
app.post('/api/admin/images', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const imageName = req.body.title || req.file.originalname;

        const [result] = await pool.query(
            'INSERT INTO images (image_name, image_path) VALUES (?, ?)',
            [imageName, imagePath]
        );

        res.json({
            success: true,
            message: 'Image uploaded and stored in database successfully',
            image: { id: result.insertId, image_name: imageName, image_path: imagePath }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/admin/images/:id - Delete an image from the images table
app.delete('/api/admin/images/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM images WHERE id = ?', [id]);
        res.json({ success: true, message: 'Image deleted from database' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Complete Profile endpoint (specifically for phone number after OAuth)
app.post('/api/auth/complete-profile', authenticateToken, [
    body('phone').trim().notEmpty().withMessage('Phone number is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { phone } = req.body;
        const userId = req.user.userId;

        await pool.query(
            'UPDATE users SET phone = ? WHERE id = ?',
            [phone, userId]
        );

        res.json({
            success: true,
            message: 'Phone number updated successfully'
        });
    } catch (error) {
        console.error('Complete profile error:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

// Get current user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const [users] = await pool.query(
            'SELECT id, name, email, role, phone, subscription_status, plan_type, plan_expiry_date, web_access, email_alerts, bidding_guidance, support_24_7 FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== TENDER ROUTES ====================

// Function to get tenders (Reusable)
async function getTendersLogic(queryParams) {
    let { state, country, category, status, q, limit = 20, offset = 0, page, source, authority, city, type, authority_group, portal, sort, order, value_min, value_max, include_expired, ministry, department, sector, year } = queryParams;

    limit = parseInt(limit);
    if (page) {
        offset = (parseInt(page) - 1) * limit;
    } else {
        offset = parseInt(offset);
    }

    // Build WHERE conditions for all three tables
    let whereConditions = '1=1';

    // Use a more flexible date check that works with YYYY-MM-DD and DD-MM-YYYY
    if (include_expired !== 'true' && status !== 'archive' && status !== 'closed' && status !== 'all') {
        whereConditions += ` AND (
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;
    }

    const params = [];

    // State filtering (Region)
    if (state) {
        const stateList = state.split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (stateList.length > 0) {
            let stateConditions = [];
            stateList.forEach(s => {
                const stateNoSpaces = s.replace(/\s+/g, '');
                stateConditions.push('(state_name LIKE ? OR state_name LIKE ?)');
                params.push(`%${s}%`, `%${stateNoSpaces}%`);
            });
            whereConditions += ` AND (${stateConditions.join(' OR ')})`;
        }
    }

    // Sector and Category (Classification) - IMPROVED to search ALL relevant columns since tender_category is often empty
    if (category || sector) {
        const cat = category || sector;
        whereConditions += ' AND (tender_category LIKE ? OR name_of_work LIKE ? OR tender_dept LIKE ?)';
        params.push(`%${cat}%`, `%${cat}%`, `%${cat}%`);
    }

    if (source) {
        whereConditions += ' AND source_site LIKE ?';
        params.push(`%${source}%`);
    }

    // Ministry and Department are both usually in tender_dept
    if (ministry) {
        whereConditions += ' AND (tender_dept LIKE ? OR name_of_work LIKE ?)';
        params.push(`%${ministry}%`, `%${ministry}%`);
    }

    if (department) {
        whereConditions += ' AND (tender_dept LIKE ? OR name_of_work LIKE ?)';
        params.push(`%${department}%`, `%${department}%`);
    }

    if (authority) {
        whereConditions += ' AND (tender_dept LIKE ? OR name_of_work LIKE ?)';
        params.push(`%${authority}%`, `%${authority}%`);
    }

    if (authority_group) {
        if (authority_group === 'Bank') {
            whereConditions += ' AND (tender_dept LIKE ? OR tender_dept LIKE ?)';
            params.push('%Bank%', '%Rajanigandha%');
        } else {
            whereConditions += ' AND (tender_dept LIKE ? OR name_of_work LIKE ?)';
            params.push(`%${authority_group}%`, `%${authority_group}%`);
        }
    }

    if (city) {
        whereConditions += ' AND (location LIKE ? OR state_name LIKE ? OR tender_dept LIKE ?)';
        params.push(`%${city}%`, `%${city}%`, `%${city}%`);
    }

    if (type) {
        // Broad search for tender type (Goods, Services, Works, etc.)
        whereConditions += ' AND (tender_category LIKE ? OR name_of_work LIKE ? OR tender_dept LIKE ?)';
        params.push(`%${type}%`, `%${type}%`, `%${type}%`);
    }

    // When browsing archive WITHOUT a specific year, only show recently expired (last 20 days)
    // When a year is provided (historical browsing), show all matching by year
    if ((status === 'archive' || status === 'closed') && !year) {
        whereConditions += ` AND (
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END < CURDATE()
            AND 
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= DATE_SUB(CURDATE(), INTERVAL 20 DAY)
            AND closing_date IS NOT NULL AND closing_date != '' AND closing_date != 'N/A'
        )`;
    }

    if (q) {
        // Split by comma for OR groups (e.g. "software, hardware" -> show both)
        const groups = q.split(',').map(g => g.trim()).filter(g => g.length > 0);
        if (groups.length > 0) {
            // Removed 'invited' from stop words as it might be part of specific tender types like "IT invited"
            const stopWords = ['tender', 'tenders', 'arc', 'are', 'for', 'work', 'at', 'under'];
            let outerConditions = [];
            groups.forEach(group => {
                const terms = group.split(/\s+/)
                    .filter(t => t.length > 0 && !stopWords.includes(t.toLowerCase()));

                if (terms.length > 0) {
                    let innerConditions = [];
                    terms.forEach(term => {
                        let searchTerm = term;
                        if (searchTerm.toUpperCase().startsWith('BA-')) {
                            const internalId = searchTerm.toUpperCase().replace('BA-', 'BIDALERT-');
                            innerConditions.push('(name_of_work LIKE ? OR tender_id LIKE ? OR tender_id LIKE ? OR tender_dept LIKE ? OR state_name LIKE ? OR location LIKE ? OR tender_category LIKE ?)');
                            params.push(`%${searchTerm}%`, `%${searchTerm}%`, `%${internalId}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`);
                        } else {
                            // Use LIKE for broader and more reliable matching across different DB versions
                            innerConditions.push('(name_of_work LIKE ? OR tender_id LIKE ? OR tender_dept LIKE ? OR state_name LIKE ? OR location LIKE ? OR tender_category LIKE ?)');
                            const wordMatch = `%${searchTerm}%`;
                            params.push(wordMatch, wordMatch, wordMatch, wordMatch, wordMatch, wordMatch);
                        }
                    });
                    outerConditions.push(`(${innerConditions.join(' AND ')})`);
                }
            });
            if (outerConditions.length > 0) {
                whereConditions += ` AND (${outerConditions.join(' OR ')})`;
            }
        }
    }

    if (value_min) {
        whereConditions += ' AND tender_ecv >= ?';
        params.push(value_min);
    }

    if (value_max) {
        whereConditions += ' AND tender_ecv <= ?';
        params.push(value_max);
    }

    // Determine which tables to query based on portal filter
    let queryParts = [];
    let countParts = [];
    let queryValues = [];
    let countParams = [];

    // Portal filter: gem, eprocurement, ireps, or all (default)
    const includeGem = (!portal || portal.toLowerCase() === 'gem' || portal.toLowerCase() === 'all') && (!country || country.toLowerCase().includes('india'));
    const includeEproc = (!portal || portal.toLowerCase() === 'eprocurement' || portal.toLowerCase() === 'all') && (!country || country.toLowerCase().includes('india'));
    const includeIreps = (!portal || portal.toLowerCase() === 'ireps' || portal.toLowerCase() === 'all') && (!country || country.toLowerCase().includes('india'));
    const includeGlobal = (portal?.toLowerCase() === 'global' || portal?.toLowerCase() === 'all' || country) && (!source || source.toLowerCase() !== 'newspaper');
    // Archive table is only queried for status=archive
    const includeArchive = status === 'archive';

    const commonColumns = `
        tender_id as id,
        name_of_work as title,
        name_of_work as description,
        tender_dept as authority,
        state_name as state,
        location as city,
        tender_category as category,
        tender_ecv as estimated_value,
        tender_emd as emd,
        tender_qty as quantity,
        emd_exemption,
        bidalert_user,
        apply_mode,
        closing_date as deadline,
        CASE 
            WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' AND STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d') < CURDATE() THEN 'archive'
            WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' AND STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y') < CURDATE() THEN 'archive'
            ELSE 'active'
        END as status,
        source_site,
        gemdoclink,
        doclinks,
        created_at
    `;

    // Add Archive query if applicable
    if (includeArchive) {
        let archiveWhere = '1=1';
        let archiveValues = [];

        // Apply portal filter to archive table
        if (portal && portal !== 'all') {
            let portalSource = '';
            if (portal.toLowerCase() === 'gem') portalSource = 'GEM';
            else if (portal.toLowerCase() === 'eprocurement') portalSource = 'eProcurement';
            else if (portal.toLowerCase() === 'ireps') portalSource = 'iREPS';
            else if (portal.toLowerCase() === 'global') portalSource = 'Global';

            if (portalSource) {
                archiveWhere += ' AND source_table = ?';
                archiveValues.push(portalSource);
            }
        }

        // Apply year filter for archive table
        if (year) {
            archiveWhere += ` AND (
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN LEFT(closing_date, 4) = ?
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN RIGHT(LEFT(closing_date, 10), 4) = ?
                    ELSE FALSE
                END
            )`;
            archiveValues.push(year, year);
        }

        // Apply shared filters (state, query, etc.) to archive query
        // Re-using params and whereConditions from above for archive logic
        // But need to handle the params properly as they are shared with other tables
        queryParts.push(`SELECT ${commonColumns}, source_table FROM archived_tenders WHERE ${whereConditions} AND ${archiveWhere}`);
        queryValues.push(...params, ...archiveValues);
        countParts.push(`(SELECT COUNT(*) FROM archived_tenders WHERE ${whereConditions} AND ${archiveWhere})`);
        countParams.push(...params, ...archiveValues);
    }

    if (includeGem && !year) { // If year is provided, we only want historical/archive data
        queryParts.push(`SELECT ${commonColumns}, 'GEM' as source_table FROM gem_tenders WHERE ${whereConditions}`);
        queryValues.push(...params);
        countParts.push(`(SELECT COUNT(*) FROM gem_tenders WHERE ${whereConditions})`);
        countParams.push(...params);
    }

    if (includeEproc && !year) {
        queryParts.push(`SELECT ${commonColumns}, 'eProcurement' as source_table FROM eprocurement_tenders WHERE ${whereConditions}`);
        queryValues.push(...params);
        countParts.push(`(SELECT COUNT(*) FROM eprocurement_tenders WHERE ${whereConditions})`);
        countParams.push(...params);
    }

    if (includeIreps && !year) {
        queryParts.push(`SELECT ${commonColumns}, 'iREPS' as source_table FROM ireps_tenders WHERE ${whereConditions}`);
        queryValues.push(...params);
        countParts.push(`(SELECT COUNT(*) FROM ireps_tenders WHERE ${whereConditions})`);
        countParams.push(...params);
    }

    if (includeGlobal && !year) {
        // Global where conditions (similar but uses country instead of state_name)
        let globalWhere = '1=1';
        const globalParams = [];

        if (include_expired !== 'true' && status !== 'archive') {
            globalWhere += ` AND (
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                    ELSE NULL
                END >= CURDATE()
                OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
            )`;
        } else if (status === 'archive' || status === 'closed') {
            globalWhere += ` AND (
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                    ELSE NULL
                END < CURDATE()
                AND
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                    ELSE NULL
                END >= DATE_SUB(CURDATE(), INTERVAL 20 DAY)
                AND closing_date IS NOT NULL AND closing_date != '' AND closing_date != 'N/A'
            )`;
        }

        if (country) {
            const countryList = country.split(',').map(c => c.trim()).filter(c => c.length > 0);
            if (countryList.length > 0) {
                let countryConditions = countryList.map(() => 'country LIKE ?');
                globalWhere += ` AND (${countryConditions.join(' OR ')})`;
                countryList.forEach(c => globalParams.push(`%${c}%`));
            }
        }

        if (source) {
            globalWhere += ' AND source_site LIKE ?';
            globalParams.push(`%${source}%`);
        }

        if (category || sector) {
            const cat = category || sector;
            globalWhere += ' AND (tender_category LIKE ? OR name_of_work LIKE ? OR tender_dept LIKE ?)';
            globalParams.push(`%${cat}%`, `%${cat}%`, `%${cat}%`);
        }

        if (authority) {
            globalWhere += ' AND (tender_dept LIKE ? OR name_of_work LIKE ?)';
            globalParams.push(`%${authority}%`, `%${authority}%`);
        }

        if (city) {
            globalWhere += ' AND (city LIKE ? OR name_of_work LIKE ?)';
            globalParams.push(`%${city}%`, `%${city}%`);
        }

        if (type) {
            globalWhere += ' AND (tender_category LIKE ? OR name_of_work LIKE ? OR tender_dept LIKE ?)';
            globalParams.push(`%${type}%`, `%${type}%`, `%${type}%`);
        }

        if (value_min) {
            globalWhere += ' AND tender_ecv >= ?';
            globalParams.push(value_min);
        }

        if (value_max) {
            globalWhere += ' AND tender_ecv <= ?';
            globalParams.push(value_max);
        }

        if (q) {
            const groups = q.split(',').map(g => g.trim()).filter(g => g.length > 0);
            if (groups.length > 0) {
                const stopWords = ['tender', 'tenders', 'arc', 'are', 'for', 'work', 'at', 'under'];
                let outerConditions = [];
                groups.forEach(group => {
                    const terms = group.split(/\s+/)
                        .filter(t => t.length > 0 && !stopWords.includes(t.toLowerCase()));

                    if (terms.length > 0) {
                        let innerConditions = [];
                        terms.forEach(term => {
                            innerConditions.push('(name_of_work LIKE ? OR tender_id LIKE ? OR tender_dept LIKE ? OR country LIKE ? OR city LIKE ?)');
                            globalParams.push(`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`);
                        });
                        outerConditions.push(`(${innerConditions.join(' AND ')})`);
                    }
                });
                if (outerConditions.length > 0) {
                    globalWhere += ` AND (${outerConditions.join(' OR ')})`;
                }
            }
        }

        const globalColumns = `
            tender_id as id,
            name_of_work as title,
            name_of_work as description,
            tender_dept as authority,
            country as state,
            city,
            tender_category as category,
            tender_ecv as estimated_value,
            tender_emd as emd,
            NULL as quantity,
            NULL as emd_exemption,
            NULL as bidalert_user,
            NULL as apply_mode,
            closing_date as deadline,
            'archive' as status,
            source_site,
            globaldoclink as gemdoclink,
            globaldoclink as doclinks,
            created_at
        `;

        queryParts.push(`SELECT ${globalColumns}, 'Global' as source_table FROM temp_tenders_global WHERE ${globalWhere}`);
        queryValues.push(...globalParams);
        countParts.push(`(SELECT COUNT(*) FROM temp_tenders_global WHERE ${globalWhere})`);
        countParams.push(...globalParams);
    }

    // Build final query
    let orderBy = '';
    const sortField = sort || 'created_at';

    // Sort logic updates
    if (sortField === 'latest') {
        orderBy = 'created_at DESC';
    }
    else if (sortField === 'closing_date' || sortField === 'deadline') {
        // "Closing Soon" means we want ASCENDING order (nearest future date first)
        orderBy = `
            CASE 
                WHEN deadline REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' AND STR_TO_DATE(LEFT(deadline, 10), '%Y-%m-%d') >= CURDATE() THEN 0
                WHEN deadline REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' AND STR_TO_DATE(LEFT(deadline, 10), '%d-%m-%Y') >= CURDATE() THEN 0
                ELSE 1 
            END ASC,
            CASE 
                WHEN deadline REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(deadline, 10), '%Y-%m-%d')
                WHEN deadline REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(deadline, 10), '%d-%m-%Y')
                ELSE '2999-12-31'
            END ASC
        `;
    }
    else if (sortField === 'estimated_value' || sortField === 'tender_ecv') {
        const sortOrder = (order && order.toUpperCase() === 'ASC') ? 'ASC' : 'DESC';
        orderBy = `CAST(REGEXP_REPLACE(estimated_value, '[^0-9.]', '') AS DECIMAL(20,2)) ${sortOrder}`;
    }
    else {
        const sortOrder = (order && order.toUpperCase() === 'ASC') ? 'ASC' : 'DESC';
        orderBy = `created_at ${sortOrder}`;
    }

    // If no tables selected (edge case), return empty
    if (queryParts.length === 0) {
        return { tenders: [], total: 0, limit: parseInt(limit), offset: parseInt(offset) };
    }

    // Build final query using a subquery wrapper for reliable sorting on aliases
    const query = `
        SELECT * FROM (
            ${queryParts.join(' UNION ALL ')}
        ) as combined_tenders
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
    `;
    queryValues.push(parseInt(limit), parseInt(offset));

    // Build count query
    const countQuery = `SELECT ${countParts.join(' + ')} as total`;

    // Execute count and main query in parallel for performance
    const countPromise = pool.query(countQuery, countParams);
    const tendersPromise = pool.query(query, queryValues);

    const [[countResult], [tenders]] = await Promise.all([countPromise, tendersPromise]);
    const total = countResult[0]?.total || 0;

    return {
        tenders,
        total: total,
        limit: parseInt(limit),
        offset: parseInt(offset)
    };
}

// Get available years in the archive
app.get('/api/tenders/archive-years', async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN LEFT(closing_date, 4)
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN RIGHT(LEFT(closing_date, 10), 4)
                    ELSE NULL
                END as year
            FROM (
                SELECT closing_date FROM archived_tenders
                UNION 
                SELECT closing_date FROM gem_tenders
                UNION
                SELECT closing_date FROM eprocurement_tenders
                UNION 
                SELECT closing_date FROM ireps_tenders
                UNION
                SELECT closing_date FROM temp_tenders_global
            ) as all_dates
            WHERE closing_date IS NOT NULL AND closing_date != ''
            AND (
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                    ELSE NULL
                END < CURDATE()
            )
            HAVING year IS NOT NULL
            ORDER BY year DESC
        `;
        const [rows] = await pool.query(query);
        const years = rows.map(r => r.year);
        res.json({ success: true, years });
    } catch (error) {
        console.error('Archive years error:', error);
        res.status(500).json({ message: 'Error fetching archive years' });
    }
});

// Admin manual trigger for archiving
const archiveExpiredTenders = require('./archive-expired-tenders');
app.post('/api/admin/archive-now', async (req, res) => {
    try {
        // Simple authentication check - normally you'd use a middleware
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: 'Auth required' });

        await archiveExpiredTenders();
        res.json({ success: true, message: 'Archiving process started and completed' });
    } catch (err) {
        console.error('Manual archiving error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get tender statistics (Total counts)
app.get('/api/tenders/stats', async (req, res) => {
    try {
        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        // Execute all stat counts in parallel
        const [gemResult, eprocResult, irepsResult, globalResult] = await Promise.all([
            pool.query(`SELECT COUNT(*) as count FROM gem_tenders WHERE ${activeFilter}`),
            pool.query(`SELECT COUNT(*) as count FROM eprocurement_tenders WHERE ${activeFilter}`),
            pool.query(`SELECT COUNT(*) as count FROM ireps_tenders WHERE ${activeFilter}`),
            pool.query(`SELECT COUNT(*) as count FROM temp_tenders_global WHERE ${activeFilter}`)
        ]);

        const gemCount = gemResult[0];
        const eprocCount = eprocResult[0];
        const irepsCount = irepsResult[0];
        const globalCount = globalResult[0];

        const total = (gemCount[0]?.count || 0) + (eprocCount[0]?.count || 0) + (irepsCount[0]?.count || 0) + (globalCount[0]?.count || 0);

        res.json({
            success: true,
            total,
            breakdown: {
                gem: gemCount[0]?.count || 0,
                eprocurement: eprocCount[0]?.count || 0,
                ireps: irepsCount[0]?.count || 0,
                global: globalCount[0]?.count || 0
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

// Get state-wise tender counts (Top states with live tender count)
app.get('/api/tenders/state-stats', async (req, res) => {
    try {
        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        const query = `
            SELECT state_name as state, SUM(cnt) as count FROM (
                SELECT state_name, COUNT(*) as cnt FROM gem_tenders WHERE state_name IS NOT NULL AND state_name != '' AND ${activeFilter} GROUP BY state_name
                UNION ALL
                SELECT state_name, COUNT(*) as cnt FROM eprocurement_tenders WHERE state_name IS NOT NULL AND state_name != '' AND ${activeFilter} GROUP BY state_name
                UNION ALL
                SELECT state_name, COUNT(*) as cnt FROM ireps_tenders WHERE state_name IS NOT NULL AND state_name != '' AND ${activeFilter} GROUP BY state_name
            ) as combined
            GROUP BY state_name
            ORDER BY count DESC
        `;

        const [results] = await pool.query(query);

        // Map to match frontend names exactly (Title Case, handle special cases like &)
        const nameMap = {
            "DAMAN AND DIU": "Daman & Diu",
            "DADRA AND NAGAR HAVELI": "Dadra & Nagar Haveli",
            "ANDAMAN AND NICOBAR ISLANDS": "Andaman & Nicobar Islands",
            "ANDAMAN & NICOBAR ISLANDS": "Andaman & Nicobar Islands",
            "JAMMU AND KASHMIR": "Jammu & Kashmir",
            "JAMMU & KASHMIR": "Jammu & Kashmir"
        };

        const states = results.map(row => {
            let name = row.state ? String(row.state).trim().toUpperCase() : "";

            // Try explicit mapping first
            if (nameMap[name]) {
                name = nameMap[name];
            } else {
                // Convert to Title Case standardly
                name = name.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
            }

            return {
                name: name,
                count: Number(row.count)
            };
        });

        res.json({ success: true, states });
    } catch (error) {
        console.error('State stats error:', error);
        res.status(500).json({ message: 'Error fetching state stats' });
    }
});

// Get all tenders from gem_tenders, eprocurement_tenders, and ireps_tenders
app.get('/api/tenders', async (req, res) => {
    try {
        const result = await getTendersLogic(req.query);
        res.json(result);
    } catch (error) {
        console.error('Get tenders error:', error);
        res.status(500).json({ message: 'Server error fetching tenders' });
    }
});

// BidGPT AI Search - Converts Natural Language to Filters & Returns Results
app.post('/api/bidgpt', async (req, res) => {
    try {
        const { query, language } = req.body;
        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }

        const sessionId = req.body.sessionId || req.sessionID || 'anonymous';
        let context = null;
        try {
            const [rows] = await pool.query('SELECT * FROM bidgpt_context WHERE session_id = ?', [sessionId]);
            if (rows.length > 0) {
                context = {
                    last_filters: typeof rows[0].last_filters === 'string' ? JSON.parse(rows[0].last_filters) : rows[0].last_filters,
                    last_intent: rows[0].last_intent,
                    last_query: rows[0].last_query
                };
            }
        } catch (ctxErr) { console.error('Context fetch error:', ctxErr.message); }

        console.log(`🧠 BidGPT Processing: "${query}" (Language: ${language || 'English'})`);

        // 1. NLP Processing with Context
        const aiResponse = await processBidGPTQuery(query, language, context);
        console.log("➡️ AI Response:", aiResponse);

        // Update Context for next turn
        if (aiResponse.filters || aiResponse.intent === 'unclear') {
            try {
                const filtersToStore = aiResponse.filters || (context ? context.last_filters : null);
                await pool.query(
                    'INSERT INTO bidgpt_context (session_id, last_filters, last_intent, last_query) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE last_filters = ?, last_intent = ?, last_query = ?',
                    [sessionId, JSON.stringify(filtersToStore), aiResponse.intent || 'search', query, JSON.stringify(filtersToStore), aiResponse.intent || 'search', query]
                );
            } catch (saveErr) { console.error('Context save error:', saveErr.message); }
        }

        // Handle Chat Intent
        if (aiResponse.type === 'chat') {
            return res.json({
                success: true,
                message: aiResponse.message,
                tenders: [],
                total: 0
            });
        }

        // Handle Search Intent
        const filters = aiResponse.filters || { q: query };

        // 2. Fetch Tenders with Extracted Filters
        const searchParams = { ...filters, limit: 10, offset: 0 };
        const result = await getTendersLogic(searchParams);

        // 3. Generate Redirect URL for "See all"
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });
        const redirectUrl = `/tenders?${queryParams.toString()}`;

        // 4. Return Combined Response
        res.json({
            success: true,
            filters: filters,
            tenders: result.tenders.map(t => ({
                id: t.id || t.tender_id,
                title: t.title || t.name_of_work,
                location: t.state || t.state_name || t.location || 'India',
                deadline: t.deadline || t.closing_date || 'N/A',
                source: t.source_table,
                estimated_value: t.estimated_value,
                emd: t.emd
            })),
            total: result.total,
            redirectUrl: redirectUrl,
            message: (() => {
                const count = result.total;
                const isTelugu = language && language.toLowerCase() === 'telugu';
                const isHindi = language && language.toLowerCase() === 'hindi';

                let locationText = '';
                if (filters.state || filters.city) {
                    const locs = [];
                    if (filters.city) locs.push(filters.city);
                    if (filters.state) locs.push(filters.state);
                    locationText = locs.join(', ');
                }
                const topicText = filters.q ? ` related to "${filters.q}"` : '';

                if (count === 0) {
                    if (isTelugu) return `క్షమించండి, మీ అభ్యర్థనకు సంబంధించి ${locationText ? locationText + ' లో ' : ''}${topicText ? topicText : 'ఎటువంటి టెండర్లు'} కనుగొనబడలేదు. దయచేసి మీ శోధనను మరిన్ని కీవర్డ్లతో క్లుప్తీకరించండి.`;
                    if (isHindi) return `क्षमा करें, हमें ${locationText ? locationText + ' में ' : ''}${topicText ? topicText : 'आपकी खोज'} के लिए कोई सक्रिय निविदाएं नहीं मिलीं। कृपया किसी अन्य क्षेत्र या कीवर्ड के साथ पुनः प्रयास करें।`;
                    return `My apologies, but I could not find any active tender opportunities${topicText}${locationText ? ' within ' + locationText : ''} at this moment. Would you like to refine your query or explore a different region?`;
                }

                if (isTelugu) return `నేను ${locationText ? locationText + ' లో ' : ''}${topicText ? topicText : ''} మొత్తం ${count} క్రియాశీల టెండర్లను విజయవంతంగా గుర్తించాను. మీ సమీక్ష కోసం ఇక్కడ తాజా ఫలితాలు ఉన్నాయి:`;
                if (isHindi) return `मैंने ${locationText ? locationText + ' में ' : ''}${topicText ? topicText : ''} कुल ${count} सक्रिय निविदाएं सफलतापूर्वक प्राप्त की हैं। आपके संदर्भ के लिए यहाँ महत्वपूर्ण परिणाम दिए गए हैं:`;
                return `I have successfully identified ${count} active tender opportunit${count > 1 ? 'ies' : 'y'}${topicText}${locationText ? ' in ' + locationText : ''} tailored to your requirements. Here are the most relevant results:`;
            })()
        });

    } catch (error) {
        console.error('BidGPT Error:', error);
        res.status(500).json({ message: 'Internal Server Error processing AI query' });
    }
});

// Get all GLOBAL tenders
app.get('/api/global-tenders', async (req, res) => {
    try {
        const { country, city, authority, category, source, q, limit = 20, page = 1, sort = 'latest' } = req.query;
        const safeLimit = Math.max(1, parseInt(limit) || 20);
        const safePage = Math.max(1, parseInt(page) || 1);
        const offset = (safePage - 1) * safeLimit;

        let query = `
            SELECT 
                tender_id as id,
                name_of_work as title,
                tender_dept as authority,
                country,
                city,
                tender_category as category,
                tender_ecv as estimated_value,
                tender_emd,
                currency,
                closing_date as deadline,
                created_at,
                'active' as status,
                source_site,
                globaldoclink as doc_link FROM temp_tenders_global 
            WHERE tender_id IS NOT NULL AND tender_id != ''
        `;
        const params = [];

        if (country) {
            const countryList = country.split(',').map(c => c.trim()).filter(c => c.length > 0);
            if (countryList.length > 0) {
                let countryConditions = countryList.map(() => 'country LIKE ?');
                query += ` AND (${countryConditions.join(' OR ')})`;
                countryList.forEach(c => params.push(`%${c}%`));
            }
        }

        if (city) {
            query += ' AND city LIKE ?';
            params.push(`%${city}%`);
        }

        if (authority) {
            query += ' AND tender_dept LIKE ?';
            params.push(`%${authority}%`);
        }

        if (category) {
            query += ' AND tender_category LIKE ?';
            params.push(`%${category}%`);
        }

        if (source) {
            query += ' AND source_site LIKE ?';
            params.push(`%${source}%`);
        }

        if (q) {
            const keywords = q.split(',').map(k => k.trim()).filter(k => k.length > 0);
            if (keywords.length > 0) {
                let qConditions = [];
                keywords.forEach(keyword => {
                    const terms = keyword.split(/\s+/).filter(t => t.length > 0);
                    if (terms.length > 0) {
                        let innerConditions = [];
                        terms.forEach(term => {
                            innerConditions.push('(name_of_work LIKE ? OR tender_id LIKE ? OR tender_dept LIKE ?)');
                            const wordMatch = `%${term}%`;
                            params.push(wordMatch, wordMatch, wordMatch);
                        });
                        qConditions.push(`(${innerConditions.join(' AND ')})`);
                    }
                });
                if (qConditions.length > 0) {
                    query += ` AND (${qConditions.join(' OR ')})`;
                }
            }
        }

        // Count total
        let countQuery = `SELECT COUNT(*) as total FROM temp_tenders_global WHERE 1=1`;
        const countParams = [];

        if (country) {
            const countryList = country.split(',').map(c => c.trim()).filter(c => c.length > 0);
            if (countryList.length > 0) {
                let countryConditions = countryList.map(() => 'country LIKE ?');
                countQuery += ` AND (${countryConditions.join(' OR ')})`;
                countryList.forEach(c => countParams.push(`%${c}%`));
            }
        }
        if (city) { countQuery += ' AND city LIKE ?'; countParams.push(`%${city}%`); }
        if (authority) { countQuery += ' AND tender_dept LIKE ?'; countParams.push(`%${authority}%`); }
        if (category) { countQuery += ' AND tender_category LIKE ?'; countParams.push(`%${category}%`); }
        if (source) { countQuery += ' AND source_site LIKE ?'; countParams.push(`%${source}%`); }
        if (q) {
            const keywords = q.split(',').map(k => k.trim()).filter(k => k.length > 0);
            if (keywords.length > 0) {
                let qConditions = [];
                keywords.forEach(keyword => {
                    const terms = keyword.split(/\s+/).filter(t => t.length > 0);
                    if (terms.length > 0) {
                        let innerConditions = [];
                        terms.forEach(term => {
                            innerConditions.push('(name_of_work LIKE ? OR tender_id LIKE ? OR tender_dept LIKE ?)');
                            const wordMatch = `%${term}%`;
                            countParams.push(wordMatch, wordMatch, wordMatch);
                        });
                        qConditions.push(`(${innerConditions.join(' AND ')})`);
                    }
                });
                if (qConditions.length > 0) {
                    countQuery += ` AND (${qConditions.join(' OR ')})`;
                }
            }
        }

        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0]?.total || 0;

        // Handle sorting with robust logic (consistent with getTendersLogic)
        let orderBy = '';
        const sortField = sort || 'created_at';

        if (sortField === 'latest') {
            orderBy = 'created_at DESC';
        } else if (sortField === 'closing_date' || sortField === 'deadline') {
            // "Closing Soon" means we want ASCENDING order (nearest future date first)
            // But we must PUSH invalid dates or past dates to the BOTTOM.
            orderBy = `
                CASE 
                    WHEN deadline REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' AND STR_TO_DATE(LEFT(deadline, 10), '%Y-%m-%d') >= CURDATE() THEN 0
                    WHEN deadline REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' AND STR_TO_DATE(LEFT(deadline, 10), '%d-%m-%Y') >= CURDATE() THEN 0
                    ELSE 1 
                END ASC,
                CASE 
                    WHEN deadline REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(deadline, 10), '%Y-%m-%d')
                    WHEN deadline REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(deadline, 10), '%d-%m-%Y')
                    ELSE '2999-12-31'
                END ASC
            `;
        } else if (sortField === 'estimated_value' || sortField === 'tender_ecv') {
            // "Value" defaults to DESCENDING (highest value first)
            orderBy = `CAST(REGEXP_REPLACE(tender_ecv, '[^0-9.]', '') AS DECIMAL(20,2)) DESC`;
        } else {
            // Default
            orderBy = `created_at DESC`;
        }

        query += ` ORDER BY ${orderBy} LIMIT ? OFFSET ?`;
        params.push(safeLimit, offset);

        const [tenders] = await pool.query(query, params);

        res.json({
            tenders,
            total,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('Get global tenders error:', error);
        res.status(500).json({
            message: 'Server error fetching global tenders',
            error: error.message
        });
    }
});

// Get single GLOBAL tender details via query param to handle complex IDs
app.get('/api/global-tender-details', async (req, res) => {
    try {
        let { id } = req.query;
        if (!id) return res.status(400).json({ message: 'ID is required' });

        // Handle potential double encoding
        try {
            if (id && id.includes('%')) {
                id = decodeURIComponent(id);
            }
        } catch (e) {
            console.warn('Failed to decode global tenderId:', id);
        }

        const [tenders] = await pool.query(
            `SELECT 
                tender_id as id,
                name_of_work as title,
                name_of_work as description,
                tender_dept as authority,
                country,
                city,
                tender_category as category,
                tender_ecv as estimated_value,
                tender_emd,
                currency,
                closing_date as deadline,
                created_at,
                'active' as status,
                source_site,
                globaldoclink as doc_link FROM temp_tenders_global 
            WHERE tender_id = ?`,
            [id]
        );

        if (tenders.length === 0) {
            return res.status(404).json({ message: 'Global tender not found' });
        }

        res.json(tenders[0]);
    } catch (error) {
        console.error('Get global tender details error:', error);
        res.status(500).json({
            message: 'Server error fetching global tender details',
            error: error.message
        });
    }
});

// Get single tender
app.get('/api/tenders/:id', async (req, res) => {
    try {
        let tenderId = req.params.id;

        // Handle potential double encoding from Next.js rewrites/proxies
        try {
            if (tenderId && tenderId.includes('%')) {
                tenderId = decodeURIComponent(tenderId);
            }
        } catch (e) {
            console.warn('Failed to decode tenderId:', tenderId);
        }

        console.log(`🔍 Fetching tender details for ID: "${tenderId}"`);

        // Support lookup by short ID (BA- instead of BIDALERT-)
        if (tenderId && String(tenderId).toUpperCase().startsWith('BA-')) {
            tenderId = String(tenderId).toUpperCase().replace('BA-', 'BIDALERT-');
        }

        const query = `
            SELECT * FROM (
                SELECT 
                    tender_id as id,
                    tender_id as reference_number,
                    name_of_work as title,
                    name_of_work as description,
                    tender_dept as authority,
                    state_name as state,
                    location as city,
                    tender_category as category,
                    tender_ecv as estimated_value,
                    tender_emd as emd_value,
                    closing_date as deadline,
                    'active' as status,
                    source_site,
                    gemdoclink,
                    doclinks,
                    created_at,
                    'GEM' as source_table
                FROM gem_tenders
                UNION ALL
                SELECT 
                    tender_id as id,
                    tender_id as reference_number,
                    name_of_work as title,
                    name_of_work as description,
                    tender_dept as authority,
                    state_name as state,
                    location as city,
                    tender_category as category,
                    tender_ecv as estimated_value,
                    tender_emd as emd_value,
                    closing_date as deadline,
                    'active' as status,
                    source_site,
                    gemdoclink,
                    doclinks,
                    created_at,
                    'eProcurement' as source_table
                FROM eprocurement_tenders
                UNION ALL
                SELECT 
                    tender_id as id,
                    tender_id as reference_number,
                    name_of_work as title,
                    name_of_work as description,
                    tender_dept as authority,
                    state_name as state,
                    location as city,
                    tender_category as category,
                    tender_ecv as estimated_value,
                    tender_emd as emd_value,
                    closing_date as deadline,
                    'active' as status,
                    source_site,
                    gemdoclink,
                    doclinks,
                    created_at,
                    'iREPS' as source_table
                FROM ireps_tenders
                UNION ALL
                SELECT 
                    tender_id as id,
                    tender_id as reference_number,
                    name_of_work as title,
                    name_of_work as description,
                    tender_dept as authority,
                    country as state,
                    city as city,
                    tender_category as category,
                    tender_ecv as estimated_value,
                    tender_emd as emd_value,
                    closing_date as deadline,
                    'active' as status,
                    source_site,
                    NULL as gemdoclink,
                    globaldoclink as doclinks,
                    created_at,
                    'Global' as source_table
                FROM temp_tenders_global
            ) as all_tenders
            WHERE id = ?
            LIMIT 1
        `;

        const [tenders] = await pool.query(query, [tenderId]);

        if (tenders.length === 0) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        res.json(tenders[0]);
    } catch (error) {
        console.error('Get tender error:', error);
        res.status(500).json({ message: 'Server error fetching tender' });
    }
});

// Create new tender
app.post('/api/tenders', async (req, res) => {
    try {
        const { title, description, authority, state, category, estimated_value, deadline, status, source_table } = req.body;

        if (!title || !authority || !deadline) {
            return res.status(400).json({ message: 'Title, Authority, and Deadline are required' });
        }

        if (!source_table) {
            return res.status(400).json({ message: 'Source table is required' });
        }

        let tableName = '';
        if (source_table === 'GEM') tableName = 'gem_tenders';
        else if (source_table === 'eProcurement') tableName = 'eprocurement_tenders';
        else if (source_table === 'iREPS') tableName = 'ireps_tenders';
        else if (source_table === 'Global') tableName = 'temp_tenders_global';
        else return res.status(400).json({ message: 'Invalid source table' });

        // Generate a unique tender ID with requested prefixes (e.g., BATNT15461536)
        let prefix = 'TND';
        if (source_table === 'GEM') prefix = 'BABID';
        else if (source_table === 'eProcurement') prefix = 'BATNT';
        else if (source_table === 'iREPS') prefix = 'BAIRE';
        else if (source_table === 'Global') prefix = 'BAGLB';

        // Use last 8 digits of timestamp for a numeric suffix
        const numericSuffix = Date.now().toString().slice(-8);
        const tenderId = `${prefix}${numericSuffix}`;

        // Use correct column names based on table structure
        let queryStr = '';
        let queryParams = [];

        if (source_table === 'Global') {
            queryStr = `INSERT INTO temp_tenders_global (tender_id, name_of_work, tender_dept, country, tender_category, tender_ecv, closing_date, source_site, globaldoclink, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
            queryParams = [tenderId, title, authority, state || '', category || '', estimated_value || 0, deadline, 'Manual', ''];
        } else {
            queryStr = `INSERT INTO ?? (tender_id, name_of_work, tender_dept, state_name, tender_category, tender_ecv, closing_date, source_site, gemdoclink, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
            queryParams = [tableName, tenderId, title, authority, state || '', category || '', estimated_value || 0, deadline, 'Manual', ''];
        }

        const [result] = await pool.query(queryStr, queryParams);

        res.status(201).json({
            message: 'Tender created successfully',
            tenderId: tenderId
        });
    } catch (error) {
        console.error('Create tender error:', error);
        res.status(500).json({ message: 'Server error creating tender: ' + error.message });
    }
});

// Update tender
app.put('/api/tenders/:id', async (req, res) => {
    try {
        let tenderId = req.params.id;
        try {
            if (tenderId && tenderId.includes('%')) {
                tenderId = decodeURIComponent(tenderId);
            }
        } catch (e) {
            console.warn('Failed to decode tenderId:', tenderId);
        }

        if (tenderId && String(tenderId).toUpperCase().startsWith('BA-')) {
            tenderId = String(tenderId).toUpperCase().replace('BA-', 'BIDALERT-');
        }
        const { title, authority, state, category, estimated_value, deadline, status, source_table } = req.body;

        if (!source_table) {
            return res.status(400).json({ message: 'Source table is required' });
        }

        let tableName = '';
        if (source_table === 'GEM') tableName = 'gem_tenders';
        else if (source_table === 'eProcurement') tableName = 'eprocurement_tenders';
        else if (source_table === 'iREPS') tableName = 'ireps_tenders';
        else if (source_table === 'Global') tableName = 'temp_tenders_global';
        else return res.status(400).json({ message: 'Invalid source table' });

        if (source_table === 'Global') {
            await pool.query(
                `UPDATE temp_tenders_global SET name_of_work = ?, tender_dept = ?, country = ?, tender_category = ?, tender_ecv = ?, closing_date = ? WHERE tender_id = ?`,
                [title, authority, state, category, estimated_value, deadline, tenderId]
            );
        } else {
            await pool.query(
                `UPDATE ?? SET name_of_work = ?, tender_dept = ?, state_name = ?, tender_category = ?, tender_ecv = ?, closing_date = ? WHERE tender_id = ?`,
                [tableName, title, authority, state, category, estimated_value, deadline, tenderId]
            );
        }

        res.json({ message: 'Tender updated successfully' });
    } catch (error) {
        console.error('Update tender error:', error);
        res.status(500).json({ message: 'Server error updating tender' });
    }
});

// Delete tender
app.delete('/api/tenders/:id', async (req, res) => {
    try {
        let tenderId = req.params.id;
        try {
            if (tenderId && tenderId.includes('%')) {
                tenderId = decodeURIComponent(tenderId);
            }
        } catch (e) {
            console.warn('Failed to decode tenderId:', tenderId);
        }

        if (tenderId && String(tenderId).toUpperCase().startsWith('BA-')) {
            tenderId = String(tenderId).toUpperCase().replace('BA-', 'BIDALERT-');
        }
        const { source_table } = req.query;

        if (!source_table) {
            return res.status(400).json({ message: 'Source table is required' });
        }

        let tableName = '';
        if (source_table === 'GEM') tableName = 'gem_tenders';
        else if (source_table === 'eProcurement') tableName = 'eprocurement_tenders';
        else if (source_table === 'iREPS') tableName = 'ireps_tenders';
        else if (source_table === 'Global') tableName = 'temp_tenders_global';
        else return res.status(400).json({ message: 'Invalid source table' });

        await pool.query(`DELETE FROM ?? WHERE tender_id = ?`, [tableName, tenderId]);

        res.json({ message: 'Tender deleted successfully' });
    } catch (error) {
        console.error('Delete tender error:', error);
        res.status(500).json({ message: 'Server error deleting tender' });
    }
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// ==================== TENDER ANALYSIS ROUTE ====================
const axios = require('axios');
const FormData = require('form-data');
// ==================== TENDER ANALYSIS ROUTE ====================
app.post('/api/analyze-tender', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log(`🔍 [Node Server] Sending file to Python BidAnalyzer for high-fidelity analysis: ${req.file.filename}`);

        // Prepare FormData for Python backend (Port 8000)
        const pythonFormData = new FormData();
        pythonFormData.append('file', fs.createReadStream(req.file.path), {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        const pythonResponse = await axios.post('http://localhost:8000/api/analyze', pythonFormData, {
            headers: {
                ...pythonFormData.getHeaders(),
                'X-API-Key': process.env.GEMINI_API_KEY || ''
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 120000 // 2 minute timeout for AI analysis
        });

        // The Python API returns the analysis object with full_text_context hidden
        const analysisResults = pythonResponse.data;
        const fullTextContext = analysisResults._full_text_context || "";

        // Remove internal context before sending JSON to frontend
        delete analysisResults._full_text_context;

        // Save context to DB for subsequent Q&A (keeps existing contextID logic)
        const contextId = Date.now() + '-' + Math.random().toString(36).substring(2, 9);
        await pool.query(
            'INSERT INTO tender_context_cache (id, raw_text) VALUES (?, ?)',
            [contextId, fullTextContext]
        );

        res.json({
            success: true,
            analysis: analysisResults,
            contextId: contextId
        });

        // Cleanup temp upload after processing
        try { fs.unlinkSync(req.file.path); } catch (e) { }

    } catch (error) {
        console.error('❌ Analysis Bridge Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'BidAnalyzer AI Engine Error',
            error: error.message,
            details: error.response?.data || 'Ensure Python backend is running on 8000'
        });
    }
});


// ==================== AI SMART MAPPER ROUTES ====================

// Initialize Portal Mappings Table
const initMappingTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS portal_mappings (
                portal VARCHAR(50) PRIMARY KEY,
                mapping JSON,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (err) {
        console.error('Failed to init portal_mappings table:', err.message);
    }
};

const initBlogTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blog_posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                excerpt TEXT,
                content LONGTEXT,
                category VARCHAR(100),
                author VARCHAR(100) DEFAULT 'Admin',
                image_url VARCHAR(500),
                status VARCHAR(50) DEFAULT 'published',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Blog posts table initialized');
    } catch (err) {
        console.error('Failed to init blog_posts table:', err.message);
    }
};
initMappingTable();


// Migration for user_requests table
const migrateUserRequests = async () => {
    try {
        const [columns] = await pool.query('SHOW COLUMNS FROM user_requests LIKE "duration_value"');
        if (columns.length === 0) {
            await pool.query('ALTER TABLE user_requests ADD COLUMN duration_value INT NULL, ADD COLUMN duration_unit VARCHAR(50) NULL');
            console.log('✅ Added duration columns to user_requests');
        }

        const [expiryCol] = await pool.query('SHOW COLUMNS FROM user_requests LIKE "expires_at"');
        if (expiryCol.length === 0) {
            await pool.query('ALTER TABLE user_requests ADD COLUMN expires_at DATETIME NULL');
            console.log('✅ Added expires_at column to user_requests');
        }
    } catch (migErr) {
        console.error('Migration error (user_requests):', migErr.message);
    }
};
migrateUserRequests();

// Migration for bidgpt_context table
const migrateBidGPTContext = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS bidgpt_context (
                session_id VARCHAR(255) PRIMARY KEY,
                last_filters JSON,
                last_intent VARCHAR(100),
                last_query TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ BidGPT context table initialized');
    } catch (migErr) {
        console.error('Migration error (bidgpt_context):', migErr.message);
    }
};
initBlogTable();
migrateBidGPTContext();

// Migration for users table - add sms_alerts column
const migrateUsers = async () => {
    try {
        const [columns] = await pool.query('SHOW COLUMNS FROM users LIKE "sms_alerts"');
        if (columns.length === 0) {
            await pool.query('ALTER TABLE users ADD COLUMN sms_alerts tinyint(1) DEFAULT 0 AFTER support_24_7');
            console.log('✅ Added sms_alerts column to users');
        }
    } catch (migErr) {
        console.error('Migration error (users):', migErr.message);
    }
};
migrateUsers();

const initDocumentsTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS documents (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                department VARCHAR(255),
                file_path VARCHAR(500) NOT NULL,
                file_type VARCHAR(50),
                size_bytes INT,
                uploaded_by VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Add department column if NOT exists (migration for existing tables)
        const [columns] = await pool.query('SHOW COLUMNS FROM documents LIKE "department"');
        if (columns.length === 0) {
            await pool.query('ALTER TABLE documents ADD COLUMN department VARCHAR(255) AFTER title');
            console.log('✅ Added "department" column to "documents" table');
        }

    } catch (err) {
        console.error('Failed to init documents table:', err.message);
    }
};
initDocumentsTable();


app.post('/api/admin/analyze-structure', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const { portal } = req.body;
        const { analyzeStructure, extractText } = require('./analyzer_handler');

        // Extract sample text from the uploaded file
        const sampleText = await extractText(req.file.path);

        // --- DYNAMIC DATABASE COLUMN FETCHING ---
        let targetTable = 'gem_tenders';
        if (portal === 'eprocurement') targetTable = 'eprocurement_tenders';
        else if (portal === 'ireps') targetTable = 'ireps_tenders';
        else if (portal === 'global') targetTable = 'temp_tenders_global';

        const [columns] = await pool.query(`DESCRIBE ${targetTable}`);
        const dbColumns = columns
            .map(c => c.Field)
            .filter(f => !['id', 'created_at', 'updated_at', 'bidalert_user'].includes(f));

        console.log(`🧠 AI Smart Mapper fetching columns for ${targetTable}:`, dbColumns);

        // Analyze with AI using the ACTUAL columns from the database
        const mapping = await analyzeStructure(sampleText, portal, dbColumns);

        fs.unlinkSync(req.file.path); // Cleanup

        res.json({ success: true, mapping });
    } catch (error) {
        console.error('AI Analysis Route Error:', error);
        res.status(500).json({ message: 'AI Analysis failed' });
    }
});

app.post('/api/admin/save-mapping', async (req, res) => {
    try {
        const { portal, mapping } = req.body;
        if (!portal || !mapping) return res.status(400).json({ message: 'Missing portal or mapping' });

        await pool.query(
            'INSERT INTO portal_mappings (portal, mapping) VALUES (?, ?) ON DUPLICATE KEY UPDATE mapping = ?',
            [portal, JSON.stringify(mapping), JSON.stringify(mapping)]
        );

        res.json({ success: true, message: 'Mapping saved successfully' });
    } catch (error) {
        console.error('Save mapping error:', error);
        res.status(500).json({ message: 'Failed to save mapping' });
    }
});

app.post('/api/admin/import-csv', upload.single('file'), (req, res) => {
    console.log('🚀 POST /api/admin/import-csv - Request Received');
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const { table } = req.body;
    if (!table) {
        return res.status(400).json({ message: 'Target table is required' });
    }

    const { handleImport } = require('./import_handler');
    handleImport(req, res, table);
});

// ==================== Q&A ENDPOINTS ====================
// Modern Q&A endpoint used by the frontend
app.post('/api/ask-tender', async (req, res) => {
    try {
        const { question, context } = req.body;
        if (!question) {
            return res.status(400).json({ message: 'Question is required' });
        }

        console.log(`💬 [Node Server] Proxying Q&A to Python: "${question.substring(0, 50)}..."`);

        const response = await axios.post('http://localhost:8000/api/ask', {
            question,
            context: context // Full text or JSON summary
        }, {
            headers: { 'X-API-Key': process.env.GEMINI_API_KEY || '' }
        });

        res.json({
            success: true,
            answer: response.data.answer
        });

    } catch (error) {
        console.error('Q&A Proxy Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'AI Assistant failed to respond',
            error: error.message
        });
    }
});

// Legacy/Internal Q&A endpoint using contextId
app.post('/api/ask-question', async (req, res) => {
    try {
        const { question, contextId } = req.body;
        if (!question || !contextId) {
            return res.status(400).json({ message: 'Missing question or contextId' });
        }

        // Fetch text from cache
        const [rows] = await pool.query(
            'SELECT raw_text FROM tender_context_cache WHERE id = ?',
            [contextId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Document session expired. Please re-upload the file.' });
        }

        const contextText = rows[0].raw_text;

        // Use python for legacy route too for consistency
        const response = await axios.post('http://localhost:8000/api/ask', {
            question,
            context: contextText
        }, {
            headers: { 'X-API-Key': process.env.GEMINI_API_KEY || '' }
        });

        res.json({ success: true, answer: response.data.answer });

    } catch (error) {
        console.error('Q&A Error:', error.message);
        res.status(500).json({
            message: 'Failed to get answer',
            details: error.message
        });
    }
});


// ==================== TRANSLATION ENDPOINT ====================
app.post('/api/translate-result', express.json(), async (req, res) => {
    try {
        const { json, targetLanguage } = req.body;
        if (!json || !targetLanguage) {
            return res.status(400).json({ message: 'Missing json or targetLanguage' });
        }

        console.log(`🌍 Translation Request: ${targetLanguage} `);
        const { translateWithAI } = require('./analyzer_handler'); // Lazy load
        const translated = await translateWithAI(json, targetLanguage);

        res.json({
            success: true,
            translated
        });
    } catch (error) {
        console.error('Translation error:', error.message);
        res.status(500).json({ message: 'Translation failed' });
    }
});


// ==================== PASSWORD RESET ROUTES ====================


// Forgot Password - Send Reset Email
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        // Generate Token
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hour

        // Save token to DB
        await pool.query(
            'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
            [token, expires, user.id]
        );

        // Send Email
        const resetLink = `${config.server.frontendUrl}/reset-password?token=${token}`;

        const mailOptions = {
            from: '"BidAlert" <support@bidalert.in>',
            to: email,
            subject: 'Reset Your Password - BidAlert',
            headers: defaultMailHeaders,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #004d40;">Password Reset Request</h2>
                    <p>You requested a password reset. Click the link below to set a new password:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #004d40; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">Reset Password</a>
                    <p style="font-size: 12px; color: #888;">This link expires in 1 hour.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Password reset link sent to email' });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password - Verify & Update
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find user with valid token
        const [users] = await pool.query(
            'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
            [token]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const user = users[0];

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear token
        await pool.query(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
            [hashedPassword, user.id]
        );

        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== EMAIL SETUP ====================
// Email transporter is now initialized at the top of the file

// Helper function to send Payment Receipt Email
const sendReceiptEmail = async (userEmail, receiptData) => {
    const { userName, planName, amount, paymentId, date, status } = receiptData;

    const mailOptions = {
        from: '"BidAlert Payments" <support@bidalert.in>',
        to: userEmail,
        bcc: 'support@bidalert.in', // BCC admin for every receipt
        subject: `Payment Successful - Receipt for ${planName} Plan`,
        headers: {
            ...defaultMailHeaders,
            "X-Entity-Ref-ID": paymentId // Unique header to prevent threading issues
        },
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; color: #333; text-align: left;">
                <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee;">
                    <div style="background-color: #004d40; padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">BidAlert Receipt</h1>
                        <p style="color: #10b981; margin: 10px 0 0 0; font-weight: bold; text-transform: uppercase; font-size: 12px;">Transaction Confirmed</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <img src="https://cdn.razorpay.com/static/assets/email/check-success-green.png" width="60" height="60" alt="Success">
                            <h2 style="margin: 15px 0 5px 0; color: #1a202c;">₹${amount}</h2>
                            <p style="margin: 0; color: #718096; font-size: 14px;">Paid Successfully</p>
                        </div>
                        
                        <div style="border-top: 1px dashed #e2e8f0; padding-top: 25px; margin-top: 25px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <span style="color: #718096; font-size: 13px;">Customer Name</span>
                                <span style="font-weight: 600; color: #2d3748; font-size: 13px; text-align: right;">${userName}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <span style="color: #718096; font-size: 13px;">Plan Selected</span>
                                <span style="font-weight: 600; color: #2d3748; font-size: 13px; text-align: right;">${planName}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <span style="color: #718096; font-size: 13px;">Payment ID</span>
                                <span style="font-weight: 600; color: #2d3748; font-size: 13px; text-align: right;">${paymentId}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <span style="color: #718096; font-size: 13px;">Date & Time</span>
                                <span style="font-weight: 600; color: #2d3748; font-size: 13px; text-align: right;">${date}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #718096; font-size: 13px;">Status</span>
                                <span style="font-weight: 600; color: #10b981; font-size: 13px; text-align: right;">${status.toUpperCase()}</span>
                            </div>
                        </div>

                        <div style="margin-top: 40px; padding: 20px; background-color: #f7fafc; border-radius: 8px; text-align: center;">
                            <p style="margin: 0; font-size: 13px; color: #4a5568;">For any support queries, please reach out to our team at support@bidalert.in</p>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 11px; color: #a0aec0;">&copy; 2026 BidAlert. All rights reserved. <br> Powered by Razorpay Security.</p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        const logMsg = `✅ Receipt [${paymentId}] sent successfully to ${userEmail} (and BCC support@bidalert.in). MsgID: ${info.messageId}\n`;
        console.log(logMsg);
        require('fs').appendFileSync(path.join(__dirname, 'payment_debug.log'), `[${new Date().toISOString()}] ${logMsg}`);
    } catch (error) {
        const errMsg = `❌ Error sending receipt email for [${paymentId}]: ${error.message}\n`;
        console.error(errMsg);
        require('fs').appendFileSync(path.join(__dirname, 'payment_debug.log'), `[${new Date().toISOString()}] ${errMsg}`);
    }
};

// Send Alert Email and Save to DB
app.post('/api/alerts/send', async (req, res) => {
    try {
        const { subject, message, recipient, link } = req.body;

        // Save to Notifications table for in-app viewing
        // If recipient is 'all', it's a global system alert (user_id = NULL)
        const targetUserId = recipient === 'all' ? null : null; // Simple for now, can be extended to specific user_id

        await pool.query(
            'INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, ?, ?, "alert", ?)',
            [targetUserId, subject, message, link || null]
        );

        // If recipient is 'all', fetch all user emails for broadcast
        let recipients = recipient;
        if (recipient === 'all') {
            const [users] = await pool.query('SELECT email FROM users');
            recipients = users.map(u => u.email).join(',');

            if (!recipients) {
                return res.status(400).json({ message: 'No users found to email' });
            }
        }

        let mailOptions = {
            from: '"BidAlert" <support@bidalert.in>',
            to: recipients,
            subject: subject || 'System Alert from BidAlert',
            headers: defaultMailHeaders,
            text: message,
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333 text-align: left;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #eee; border-radius: 10px; padding: 30px;">
                        <h2 style="color: #004d40; border-bottom: 2px solid #10b981; padding-bottom: 10px;">BidAlert System Notification</h2>
                        <div style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-top: 20px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                        <p style="font-size: 12px; color: #888;">This is an automated system-wide broadcast from BidAlert Admin.</p>
                    </div>
                   </div>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        res.json({ success: true, message: 'Alert sent and saved successfully' });

    } catch (error) {
        console.error('Send alert error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== NOTIFICATION ROUTES ====================

// Get notifications for current user (personal + global + smart alerts)
app.get('/api/notifications', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // 1. Fetch fixed notifications from DB
        const [dbNotifications] = await pool.query(
            `SELECT * FROM notifications 
             WHERE user_id = ? OR user_id IS NULL 
             ORDER BY created_at DESC LIMIT 20`,
            [userId]
        );

        // 2. FETCH SMART ALERTS: Tenders closing in next 7 days
        // We query the three main tables for tenders that have a closing date soon
        // Note: Dates are stored as strings 'DD-MM-YYYY', need to convert
        const smartAlertsQuery = `
            SELECT 'tender_close' as type, tender_id as id, name_of_work as title, 
            CONCAT('Closing Soon: ', closing_date) as message, closing_date as created_at,
            path_prefix
            FROM (
                SELECT tender_id, name_of_work, closing_date, '/tenders' as path_prefix FROM gem_tenders
                UNION ALL
                SELECT tender_id, name_of_work, closing_date, '/tenders' as path_prefix FROM eprocurement_tenders
                UNION ALL
                SELECT tender_id, name_of_work, closing_date, '/tenders' as path_prefix FROM ireps_tenders
                UNION ALL
                SELECT tender_id, name_of_work, closing_date, '/global-tenders' as path_prefix FROM temp_tenders_global
            ) as all_tenders
            WHERE (
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}' THEN STR_TO_DATE(closing_date, '%Y-%m-%d %H:%i:%s')
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(closing_date, '%Y-%m-%d')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}' THEN STR_TO_DATE(closing_date, '%d-%m-%Y %H:%i:%s')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(closing_date, '%d-%m-%Y')
                    ELSE NULL
                END
            ) BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 2 DAY)
            LIMIT 10
        `;

        const [smartAlerts] = await pool.query(smartAlertsQuery);

        // Format smart alerts to match notification structure
        const formattedSmartAlerts = smartAlerts.map(a => ({
            id: `smart-${a.id}`,
            title: `🚨 URGENT: Closing Soon!`,
            message: `${a.title} is closing in less than 48 hours (${a.message.split(': ')[1] || a.created_at}). Submit your bid now!`,
            type: 'tender_close',
            link: `${a.path_prefix}/${encodeURIComponent(a.id)}`,
            is_read: false,
            created_at: new Date()
        }));

        // Combine and sort
        const combined = [...formattedSmartAlerts, ...dbNotifications].sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        );

        res.json(combined);
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark notification as read
app.post('/api/notifications/:id/read', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const noteId = req.params.id;

        // Check if it's a global notification (where user_id is NULL)
        // For global ones, we might need a separate table to track read status per user
        // But for simplicity, we'll mark it as read if it was specifically for this user
        await pool.query(
            'UPDATE notifications SET is_read = TRUE WHERE id = ? AND (user_id = ? OR user_id IS NULL)',
            [noteId, userId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Read notification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark all as read
app.post('/api/notifications/read-all', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        await pool.query(
            'UPDATE notifications SET is_read = TRUE WHERE user_id = ? OR user_id IS NULL',
            [userId]
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Read all notifications error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ==================== BLOG ROUTES ====================

// Get all blog posts
app.get('/api/blogs', async (req, res) => {
    try {
        const [blogs] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        res.json(blogs);
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ message: 'Server error fetching blogs' });
    }
});

// Create new blog post
app.post('/api/blogs', async (req, res) => {
    try {
        const { title, excerpt, content, category, author, status, image_url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO blog_posts (title, excerpt, content, category, author, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, excerpt, content, category, author || 'Admin', status || 'published', image_url || null]
        );

        // Add a notification for all users about the new blog
        try {
            await pool.query(
                'INSERT INTO notifications (title, message, type, is_read, user_id, link) VALUES (?, ?, ?, ?, ?, ?)',
                ['📰 New Article Published', `We just posted: "${title}". Read it now in our blog!`, 'alert', 0, null, `/blog`]
            );
        } catch (notifyErr) {
            console.error('Failed to create blog notification:', notifyErr);
        }

        res.status(201).json({ message: 'Blog post created', id: result.insertId });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ message: 'Server error creating blog' });
    }
});

// Get single blog post
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const [posts] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
        if (posts.length === 0) return res.status(404).json({ message: 'Post not found' });
        res.json(posts[0]);
    } catch (error) {
        console.error('Get blog detail error:', error);
        res.status(500).json({ message: 'Server error fetching post' });
    }
});

// Update blog post
app.put('/api/blogs/:id', async (req, res) => {
    try {
        const { title, excerpt, content, category, author, status, image_url } = req.body;
        await pool.query(
            'UPDATE blog_posts SET title = ?, excerpt = ?, content = ?, category = ?, author = ?, status = ?, image_url = ? WHERE id = ?',
            [title, excerpt, content, category, author || 'Admin', status || 'published', image_url || null, req.params.id]
        );
        res.json({ message: 'Blog post updated' });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({ message: 'Server error updating blog' });
    }
});

// Delete blog post
app.delete('/api/blogs/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
        res.json({ message: 'Blog post deleted' });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({ message: 'Server error deleting blog' });
    }
});

// Upload blog image
app.post('/api/blogs/upload-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Blog image upload error:', error);
        res.status(500).json({ message: 'Server error uploading image' });
    }
});

// ==================== DOCUMENT ROUTES ====================

// Get all documents
app.get('/api/documents', async (req, res) => {
    try {
        const [docs] = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
        res.json(docs);
    } catch (error) {
        console.error('Get docs error:', error);
        res.status(500).json({ message: 'Server error fetching documents' });
    }
});

// Upload document
app.post('/api/documents', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, department } = req.body;
        const filePath = `/uploads/${req.file.filename}`;
        const finalTitle = title || req.file.originalname;

        const [result] = await pool.query(
            'INSERT INTO documents (title, department, file_path, file_type, size_bytes, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)',
            [finalTitle, department || 'General', filePath, req.file.mimetype, req.file.size, 'Admin']
        );


        // Notify all users about the new document
        await notifyAllUsers(
            'New Document Uploaded',
            `A new document "${finalTitle}" has been uploaded to the Document Center (Samples).`,
            '/samples',
            'system'
        );

        res.status(201).json({
            message: 'Document uploaded successfully',
            document: {
                id: result.insertId,
                title: finalTitle,
                file_path: filePath
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Server error uploading document' });
    }
});

// Delete document
app.delete('/api/documents/:id', async (req, res) => {
    try {
        const docId = req.params.id;

        const [docs] = await pool.query('SELECT file_path FROM documents WHERE id = ?', [docId]);
        if (docs.length > 0) {
            const fullPath = path.join(__dirname, docs[0].file_path);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        await pool.query('DELETE FROM documents WHERE id = ?', [docId]);

        res.json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({ message: 'Server error deleting document' });
    }
});

// ==================== USER ROUTES ====================

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error fetching users' });
    }
});

// Get dashboard stats
app.get('/api/admin/stats', authenticateToken, isAdmin, async (req, res) => {
    try {
        // Sum counts from all tender tables (Only Active Tenders)
        const activeFilter = `(
            CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END >= CURDATE()
            OR closing_date IS NULL OR closing_date = '' OR closing_date = 'N/A'
        )`;

        const [userCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "user"');
        const [adminCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "admin"');

        const [gemCount] = await pool.query(`SELECT COUNT(*) as count FROM gem_tenders WHERE ${activeFilter}`);
        const [eprocCount] = await pool.query(`SELECT COUNT(*) as count FROM eprocurement_tenders WHERE ${activeFilter}`);
        const [irepsCount] = await pool.query(`SELECT COUNT(*) as count FROM ireps_tenders WHERE ${activeFilter}`);
        const [globalCount] = await pool.query(`SELECT COUNT(*) as count FROM temp_tenders_global WHERE ${activeFilter}`);

        const totalTenders = (gemCount[0]?.count || 0) + (eprocCount[0]?.count || 0) + (irepsCount[0]?.count || 0) + (globalCount[0]?.count || 0);

        const [blogCount] = await pool.query('SELECT COUNT(*) as count FROM blog_posts');
        const [docCount] = await pool.query('SELECT COUNT(*) as count FROM documents');
        const [totalRevenue] = await pool.query('SELECT SUM(amount) as total FROM subscriptions WHERE status = "active"');
        const [pendingRevenue] = await pool.query('SELECT SUM(amount) as total FROM subscriptions WHERE status = "pending"');

        // --- ADDED: Pending Requests Count ---
        const [requestCount] = await pool.query('SELECT COUNT(*) as count FROM user_requests WHERE status = "new"');

        // --- ADDED: Recent Requests for Dashboard (Using LEFT JOIN to show even if user deleted) ---
        const [recentRequests] = await pool.query(`
            SELECT r.*, 
                   IFNULL(r.user_name, u.name) as user_name, 
                   IFNULL(r.user_email, u.email) as user_email, 
                   IFNULL(r.user_phone, u.phone) as user_phone 
            FROM user_requests r
            LEFT JOIN users u ON r.user_id = u.id
            ORDER BY r.created_at DESC
            LIMIT 5
        `);

        res.json({
            users: userCount[0].count,
            total_users: userCount[0].count + adminCount[0].count,
            admins: adminCount[0].count,
            tenders: totalTenders,
            blogs: blogCount[0].count,
            documents: docCount[0].count,
            revenue: totalRevenue[0].total || 0,
            pending_revenue: pendingRevenue[0].total || 0,
            pending_requests: requestCount[0].count,
            recent_requests: recentRequests,
            infrastructure_health: 100,
            tender_breakdown: {
                gem: gemCount[0]?.count || 0,
                eprocurement: eprocCount[0]?.count || 0,
                ireps: irepsCount[0]?.count || 0,
                global: globalCount[0]?.count || 0
            }
        });
    } catch (error) {
        console.error('❌ Get stats error:', error.message, error.stack);
        res.status(500).json({ message: 'Server error fetching stats', error: error.message });
    }
});

// Get all subscriptions (Admin)
app.get('/api/admin/subscriptions', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [subscriptions] = await pool.query(`
            SELECT s.*, u.name as user_name, u.email as user_email 
            FROM subscriptions s 
            LEFT JOIN users u ON s.user_id = u.id 
            ORDER BY s.created_at DESC
        `);
        res.json(subscriptions);
    } catch (error) {
        console.error('❌ Get admin subscriptions error:', error.message, error.stack);
        res.status(500).json({ message: 'Server error fetching subscriptions', error: error.message });
    }
});

// Get subscription summary (Admin)
app.get('/api/admin/subscriptions/summary', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { month, year, from, to } = req.query;
        let query = 'SELECT status, SUM(amount) AS total, COUNT(*) AS count FROM subscriptions';
        let params = [];
        let whereClauses = [];

        if (month && year) {
            whereClauses.push('MONTH(created_at) = ? AND YEAR(created_at) = ?');
            params.push(month, year);
        } else if (year) {
            whereClauses.push('YEAR(created_at) = ?');
            params.push(year);
        }

        if (from && to) {
            whereClauses.push('created_at BETWEEN ? AND ?');
            params.push(from + ' 00:00:00', to + ' 23:59:59');
        }

        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        query += ' GROUP BY status';

        const [results] = await pool.query(query, params);

        let summary = {
            total_amount: 0,
            active_amount: 0,
            pending_amount: 0,
            total_count: 0,
            active_count: 0
        };

        results.forEach(row => {
            const amount = Number(row.total) || 0;
            const count = Number(row.count) || 0;
            const status = String(row.status || '').toLowerCase().trim();

            summary.total_count += count;
            summary.total_amount += amount;

            if (status === 'active') {
                summary.active_amount += amount;
                summary.active_count += count;
            } else if (status === 'pending') {
                summary.pending_amount += amount;
            }
        });

        summary.success_rate = summary.total_count > 0
            ? Math.round((summary.active_count / summary.total_count) * 100)
            : 0;

        // Get monthly history for the last 6 months
        const [revenueHistory] = await pool.query(`
            SELECT
                DATE_FORMAT(created_at, '%b %Y') as label,
                SUM(amount) as total
            FROM subscriptions
            WHERE status = 'active'
            GROUP BY YEAR(created_at), MONTH(created_at)
            ORDER BY YEAR(created_at) DESC, MONTH(created_at) DESC
            LIMIT 6
        `);

        res.json({ ...summary, history: revenueHistory });
    } catch (error) {
        console.error('❌ Get subscription summary error:', error.message, error.stack);
        res.status(500).json({ message: 'Server error fetching summary', error: error.message });
    }
});

// Update user (Admin)
app.put('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { role, name, email } = req.body;

        // Build dynamic update query
        let updates = [];
        let params = [];

        if (role) { updates.push('role = ?'); params.push(role); }
        if (name) { updates.push('name = ?'); params.push(name); }
        if (email) { updates.push('email = ?'); params.push(email); }

        if (updates.length === 0) return res.status(400).json({ message: 'No fields to update' });

        params.push(userId);

        await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);
        res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error updating user' });
    }
});

// Delete user (Admin)
app.delete('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error deleting user' });
    }
});

// ==================== BIDGPT ROUTES ====================

// Real BidGPT endpoint (Consolidated at line 1416)

// Keep mock for backward compatibility if needed, or remove it.
app.post('/api/bidgpt/chat', async (req, res) => {
    res.json({ response: "Please use the new /api/bidgpt endpoint.", timestamp: new Date().toISOString() });
});

// ==================== PAYMENT ROUTES (RAZORPAY) ====================

// Test Razorpay connection — open in browser: http://localhost:5000/api/test-razorpay
app.get('/api/test-razorpay', async (req, res) => {
    // Step 1: Check if Razorpay servers are reachable
    const https = require('https');
    const reachable = await new Promise((resolve) => {
        const req = https.get('https://api.razorpay.com', (r) => resolve(true));
        req.on('error', () => resolve(false));
        req.setTimeout(5000, () => { req.destroy(); resolve(false); });
    });

    if (!reachable) {
        return res.status(502).json({
            success: false,
            message: '❌ Network Error: Cannot reach api.razorpay.com',
            cause: 'Your server has no internet access, or a firewall/antivirus is blocking outbound HTTPS connections.',
            fix: 'Check your internet connection, disable firewall temporarily, or whitelist api.razorpay.com'
        });
    }

    // Step 2: Try creating a test order
    try {
        console.log('🔍 Testing Razorpay. Key in use:', process.env.RAZORPAY_KEY_ID);
        const order = await razorpay.orders.create({ amount: 100, currency: 'INR', receipt: 'test_rzp' });
        res.json({ success: true, message: '✅ Razorpay is working!', order_id: order.id });
    } catch (err) {
        const isNetworkErr = err instanceof TypeError && err.message.includes('undefined');
        res.status(502).json({
            success: false,
            message: isNetworkErr ? '❌ Network Error: No response from Razorpay' : '❌ Auth Error: Keys rejected by Razorpay',
            razorpay_error: err.error?.description || err.message,
            key_used: process.env.RAZORPAY_KEY_ID,
            fix: isNetworkErr ? 'Check firewall/internet' : 'Verify KEY_ID and KEY_SECRET in .env'
        });
    }
});

// Create Order
app.post('/api/payments/create-order', async (req, res) => {
    try {
        const { amount, planName, userId } = req.body;

        if (!amount || !planName) {
            return res.status(400).json({ success: false, message: 'Amount and plan name are required' });
        }

        console.log(`💳 Initiating Payment Order: User ID: ${userId}, Plan: ${planName}, Amount: ${amount}`);

        // Razorpay expects amount in paise (multiply by 100)
        let order;
        try {
            const options = {
                amount: Math.round(Number(amount) * 100),
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
            };
            order = await razorpay.orders.create(options);
            console.log(`✅ Razorpay Order Created: ${order.id}`);
        } catch (rzpError) {
            console.error('❌ Razorpay Order Creation Failed:', rzpError.message || rzpError);
            // Detect network failure (no response from Razorpay servers)
            const isNetworkError = rzpError instanceof TypeError && (rzpError.message || '').includes('undefined');
            return res.status(502).json({
                success: false,
                message: isNetworkError
                    ? 'Cannot reach Razorpay servers. Please check your internet connection and firewall settings.'
                    : 'Payment gateway rejected the request. Please verify your Razorpay API credentials.',
                detail: rzpError.error?.description || rzpError.message || 'Unknown error'
            });
        }

        try {
            // Validate user ID before inserting - prevents foreign key violation if userId is missing
            if (!userId || userId === 0) {
                console.warn('⚠️ Payment order created but userId is missing. Order will not be tracked in database.');
            }

            // Save pending subscription to DB
            await pool.query(
                'INSERT INTO subscriptions (user_id, plan_type, amount, razorpay_order_id, status) VALUES (?, ?, ?, ?, ?)',
                [userId || 0, planName, amount, order.id, 'pending']
            );
            console.log(`✅ Order tracked in database: ${order.id}`);
        } catch (dbError) {
            console.error('❌ Database Subscription Tracking Failed:', dbError.message);
            // We still return the order to the user so they can pay, but we log the error.
            // Or if strict tracking is required:
            // return res.status(500).json({ success: false, message: 'DB Tracking failed', error: dbError.message });
        }

        res.json({
            success: true,
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        console.error('❌ Global Create order error:', error);
        res.status(500).json({ success: false, message: 'An unexpected internal error occurred during payment initialization.' });
    }
});

// Verify Payment
app.post('/api/payments/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const debugLog = (msg) => {
            console.log(msg);
            require('fs').appendFileSync(path.join(__dirname, 'payment_debug.log'), `[${new Date().toISOString()}] ${msg}\n`);
        };

        debugLog(`✅ Verification Request: Order ${razorpay_order_id}, Payment ${razorpay_payment_id}`);

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Get subscription info to check duration
            const [subscriptions] = await pool.query('SELECT plan_type FROM subscriptions WHERE razorpay_order_id = ?', [razorpay_order_id]);
            const planName = subscriptions.length > 0 ? subscriptions[0].plan_type : 'Basic';

            // Feature Control
            let features = {
                web_access: false,
                email_alerts: false,
                bidding_guidance: false,
                support_24_7: false,
                sms_alerts: false
            };
            let interval = '1 MONTH';
            let planType = 'basic'; // Default

            const pName = planName.toLowerCase().replace(/[^a-z0-9]/g, ''); // normalize

            if (pName.includes('basic')) { // 1500
                interval = '1 MONTH';
                planType = 'basic';
                features.web_access = true;
            } else if (pName.includes('standard')) { // 3500
                interval = '3 MONTH';
                planType = 'standard';
                features.web_access = true;
                features.email_alerts = true;
            } else if (pName.includes('diamond')) { // 7500
                interval = '6 MONTH';
                planType = 'diamond';
                features.web_access = true;
                features.email_alerts = true;
            } else if (pName.includes('premium')) { // 12500
                interval = '12 MONTH';
                planType = 'premium';
                features.web_access = true;
                features.email_alerts = true;
                features.bidding_guidance = true;
                features.support_24_7 = true;
                features.sms_alerts = true;
            } else if (pName.includes('msme') || pName.includes('apmsme')) {
                interval = '12 MONTH';
                planType = 'msme';
                features.web_access = true;

                features.email_alerts = true;
                features.bidding_guidance = true;
                features.support_24_7 = true;
                features.sms_alerts = true;
            }

            // Update subscription status in DB
            await pool.query(
                `UPDATE subscriptions SET razorpay_payment_id = ?, razorpay_signature = ?, status = ?, expires_at = DATE_ADD(NOW(), INTERVAL ${interval}) WHERE razorpay_order_id = ?`,
                [razorpay_payment_id, razorpay_signature, 'active', razorpay_order_id]
            );

            // Also update the user's subscription_status in the users table
            const [subResult] = await pool.query(
                `SELECT s.user_id, s.plan_type as plan_name, s.amount, u.email, u.name 
                 FROM subscriptions s 
                 JOIN users u ON s.user_id = u.id 
                 WHERE s.razorpay_order_id = ?`,
                [razorpay_order_id]
            );
            console.log(`🔍 Subscription lookup result count: ${subResult.length}`);

            if (subResult.length > 0) {
                const user = subResult[0];

                // Update User Table with detailed access rights
                await pool.query(
                    `UPDATE users SET 
                        subscription_status = 'pro',
                        plan_type = ?,
                        plan_expiry_date = DATE_ADD(NOW(), INTERVAL ${interval}),
                        web_access = ?,
                        email_alerts = ?,
                        bidding_guidance = ?,
                        support_24_7 = ?,
                        sms_alerts = ?
                    WHERE id = ?`,
                    [
                        planType,
                        features.web_access,
                        features.email_alerts,
                        features.bidding_guidance,
                        features.support_24_7,
                        features.sms_alerts,
                        user.user_id
                    ]
                );

                // Send automated receipt email
                sendReceiptEmail(user.email, {
                    userName: user.name,
                    planName: user.plan_name,
                    amount: user.amount,
                    paymentId: razorpay_payment_id,
                    date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    status: 'active'
                });
            }

            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            console.warn('⚠️ Invalid payment signature detected for order:', razorpay_order_id);
            res.status(400).json({ success: false, message: 'Invalid payment signature. Verification failed.' });
        }
    } catch (error) {
        console.error('❌ Verify payment error:', error);
        res.status(500).json({ success: false, message: 'An internal error occurred during payment verification.' });
    }
});

//mahi
// Free Subscription (for AP MSME)
app.post('/api/payments/free-subscription', authenticateToken, async (req, res) => {
    try {
        const { planName } = req.body;
        const userId = req.user.userId;

        if (!planName) {
            return res.status(400).json({ message: 'Plan name is required' });
        }

        // Insert into subscriptions
        await pool.query(
            'INSERT INTO subscriptions (user_id, plan_type, amount, status, expires_at) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 12 MONTH))',
            [userId, planName, 0, 'active']
        );

        // Update user status with ALL features enabled for MSME
        await pool.query(
            `UPDATE users SET 
                subscription_status = 'pro',
                plan_type = 'msme',
                plan_expiry_date = DATE_ADD(NOW(), INTERVAL 12 MONTH), 
                web_access = true,

                email_alerts = true,
                bidding_guidance = true,
                support_24_7 = true,
                sms_alerts = true
             WHERE id = ?`,
            [userId]
        );

        // Send confirmation email for free plan
        const [userData] = await pool.query('SELECT email, name FROM users WHERE id = ?', [userId]);
        if (userData.length > 0) {
            sendReceiptEmail(userData[0].email, {
                userName: userData[0].name,
                planName: planName,
                amount: 0,
                paymentId: 'FREE_ACTIVATION_' + Date.now(),
                date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                status: 'active'
            });
        }

        res.json({ success: true, message: 'Free subscription activated successfully!' });
    } catch (error) {
        console.error('Free subscription error:', error);
        res.status(500).json({ message: 'Error activating free subscription' });
    }
});


// ==================== HEALTH CHECK ====================


// ==================== USER REQUEST ROUTES ====================

// Submit a new request (Used by Users)
app.post('/api/user-requests', authenticateToken, async (req, res) => {
    try {
        const { message, keyword, state, country, department, duration_value, duration_unit } = req.body;
        const userId = req.user.userId;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // Calculate expiration date for monitoring
        let expiresAt = null;
        if (duration_value && duration_unit) {
            const val = parseInt(duration_value);
            const unit = duration_unit.toUpperCase();
            if (!isNaN(val)) {
                const now = new Date();
                if (unit === 'DAYS') now.setDate(now.getDate() + val);
                else if (unit === 'MONTHS') now.setMonth(now.getMonth() + val);
                else if (unit === 'YEARS') now.setFullYear(now.getFullYear() + val);
                expiresAt = now;
            }
        }

        const dbUserId = userId === 'admin_hardcoded' ? null : userId;

        const [result] = await pool.query(
            'INSERT INTO user_requests (user_id, message, keyword, state, country, department, duration_value, duration_unit, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [dbUserId, message, keyword || null, state || null, country || null, department || null, duration_value || null, duration_unit || null, expiresAt]
        );

        const requestId = result.insertId;

        // Fetch user info for the email
        const [users] = await pool.query('SELECT name, email, phone FROM users WHERE id = ?', [userId]);
        const user = users[0] || { name: 'Unknown', email: 'N/A', phone: 'N/A' };

        // Send Notification Email to Admin
        const adminEmail = 'sobhabidalert@gmail.com';
        const adminMailOptions = {
            from: '"BidAlert" <support@bidalert.in>',
            to: adminEmail,
            subject: 'New Tender Request Received!',
            headers: defaultMailHeaders,
            text: `New User Requirement\nUser: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nMessage: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #004d40;">New User Requirement</h2>
                    <p><strong>User:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p><strong>Requirement Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">
                        "${message}"
                    </div>
                    <p style="margin-top: 20px;">
                        <a href="${config.server.frontendUrl}/admin/messages" style="display: inline-block; padding: 10px 20px; background-color: #004d40; color: white; text-decoration: none; border-radius: 5px;">View in Admin Panel</a>
                    </p>
                </div>
            `
        };

        const userMailOptions = {
            from: '"BidAlert" <support@bidalert.in>',
            to: user.email,
            bcc: 'sobhabidalert@gmail.com',
            subject: 'We have received your tender request!',
            headers: defaultMailHeaders,
            text: `Hello ${user.name},\n\nThank you for reaching out to BidAlert. We have received your request for specific tenders: "${message}".\n\nOur team is currently searching for the best matches. We will send you the list via Email shortly.`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #10b981;">Hello ${user.name}!</h2>
                    <p>Thank you for reaching out to BidAlert. We have received your request for specific tenders:</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic; margin: 20px 0;">
                        "${message}"
                    </div>
                    <p>Our team is currently searching for the best matches. We will send you the list via Email shortly.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888;">This is an automated confirmation. No need to reply.</p>
                </div>
            `
        };

        // Execute emails without blocking
        transporter.sendMail(adminMailOptions).catch(err => console.error('Admin notify email failed:', err));
        transporter.sendMail(userMailOptions).catch(err => console.error('User notify email failed:', err));

        if (user.phone) {
            const cleanName = String(user.name || '').substring(0, 15);
            const smsMessage = `Hi ${cleanName} 👋\nWe’ve received your request for ${String(keyword || message).substring(0, 30)} tenders. 🔍\n📩 Full details are sent to your email. Please check your inbox (and spam folder).\n– BidAlert`;
            sendSMS(user.phone, smsMessage).catch(console.error);
        }

        // --- NEW: AUTOMATIC TENDER SENDING ---
        autoProcessAndSendMatches(requestId).then(autoRes => {
            console.log(`🚀 Auto-Match for Request #${requestId}:`, autoRes);
        }).catch(err => {
            console.error(`❌ Auto-Match Error for Request #${requestId}:`, err);
        });

        res.status(201).json({
            success: true,
            message: 'Your request has been submitted successfully. Our AI is finding the best matches for you right now!',
            requestId: requestId
        });
    } catch (error) {
        console.error('Submit request error:', error);
        res.status(500).json({ message: 'Server error submitting request' });
    }
});

// Get unified notification counts for admin
// Get all notifications/alerts for admin view
app.get('/api/admin/alerts', async (req, res) => {
    try {
        const [alerts] = await pool.query(
            `SELECT id, title, message, type, is_read, user_id, link, created_at 
             FROM notifications 
             ORDER BY created_at DESC 
             LIMIT 100`
        );
        res.json({ alerts });
    } catch (error) {
        console.error('Get admin alerts error:', error);
        res.status(500).json({ message: 'Server error fetching alerts' });
    }
});

// Mark all notifications as read (admin)
app.post('/api/admin/alerts/mark-all-read', async (req, res) => {
    try {
        await pool.query('UPDATE notifications SET is_read = TRUE WHERE is_read = FALSE');
        res.json({ success: true, message: 'All alerts marked as read' });
    } catch (error) {
        console.error('Mark all alerts read error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Multiple redundant routes removed here. They are consolidated and secured at the top of the file (near lines 700-1030).
// Original duplicated section (lines 4103-4686) was removed to prevent security shadowing and improve maintainability.

app.get('/api/health', async (req, res) => {

    const dbConnected = await testConnection();
    res.json({
        status: 'ok',
        database: dbConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// ==================== AUTOMATIC CLEANUP ====================

// Function to delete expired tenders from all procurement tables
async function cleanupExpiredTenders() {
    try {
        console.log('🧹 Running automatic cleanup for expired tenders...');

        // Count tenders where closing_date is in the past instead of deleting them
        const query = `
            SELECT COUNT(*) as count FROM ?? 
            WHERE (
                CASE 
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}' THEN STR_TO_DATE(closing_date, '%Y-%m-%d %H:%i:%s')
                    WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(closing_date, '%Y-%m-%d')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}' THEN STR_TO_DATE(closing_date, '%d-%m-%Y %H:%i:%s')
                    WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(closing_date, '%d-%m-%Y')
                    ELSE NULL
                END < NOW()
            )
        `;

        let totalExpired = 0;

        // Check gem_tenders
        const [gemResult] = await pool.query(query, ['gem_tenders']);
        const gemCount = gemResult[0].count;
        totalExpired += gemCount;

        // Check eprocurement_tenders
        const [eprocResult] = await pool.query(query, ['eprocurement_tenders']);
        const eprocCount = eprocResult[0].count;
        totalExpired += eprocCount;

        // Check ireps_tenders
        const [irepsResult] = await pool.query(query, ['ireps_tenders']);
        const irepsCount = irepsResult[0].count;
        totalExpired += irepsCount;

        // Check global tenders
        const [globalResult] = await pool.query(query, ['temp_tenders_global']);
        const globalCount = globalResult[0].count;
        totalExpired += globalCount;

        if (totalExpired > 0) {
            console.log(`✅ Tender check complete: Kept ${totalExpired} expired tenders for archive.`);
            console.log(`   - GEM: ${gemCount}`);
            console.log(`   - eProcurement: ${eprocCount}`);
            console.log(`   - iREPS: ${irepsCount}`);
            console.log(`   - Global: ${globalCount}`);
        } else {
            console.log('✅ Tender check complete: No expired tenders found.');
        }
    } catch (error) {
        console.error('❌ Error during tender cleanup:', error.message);
    }
}

// Run initial checks safely
(async () => {
    try {
        await cleanupExpiredTenders();
        await checkExpiringSavedTenders();
        await checkPlanExpirations();

        // Context cache cleanup
        await pool.query('DELETE FROM tender_context_cache WHERE created_at < NOW() - INTERVAL 1 HOUR');
    } catch (err) {
        console.warn('⚠️ Initial tasks had issues (likely DB connection):', err.message);
    }
})();

// Schedule regular intervals
setInterval(cleanupExpiredTenders, 3600000);
setInterval(checkExpiringSavedTenders, 900000); // 15 mins
setInterval(checkPlanExpirations, 24 * 60 * 60 * 1000); // 24 hours
setInterval(async () => {
    try {
        await pool.query('DELETE FROM tender_context_cache WHERE created_at < NOW() - INTERVAL 1 HOUR');
    } catch (err) { /* silent on interval */ }
}, 3600000);

// ==================== SMART AUTO-SENDER WORKER ====================
// Checks every 2 seconds for premium requests marked as 'processing'
let isSmartSenderRunning = false;
setInterval(async () => {
    if (isSmartSenderRunning) return;
    isSmartSenderRunning = true;
    try {
        const [pending] = await pool.query(
            'SELECT id FROM user_requests WHERE status = "processing" LIMIT 5'
        );

        if (pending.length > 0) {
            console.log(`🤖 AUTO-PROCESSOR: Found ${pending.length} requests with status "processing"...`);
            for (const row of pending) {
                await autoProcessAndSendMatches(row.id);
            }
        }
    } catch (err) {
        console.error('❌ Smart Auto-Sender Worker Error:', err.message);
    } finally {
        isSmartSenderRunning = false;
    }
}, 2000);

// Safety Worker: Checks every 5 minutes (as a fallback)
setInterval(async () => {
    try {
        const [pending] = await pool.query(
            'SELECT id FROM user_requests WHERE status = "processing" LIMIT 20'
        );
        if (pending.length > 0) {
            console.log(`⏰ 5-Min Worker: Found ${pending.length} missed requests...`);
            for (const row of pending) {
                await autoProcessAndSendMatches(row.id);
            }
        }
    } catch (err) {
        console.error('❌ Safety Worker Error:', err.message);
    }
}, 300000); // 5 minutes




// ==================== KEYWORD ALERTS SYSTEM ====================

const initKeywordAlertsTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS keyword_alerts (
                id           INT AUTO_INCREMENT PRIMARY KEY,
                user_id      INT NOT NULL,
                keyword      VARCHAR(255) NOT NULL,
                tender_type  ENUM('india', 'global') NOT NULL DEFAULT 'india',
                is_active    TINYINT(1) NOT NULL DEFAULT 1,
                last_sent_at DATETIME NULL,
                expires_at   DATETIME NULL,
                created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uq_user_keyword_type (user_id, keyword, tender_type),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ keyword_alerts table ready');

        // Migration: Ensure necessary columns exist
        try {
            // Check for last_sent_at
            const [sentCols] = await pool.query('SHOW COLUMNS FROM keyword_alerts LIKE "last_sent_at"');
            if (sentCols.length === 0) {
                await pool.query('ALTER TABLE keyword_alerts ADD COLUMN last_sent_at DATETIME NULL AFTER is_active');
                console.log('✅ Added last_sent_at column to keyword_alerts');
            }

            // Check for expires_at
            const [expCols] = await pool.query('SHOW COLUMNS FROM keyword_alerts LIKE "expires_at"');
            if (expCols.length === 0) {
                // If last_sent_at was just added or already exists, we can use it for AFTER
                await pool.query('ALTER TABLE keyword_alerts ADD COLUMN expires_at DATETIME NULL AFTER last_sent_at');
                console.log('✅ Added expires_at column to keyword_alerts');
            }
        } catch (migErr) {
            console.error('Migration error (keyword_alerts):', migErr.message);
        }
    } catch (err) {
        console.error('❌ Failed to init keyword_alerts table:', err.message);
    }
};
// Start Server Listener First
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`⏰ Dashboard & Background tasks initialized (DB Status will be checked on first query)`);
});

// Run initial checks and table initializations safely in background
(async () => {
    try {
        await initKeywordAlertsTable();
        await cleanupExpiredTenders();
        await checkExpiringSavedTenders();
        await checkPlanExpirations();

        // Context cache cleanup
        await pool.query('DELETE FROM tender_context_cache WHERE created_at < NOW() - INTERVAL 1 HOUR');
    } catch (err) {
        console.warn('⚠️ Server started with limited DB connectivity:', err.message);
    }
})();

// Save / toggle a keyword alert
app.post('/api/keyword-alerts', authenticateToken, async (req, res) => {
    try {
        const { keyword, tender_type = 'india', duration_value, duration_unit } = req.body;
        const userId = req.user.userId;
        if (!keyword || !keyword.trim()) return res.status(400).json({ message: 'Keyword is required' });
        const cleanKeyword = keyword.trim().toLowerCase();

        // Calculate expiration date if duration is provided
        let expiresAt = null;
        if (duration_value && duration_unit) {
            const val = parseInt(duration_value);
            const unit = duration_unit.toUpperCase(); // DAYS, MONTHS, YEARS
            if (!isNaN(val)) {
                const now = new Date();
                if (unit === 'DAYS') now.setDate(now.getDate() + val);
                else if (unit === 'MONTHS') now.setMonth(now.getMonth() + val);
                else if (unit === 'YEARS') now.setFullYear(now.getFullYear() + val);
                expiresAt = now;
            }
        }

        const dbUserId = userId === 'admin_hardcoded' ? null : userId;

        await pool.query(
            `INSERT INTO keyword_alerts (user_id, keyword, tender_type, is_active, expires_at)
             VALUES (?, ?, ?, 1, ?)
             ON DUPLICATE KEY UPDATE is_active = 1, expires_at = ?`,
            [dbUserId, cleanKeyword, tender_type, expiresAt, expiresAt]
        );
        res.json({ success: true, message: `Alert set for "${cleanKeyword}" until ${expiresAt ? expiresAt.toLocaleDateString() : 'forever'}` });
    } catch (error) {
        console.error('Save keyword alert error:', error);
        res.status(500).json({ message: 'Server error saving alert' });
    }
});

// Get all alerts for current user
app.get('/api/keyword-alerts', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, keyword, tender_type, is_active, last_sent_at, expires_at, created_at
             FROM keyword_alerts WHERE user_id = ? ORDER BY created_at DESC`,
            [req.user.userId]
        );
        res.json({ success: true, alerts: rows });
    } catch (error) {
        console.error('Get keyword alerts error:', error);
        res.status(500).json({ message: 'Server error fetching alerts' });
    }
});

// Delete / deactivate an alert
app.delete('/api/keyword-alerts/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM keyword_alerts WHERE id = ? AND user_id = ?', [req.params.id, req.user.userId]);
        res.json({ success: true, message: 'Alert removed' });
    } catch (error) {
        console.error('Delete keyword alert error:', error);
        res.status(500).json({ message: 'Server error deleting alert' });
    }
});

// Check if a specific keyword alert exists for logged-in user
app.get('/api/keyword-alerts/check', authenticateToken, async (req, res) => {
    try {
        const { keyword, tender_type = 'india' } = req.query;
        if (!keyword) return res.json({ exists: false });
        const [rows] = await pool.query(
            `SELECT id FROM keyword_alerts WHERE user_id = ? AND keyword = ? AND tender_type = ? AND is_active = 1`,
            [req.user.userId, keyword.trim().toLowerCase(), tender_type]
        );
        res.json({ exists: rows.length > 0, alertId: rows[0]?.id || null });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Check and notify users whose plan is expiring in 5 days
async function checkPlanExpirations() {
    try {
        console.log('⏰ Checking for users with plans expiring in 5 days...');
        const [expiringUsers] = await pool.query(
            `SELECT id, name, email, plan_type, plan_expiry_date 
             FROM users 
             WHERE plan_expiry_date IS NOT NULL 
             AND DATEDIFF(plan_expiry_date, NOW()) = 5`
        );

        if (expiringUsers.length === 0) {
            console.log('✅ No plans expiring in 5 days.');
            return;
        }

        for (const user of expiringUsers) {
            const expiryDate = new Date(user.plan_expiry_date).toLocaleDateString('en-IN');

            // 1. In-app notification
            await pool.query(
                'INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, ?, ?, ?, ?)',
                [user.id, 'Plan Expiring Soon!', `Your ${user.plan_type} plan is expiring on ${expiryDate}. Please upgrade to continue enjoying uninterrupted services.`, 'alert', '/pricing']
            );

            // 2. Email notification
            const mailOptions = {
                from: '"BidAlert" <support@bidalert.in>',
                to: user.email,
                subject: '⚠️ Action Required: Your BidAlert Plan is Expiring Soon',
                headers: defaultMailHeaders,
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; color: #333; max-width: 800px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; background-color: #ffffff;">
                        <h2 style="color: #b91c1c;">Plan Expiry Notice</h2>
                        <p>Hello <strong>${user.name}</strong>,</p>
                        <p>This is a reminder that your <strong>${user.plan_type.toUpperCase()}</strong> plan on BidAlert is set to expire in <strong>5 days</strong> (on ${expiryDate}).</p>
                        <p>To ensure you don't miss out on important tender alerts and bidding guidance, please renew or upgrade your plan now.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${config.server.frontendUrl}/pricing" style="display: inline-block; padding: 12px 25px; background-color: #004d40; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Upgrade Plan Now</a>
                        </div>
                        <p>If you've already renewed, please ignore this email.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #888;">The BidAlert Team</p>
                    </div>
                `
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`✅ Expiry alert email sent to ${user.email}`);
            } catch (mailErr) {
                console.error(`❌ Failed to send expiry email to ${user.email}:`, mailErr.message);
            }
        }
    } catch (error) {
        console.error('❌ checkPlanExpirations error:', error);
    }
}

// Daily digest — send matching tenders to each user
async function sendDailyKeywordAlerts() {
    console.log('📧 Running daily keyword alert digest...');
    try {
        // 1. Get Keyword Alerts
        const [alerts] = await pool.query(`
            SELECT ka.id, ka.user_id, ka.keyword, ka.tender_type,
                   u.name as user_name, u.email as user_email, u.phone as user_phone
            FROM keyword_alerts ka
            JOIN users u ON ka.user_id = u.id
            WHERE ka.is_active = 1 AND (ka.expires_at IS NULL OR ka.expires_at > NOW())
            ORDER BY ka.user_id
        `);

        // 2. Get Active User Requests (Natural Language Requirements)
        const [userRequests] = await pool.query(`
            SELECT r.id, r.user_id, r.message as keyword, 'india' as tender_type,
                   u.name as user_name, u.email as user_email, u.phone as user_phone
            FROM user_requests r
            JOIN users u ON r.user_id = u.id
            WHERE r.status != 'archived' AND (r.expires_at IS NULL OR r.expires_at > NOW())
        `);

        const allAlerts = [...alerts, ...userRequests];
        if (allAlerts.length === 0) { console.log('📧 No active alerts or requirements found.'); return; }

        // Group by user
        const userMap = {};
        for (const alert of allAlerts) {
            if (!userMap[alert.user_id]) {
                userMap[alert.user_id] = {
                    user_name: alert.user_name,
                    user_email: alert.user_email,
                    user_phone: alert.user_phone,
                    keywords: []
                };
            }
            userMap[alert.user_id].keywords.push({ id: alert.id, keyword: alert.keyword, tender_type: alert.tender_type });
        }

        for (const [userId, userData] of Object.entries(userMap)) {
            let allMatchedTenders = [];
            for (const kw of userData.keywords) {
                let matched = [];
                if (kw.tender_type === 'india') {
                    const result = await getTendersLogic({ q: kw.keyword, limit: 5 });
                    matched = result.tenders.map(t => ({ ...t, matched_keyword: kw.keyword, type_label: '🇮🇳 India Tender', link: `${config.server.frontendUrl}/tenders/${t.id}` }));
                } else {
                    const [globalTenders] = await pool.query(
                        `SELECT tender_id as id, name_of_work as title, tender_dept as authority, country, city, tender_category as category, tender_ecv as estimated_value, closing_date as deadline
                         FROM temp_tenders_global WHERE (name_of_work LIKE ? OR tender_dept LIKE ? OR tender_category LIKE ?) LIMIT 5`,
                        [`%${kw.keyword}%`, `%${kw.keyword}%`, `%${kw.keyword}%`]
                    );
                    matched = globalTenders.map(t => ({ ...t, matched_keyword: kw.keyword, type_label: '🌍 Global Tender', link: `${config.server.frontendUrl}/global-tenders` }));
                }
                allMatchedTenders = [...allMatchedTenders, ...matched];
            }

            if (allMatchedTenders.length === 0) continue;

            const tenderRows = allMatchedTenders.map((t, i) => `
                <tr style="background:${i % 2 === 0 ? '#fff' : '#f8fafc'}">
                    <td style="padding:10px;border:1px solid #e2e8f0;font-size:13px">
                        <span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700">${t.type_label}</span><br/>
                        <strong>${(t.title || t.name_of_work || 'N/A').substring(0, 80)}...</strong>
                    </td>
                    <td style="padding:10px;border:1px solid #e2e8f0;font-size:13px">${t.authority || t.tender_dept || 'N/A'}</td>
                    <td style="padding:10px;border:1px solid #e2e8f0;font-size:13px;color:#b91c1c;font-weight:600">${t.deadline || t.closing_date || 'N/A'}</td>
                    <td style="padding:10px;border:1px solid #e2e8f0;font-size:13px"><span style="background:#eff6ff;color:#1d4ed8;padding:2px 6px;border-radius:8px;font-size:11px">${t.matched_keyword}</span></td>
                    <td style="padding:10px;border:1px solid #e2e8f0;text-align:center"><a href="${t.link}" style="color:#10b981;font-weight:700;text-decoration:none;font-size:12px">View →</a></td>
                </tr>`).join('');

            const keywordList = userData.keywords.map(k =>
                `<span style="background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;margin:2px;display:inline-block">${k.keyword} (${k.tender_type})</span>`
            ).join(' ');

            try {
                await transporter.sendMail({
                    from: `"BidAlert Alerts" <${config.email.user}>`,
                    to: userData.user_email,
                    subject: `🔔 Daily Tender Alert — ${allMatchedTenders.length} new matches for you`,
                    html: `<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px 20px">
                        <div style="max-width:650px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
                            <div style="background:linear-gradient(135deg,#004d40,#00796b);padding:30px;text-align:center">
                                <h1 style="color:#fff;margin:0;font-size:22px">🔔 Your Daily Tender Digest</h1>
                                <p style="color:#80cbc4;margin:8px 0 0;font-size:14px">Personalized matches based on your saved keywords</p>
                            </div>
                            <div style="padding:30px">
                                <p style="font-size:15px;color:#374151">Hi <strong>${userData.user_name}</strong>,</p>
                                <p style="font-size:14px;color:#6b7280;line-height:1.6">We found <strong style="color:#004d40">${allMatchedTenders.length} new tender(s)</strong> matching your saved keywords:</p>
                                <div style="margin:15px 0">${keywordList}</div>
                                <div style="overflow-x:auto;margin-top:20px">
                                    <table style="width:100%;border-collapse:collapse;font-size:13px">
                                        <thead><tr style="background:#004d40;color:#fff">
                                            <th style="padding:12px;border:1px solid #e2e8f0;text-align:left">Tender</th>
                                            <th style="padding:12px;border:1px solid #e2e8f0;text-align:left">Department</th>
                                            <th style="padding:12px;border:1px solid #e2e8f0;text-align:left">Closes</th>
                                            <th style="padding:12px;border:1px solid #e2e8f0;text-align:left">Keyword</th>
                                            <th style="padding:12px;border:1px solid #e2e8f0;text-align:center">Action</th>
                                        </tr></thead>
                                        <tbody>${tenderRows}</tbody>
                                    </table>
                                </div>
                                <div style="margin-top:25px;text-align:center">
                                    <a href="${config.server.frontendUrl}/tenders" style="display:inline-block;padding:12px 28px;background:#004d40;color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px">Browse All Tenders →</a>
                                </div>
                                <hr style="border:0;border-top:1px solid #e5e7eb;margin:25px 0"/>
                                <p style="font-size:12px;color:#9ca3af;text-align:center">
                                    You're receiving this because you set up keyword alerts on BidAlert.in<br/>
                                    <a href="${config.server.frontendUrl}/profile" style="color:#10b981">Manage your alerts</a>
                                </p>
                            </div>
                        </div>
                    </div>`
                });

                const alertIds = userData.keywords.map(k => k.id);
                await pool.query(`UPDATE keyword_alerts SET last_sent_at = NOW() WHERE id IN (${alertIds.map(() => '?').join(',')})`, alertIds);
                console.log(`✅ Digest sent to ${userData.user_email} (${allMatchedTenders.length} tenders)`);
            } catch (mailErr) {
                console.error(`❌ Failed to send digest to ${userData.user_email}:`, mailErr.message);
            }

            // WhatsApp Notification removed

        }
        console.log('📧 Daily keyword alert digest complete.');
    } catch (error) {
        console.error('❌ sendDailyKeywordAlerts error:', error);
    }
}

// Schedule daily digest at 8:00 AM IST (2:30 AM UTC)
function scheduleDailyAlerts() {
    const now = new Date();
    const next = new Date();
    next.setUTCHours(2, 30, 0, 0);
    if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
    const msUntilNext = next - now;
    console.log(`⏰ Daily keyword alerts scheduled in ${Math.round(msUntilNext / 60000)} minutes`);
    setTimeout(() => {
        sendDailyKeywordAlerts();
        setInterval(sendDailyKeywordAlerts, 24 * 60 * 60 * 1000);
    }, msUntilNext);
}
scheduleDailyAlerts();

// Schedule expiring tender alerts at 2:00 PM IST (8:30 AM UTC)
function scheduleExpiringTenderAlerts() {
    const now = new Date();
    const next = new Date();
    // 2:00 PM IST is 8:30 AM UTC
    next.setUTCHours(8, 30, 0, 0);
    if (next <= now) next.setUTCDate(next.getUTCDate() + 1);

    const msUntilNext = next - now;
    console.log(`⏰ Expiring tender alerts (Premium) scheduled in ${Math.round(msUntilNext / 60000)} minutes (2:00 PM IST)`);

    setTimeout(() => {
        console.log('⏰ Running scheduled task: checkExpiringSavedTenders (2:00 PM IST)');
        checkExpiringSavedTenders();
        // Repeat every 24 hours
        setInterval(checkExpiringSavedTenders, 24 * 60 * 60 * 1000);
    }, msUntilNext);
}
scheduleExpiringTenderAlerts();

// Auto-delete tenders older than 20 days beyond closing_date
async function deleteOldTenders() {
    try {
        console.log('🧹 Running automated cleanup for tenders older than 20 days...');
        const dateFilter = `
            (CASE 
                WHEN closing_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%Y-%m-%d')
                WHEN closing_date REGEXP '^[0-9]{2}-[0-9]{2}-[0-9]{4}' THEN STR_TO_DATE(LEFT(closing_date, 10), '%d-%m-%Y')
                ELSE NULL
            END) < DATE_SUB(CURDATE(), INTERVAL 20 DAY)
        `;

        const [gemResult] = await pool.query(`DELETE FROM gem_tenders WHERE ${dateFilter}`);
        const [eprocResult] = await pool.query(`DELETE FROM eprocurement_tenders WHERE ${dateFilter}`);
        const [irepsResult] = await pool.query(`DELETE FROM ireps_tenders WHERE ${dateFilter}`);
        const [globalResult] = await pool.query(`DELETE FROM temp_tenders_global WHERE ${dateFilter}`);

        console.log(`✅ Cleanup complete. Deleted ${gemResult.affectedRows} GeM, ${eprocResult.affectedRows} eProc, ${irepsResult.affectedRows} IREPS, ${globalResult.affectedRows} Global tenders.`);
    } catch (error) {
        console.error('❌ Error during auto-delete of old tenders:', error);
    }
}

// Schedule daily cleanup at 3:00 AM UTC
function scheduleDailyCleanup() {
    const now = new Date();
    const next = new Date();
    next.setUTCHours(3, 0, 0, 0);
    if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
    const msUntilNext = next - now;
    console.log(`⏰ Daily 20-day tender cleanup scheduled in ${Math.round(msUntilNext / 60000)} minutes`);
    setTimeout(() => {
        deleteOldTenders();
        setInterval(deleteOldTenders, 24 * 60 * 60 * 1000);
    }, msUntilNext);
}
scheduleDailyCleanup();

// Schedule subscription expiration check every 3 minutes
setInterval(() => {
    checkSubscriptionExpirations();
}, 3 * 60 * 1000); // 180,000 ms

// Admin: manually trigger digest
app.post('/api/admin/trigger-alerts', authenticateToken, isAdmin, async (req, res) => {
    try {
        await sendDailyKeywordAlerts();
        res.json({ success: true, message: 'Keyword alert digest triggered manually' });
    } catch (err) {
        res.status(500).json({ message: 'Error triggering alerts' });
    }
});




// Serve static files from the 'public' directory (combined frontend build)

// This enables a single-process deployment where the backend serves the frontend.
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the Next.js static files for client-side routing
app.get('*', (req, res, next) => {
    // If it's an API request, let it fall through to other routes OR return 404
    if (req.url.startsWith('/api')) {
        return next();
    }
    // For all other requests, serve the index.html from the public folder
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            // If index.html doesn't exist yet (e.g. build hasn't run), return a friendly message
            res.status(404).send('Frontend build not found. Please run build process.');
        }
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Global Error Handler:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Force restart to load new .env credentials
