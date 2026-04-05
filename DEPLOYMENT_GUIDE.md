# 🚀 BidAlert Deployment Guide

This guide will help you deploy your BidAlert Next.js application to your server.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Server access (SSH or FTP)
- ✅ Node.js installed on the server (v18 or higher)
- ✅ MySQL database created on the server
- ✅ Domain/subdomain configured

---

## 🔧 Step 1: Prepare Your Local Environment

### 1.1 Update Environment Variables

**Backend (.env):**
Already configured with:
```env
DB_HOST=server.bidalert.in3083.gd/db0  # Update with correct MySQL hostname
DB_USER=bidalert_bidalert2
DB_PASSWORD=Bidalert@123vcs
DB_NAME=bidalert_bidalert2
DB_PORT=3306
```

**Frontend (.env.local):**
Create/update `bid2alert-nextjs/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

### 1.2 Build the Frontend

```bash
cd bid2alert-nextjs
npm install
npm run build
```

This creates an optimized production build in the `.next` folder.

---

## 📦 Step 2: Prepare Files for Upload

### 2.1 Files to Upload

**Frontend (bid2alert-nextjs):**
- ✅ `.next/` folder (build output)
- ✅ `public/` folder
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.js` (if exists)
- ✅ `.env.local` (production environment variables)

**Backend:**
- ✅ All `.js` files
- ✅ `routes/` folder
- ✅ `middleware/` folder
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `.env` file (with production credentials)

**DO NOT UPLOAD:**
- ❌ `node_modules/` (will install on server)
- ❌ `.git/` folder
- ❌ Development files

---

## 🌐 Step 3: Upload to Server

### Option A: Using FTP/SFTP (Recommended for beginners)

1. **Connect to your server** using FileZilla or similar FTP client
2. **Upload backend** to: `/home/bidalert/backend/` or `/public_html/backend/`
3. **Upload frontend** to: `/home/bidalert/frontend/` or `/public_html/frontend/`

### Option B: Using Git (Recommended for developers)

```bash
# On your local machine
git init
git add .
git commit -m "Initial deployment"
git remote add origin <your-git-repo-url>
git push -u origin main

# On your server (via SSH)
cd /home/bidalert
git clone <your-git-repo-url>
```

---

## 🗄️ Step 4: Setup Database

### 4.1 Create Database (Already done in control panel)
- Database: `bidalert_bidalert2`
- User: `bidalert_bidalert2`
- Password: `Bidalert@123vcs`

### 4.2 Import Database Schema

**Option 1: Export from local MySQL**
```bash
# On your local machine
mysqldump -u root -p bidalert_v5 > bidalert_export.sql
```

**Option 2: Use phpMyAdmin**
1. Go to phpMyAdmin on your server
2. Select `bidalert_bidalert2` database
3. Click "Import"
4. Upload your SQL file

### 4.3 Find Correct MySQL Hostname

Check your hosting control panel for the MySQL hostname. Common options:
- `localhost` (if database is on same server)
- `127.0.0.1`
- `mysql.your-domain.com`
- Specific IP address

Update `backend/.env` with the correct `DB_HOST`.

---

## 🖥️ Step 5: Install Dependencies on Server

### Via SSH:

```bash
# Navigate to backend
cd /home/bidalert/backend
npm install --production

# Navigate to frontend
cd /home/bidalert/frontend
npm install --production
```

---

## ▶️ Step 6: Start the Application

### Option A: Using PM2 (Recommended for production)

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
cd /home/bidalert/backend
pm2 start server.js --name "bidalert-backend"

# Start frontend
cd /home/bidalert/frontend
pm2 start npm --name "bidalert-frontend" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
```

### Option B: Using Node directly (for testing)

```bash
# Backend
cd /home/bidalert/backend
node server.js &

# Frontend
cd /home/bidalert/frontend
npm start &
```

---

## 🔧 Step 7: Configure Web Server (Apache/Nginx)

### For Apache (.htaccess)

Create `.htaccess` in your public_html:

```apache
# Redirect API requests to backend
RewriteEngine On
RewriteRule ^api/(.*)$ http://localhost:5000/$1 [P,L]

# Redirect all other requests to Next.js frontend
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

### For Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ✅ Step 8: Verify Deployment

### 8.1 Check Backend
```bash
curl http://localhost:5000/api/health
# or visit: http://your-domain.com/api/health
```

### 8.2 Check Frontend
```bash
curl http://localhost:3000
# or visit: http://your-domain.com
```

### 8.3 Check Database Connection
```bash
# SSH into server
cd /home/bidalert/backend
node -e "const db = require('./config'); console.log('DB Config:', db.database);"
```

---

## 🔍 Troubleshooting

### Database Connection Issues
```bash
# Test MySQL connection
mysql -h server.bidalert.in3083.gd/db0 -u bidalert_bidalert2 -p
# Enter password: Bidalert@123vcs
```

If connection fails:
1. Check `DB_HOST` in `.env`
2. Verify MySQL user has remote access permissions
3. Check firewall settings

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### PM2 Issues
```bash
# View logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all
```

---

## 📊 Monitoring

### View Application Logs
```bash
# PM2 logs
pm2 logs bidalert-backend
pm2 logs bidalert-frontend

# Or view directly
tail -f /home/bidalert/backend/logs/app.log
```

### Check Application Status
```bash
pm2 status
pm2 monit
```

---

## 🔄 Updating Your Application

```bash
# Pull latest changes
cd /home/bidalert
git pull origin main

# Rebuild frontend
cd frontend
npm install
npm run build

# Restart services
pm2 restart all
```

---

## 🔐 Security Checklist

- ✅ Change JWT_SECRET in production
- ✅ Use strong database password
- ✅ Enable HTTPS/SSL
- ✅ Configure CORS properly
- ✅ Set NODE_ENV=production
- ✅ Disable directory listing
- ✅ Keep dependencies updated

---

## 📞 Support

If you encounter issues:
1. Check server logs: `pm2 logs`
2. Verify environment variables
3. Test database connection
4. Check firewall/port settings
5. Contact hosting provider support

---

## 🎉 Success!

Your BidAlert application should now be live at:
- **Frontend**: http://your-domain.com
- **Backend API**: http://your-domain.com/api

Enjoy your deployed application! 🚀
