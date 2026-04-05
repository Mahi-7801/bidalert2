# 🚀 BidAlert - hPanel (Hostinger) Deployment Guide

Complete step-by-step guide to deploy your Next.js BidAlert application on Hostinger using hPanel.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Hostinger hosting account with Node.js support
- ✅ Domain configured in hPanel
- ✅ SSH access enabled
- ✅ MySQL database created
- ✅ FTP/SFTP credentials

---

## 🎯 Deployment Overview

Your BidAlert app consists of:
1. **Frontend**: Next.js application (Port 3000)
2. **Backend**: Node.js/Express API (Port 5000)
3. **Database**: MySQL

We'll deploy both on the same server and configure them to work together.

---

## 📦 STEP 1: Prepare Your Build Locally

### 1.1 Build the Frontend

```bash
cd "d:\Bidalert Next JS\bid2alert.resilientshieldcybersolutions.com\bid2alert-nextjs"
npm run build
```

✅ **Already completed!** Your build is ready.

### 1.2 Create Production Environment File

Update `bid2alert-nextjs/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NODE_ENV=production
```

### 1.3 Update Backend Environment

Update `backend/.env`:
```env
NODE_ENV=production
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key-change-this
```

---

## 🌐 STEP 2: Access hPanel & Setup

### 2.1 Login to hPanel
1. Go to https://hpanel.hostinger.com
2. Login with your credentials
3. Select your hosting plan

### 2.2 Enable SSH Access
1. In hPanel, go to **Advanced** → **SSH Access**
2. Enable SSH
3. Note your SSH details:
   - **Host**: (e.g., `ssh.hostinger.com` or your server IP)
   - **Port**: Usually `22` or `65002`
   - **Username**: Your hosting username
   - **Password**: Your hosting password

### 2.3 Setup MySQL Database
1. Go to **Databases** → **MySQL Databases**
2. Create new database:
   - **Database Name**: `bidalert_db`
   - **Username**: `bidalert_user`
   - **Password**: (create strong password)
3. Note the **MySQL Hostname** (usually `localhost` or specific hostname)
4. Click **Create**

---

## 📤 STEP 3: Upload Files to Server

### Option A: Using File Manager (Easiest)

1. **In hPanel**, go to **Files** → **File Manager**
2. Navigate to `public_html` or your domain folder
3. Create folder structure:
   ```
   public_html/
   ├── bidalert-frontend/
   └── bidalert-backend/
   ```

4. **Upload Frontend Files**:
   - Upload entire `bid2alert-nextjs` folder contents to `bidalert-frontend/`
   - Include: `.next/`, `public/`, `package.json`, `.env.local`
   - **DO NOT upload**: `node_modules/`

5. **Upload Backend Files**:
   - Upload entire `backend` folder contents to `bidalert-backend/`
   - Include: all `.js` files, `routes/`, `package.json`, `.env`
   - **DO NOT upload**: `node_modules/`

### Option B: Using FTP/SFTP (Recommended)

1. **Download FileZilla** (https://filezilla-project.org/)
2. **Connect using SFTP**:
   - Host: `sftp://your-server-ip`
   - Username: Your hosting username
   - Password: Your hosting password
   - Port: `22` or `65002`

3. **Upload files** as described in Option A

### Option C: Using SSH & Git (Advanced)

```bash
# Connect via SSH
ssh username@your-server-ip -p 65002

# Navigate to public_html
cd public_html

# Clone your repository (if using Git)
git clone https://github.com/yourusername/bidalert.git

# Or create folders manually
mkdir bidalert-frontend bidalert-backend
```

---

## 🗄️ STEP 4: Import Database

### 4.1 Export Local Database

**Option 1: Using phpMyAdmin locally**
1. Open local phpMyAdmin
2. Select your database
3. Click **Export** → **Go**
4. Save the `.sql` file

**Option 2: Using Command Line**
```bash
# If you have MySQL locally
mysqldump -u root -p bidalert_v5 > bidalert_export.sql
```

### 4.2 Import to Hostinger Database

1. **In hPanel**, go to **Databases** → **phpMyAdmin**
2. Login with your database credentials
3. Select your database (`bidalert_db`)
4. Click **Import** tab
5. Choose your `.sql` file
6. Click **Go**
7. Wait for import to complete

---

## 🔧 STEP 5: Install Dependencies via SSH

### 5.1 Connect to SSH

**Windows (PowerShell):**
```powershell
ssh username@your-server-ip -p 65002
```

**Or use PuTTY** (Download from https://putty.org/)

### 5.2 Install Node.js (if not installed)

Check Node.js version:
```bash
node -v
npm -v
```

If not installed or version < 18:
```bash
# Hostinger usually has Node.js pre-installed
# If not, contact support to enable Node.js
```

### 5.3 Install Backend Dependencies

```bash
cd ~/public_html/bidalert-backend
npm install --production
```

### 5.4 Install Frontend Dependencies

```bash
cd ~/public_html/bidalert-frontend
npm install --production
```

---

## ▶️ STEP 6: Start Applications with PM2

### 6.1 Install PM2 Globally

```bash
npm install -g pm2
```

### 6.2 Start Backend

```bash
cd ~/public_html/bidalert-backend
pm2 start server.js --name bidalert-api
```

### 6.3 Start Frontend

```bash
cd ~/public_html/bidalert-frontend
pm2 start npm --name bidalert-frontend -- start
```

### 6.4 Save PM2 Configuration

```bash
pm2 save
pm2 startup
```

Copy and run the command that PM2 outputs.

### 6.5 Check Status

```bash
pm2 status
pm2 logs
```

You should see both apps running!

---

## 🌍 STEP 7: Configure Domain & Reverse Proxy

### 7.1 Setup Node.js Application in hPanel

1. **In hPanel**, go to **Advanced** → **Node.js**
2. Click **Create Application**
3. Configure:
   - **Application Mode**: Production
   - **Application Root**: `public_html/bidalert-frontend`
   - **Application URL**: Your domain
   - **Application Startup File**: `node_modules/next/dist/bin/next`
   - **Port**: `3000`

### 7.2 Configure .htaccess for API Routing

Create `.htaccess` in `public_html/`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # API requests to backend (port 5000)
    RewriteCond %{REQUEST_URI} ^/api
    RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
    
    # All other requests to Next.js frontend (port 3000)
    RewriteCond %{REQUEST_URI} !^/api
    RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>

# Enable proxy
<IfModule mod_proxy.c>
    ProxyPreserveHost On
    ProxyRequests Off
</IfModule>
```

### 7.3 Alternative: Use Subdomain for API

If proxy doesn't work, create subdomain:
1. **In hPanel**, go to **Domains** → **Subdomains**
2. Create: `api.yourdomain.com`
3. Point to `bidalert-backend` folder
4. Update frontend `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```

---

## 🔐 STEP 8: Enable SSL (HTTPS)

### 8.1 Install SSL Certificate

1. **In hPanel**, go to **Security** → **SSL**
2. Select your domain
3. Click **Install SSL** (Free Let's Encrypt)
4. Wait for installation (2-5 minutes)

### 8.2 Force HTTPS

Add to `.htaccess`:
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## ✅ STEP 9: Verify Deployment

### 9.1 Test Backend API

Visit: `https://yourdomain.com/api/health`

Or via SSH:
```bash
curl http://localhost:5000/api/health
```

### 9.2 Test Frontend

Visit: `https://yourdomain.com`

### 9.3 Check PM2 Status

```bash
pm2 status
pm2 logs bidalert-api
pm2 logs bidalert-frontend
```

### 9.4 Test Database Connection

```bash
cd ~/public_html/bidalert-backend
node -e "const mysql = require('mysql2'); const conn = mysql.createConnection({host:'localhost',user:'bidalert_user',password:'your_password',database:'bidalert_db'}); conn.connect((err) => {if(err) console.error(err); else console.log('DB Connected!'); conn.end();});"
```

---

## 🔍 Troubleshooting

### Issue 1: "Cannot find module"
```bash
cd ~/public_html/bidalert-frontend
npm install
pm2 restart bidalert-frontend
```

### Issue 2: Port Already in Use
```bash
# Find process
lsof -i :3000
lsof -i :5000

# Kill process
pm2 delete all
pm2 start server.js --name bidalert-api
```

### Issue 3: Database Connection Error
1. Check `.env` file has correct credentials
2. Verify database exists in phpMyAdmin
3. Test connection:
   ```bash
   mysql -u bidalert_user -p bidalert_db
   ```

### Issue 4: 502 Bad Gateway
- Check PM2 status: `pm2 status`
- Check logs: `pm2 logs`
- Restart apps: `pm2 restart all`

### Issue 5: .htaccess Not Working
- Check if `mod_rewrite` is enabled
- Contact Hostinger support to enable proxy modules
- Use subdomain approach instead

---

## 📊 Monitoring & Maintenance

### View Logs
```bash
# Real-time logs
pm2 logs

# Specific app logs
pm2 logs bidalert-api
pm2 logs bidalert-frontend

# Last 100 lines
pm2 logs --lines 100
```

### Monitor Resources
```bash
pm2 monit
```

### Restart Applications
```bash
# Restart all
pm2 restart all

# Restart specific app
pm2 restart bidalert-api
pm2 restart bidalert-frontend
```

### Stop Applications
```bash
pm2 stop all
```

---

## 🔄 Updating Your Application

### Method 1: Manual Update

1. **Build locally**:
   ```bash
   cd "d:\Bidalert Next JS\bid2alert.resilientshieldcybersolutions.com\bid2alert-nextjs"
   npm run build
   ```

2. **Upload new files** via FTP (overwrite old files)

3. **Restart via SSH**:
   ```bash
   pm2 restart all
   ```

### Method 2: Using Git

```bash
# SSH into server
ssh username@your-server-ip -p 65002

# Pull latest changes
cd ~/public_html/bidalert-frontend
git pull origin main

# Rebuild
npm install
npm run build

# Restart
pm2 restart bidalert-frontend
```

---

## 🎯 Performance Optimization

### 1. Enable Caching
Add to `.htaccess`:
```apache
# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 2. Enable Compression
```apache
# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
</IfModule>
```

### 3. Optimize PM2
```bash
pm2 start server.js --name bidalert-api --max-memory-restart 500M
```

---

## 🔐 Security Checklist

- ✅ Change JWT_SECRET in production `.env`
- ✅ Use strong database password
- ✅ Enable HTTPS/SSL
- ✅ Set `NODE_ENV=production`
- ✅ Disable directory listing
- ✅ Keep dependencies updated: `npm audit fix`
- ✅ Configure CORS properly in backend
- ✅ Hide `.env` files from public access

Add to `.htaccess`:
```apache
# Protect .env files
<FilesMatch "^\.env">
    Order allow,deny
    Deny from all
</FilesMatch>
```

---

## 📞 Getting Help

### Hostinger Support
- **Live Chat**: Available 24/7 in hPanel
- **Email**: support@hostinger.com
- **Knowledge Base**: https://support.hostinger.com

### Common Questions to Ask Support:
1. "Can you enable Node.js for my hosting plan?"
2. "Can you enable Apache proxy modules (mod_proxy)?"
3. "What is my MySQL hostname?"
4. "How do I increase Node.js memory limit?"

---

## 🎉 Deployment Complete!

Your BidAlert application should now be live at:
- **Frontend**: https://yourdomain.com
- **Backend API**: https://yourdomain.com/api
- **Admin Panel**: https://yourdomain.com/admin

### Quick Reference Commands

```bash
# SSH Connect
ssh username@server-ip -p 65002

# Check Status
pm2 status

# View Logs
pm2 logs

# Restart Apps
pm2 restart all

# Stop Apps
pm2 stop all

# Database Access
mysql -u bidalert_user -p bidalert_db
```

---

**🚀 Congratulations! Your BidAlert app is now deployed on Hostinger!**

Need help? Check the troubleshooting section or contact Hostinger support.
