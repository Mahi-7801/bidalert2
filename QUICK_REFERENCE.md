# 🚀 BidAlert - Quick Deployment Reference

Quick reference for deploying and managing BidAlert on hPanel.

---

## 📥 QUICK START (Copy & Paste Commands)

### 1️⃣ Connect to Server
```bash
ssh username@your-server-ip -p 65002
```

### 2️⃣ Install Backend Dependencies
```bash
cd ~/public_html/bidalert-backend
npm install --production
```

### 3️⃣ Install Frontend Dependencies
```bash
cd ~/public_html/bidalert-frontend
npm install --production
```

### 4️⃣ Install PM2
```bash
npm install -g pm2
```

### 5️⃣ Start Backend
```bash
cd ~/public_html/bidalert-backend
pm2 start server.js --name bidalert-api
```

### 6️⃣ Start Frontend
```bash
cd ~/public_html/bidalert-frontend
pm2 start npm --name bidalert-frontend -- start
```

### 7️⃣ Save PM2 Config
```bash
pm2 save
pm2 startup
# Copy and run the command that PM2 outputs
```

---

## 🔧 COMMON PM2 COMMANDS

```bash
# Check status
pm2 status

# View logs (real-time)
pm2 logs

# View specific app logs
pm2 logs bidalert-api
pm2 logs bidalert-frontend

# Restart all apps
pm2 restart all

# Restart specific app
pm2 restart bidalert-api
pm2 restart bidalert-frontend

# Stop all apps
pm2 stop all

# Delete all apps
pm2 delete all

# Monitor resources
pm2 monit

# Show app details
pm2 show bidalert-api
```

---

## 🗄️ DATABASE COMMANDS

```bash
# Connect to MySQL
mysql -u your_username -p your_database

# Test connection
mysql -u your_username -p -e "SHOW DATABASES;"

# Import database
mysql -u your_username -p your_database < backup.sql

# Export database
mysqldump -u your_username -p your_database > backup.sql
```

---

## 📁 FILE MANAGEMENT

```bash
# Navigate to frontend
cd ~/public_html/bidalert-frontend

# Navigate to backend
cd ~/public_html/bidalert-backend

# List files
ls -la

# Check disk space
df -h

# Check folder size
du -sh *

# Create backup
tar -czf backup-$(date +%Y%m%d).tar.gz bidalert-frontend bidalert-backend
```

---

## 🔄 UPDATE APPLICATION

```bash
# Method 1: Manual update
# 1. Upload new files via FTP
# 2. SSH into server
cd ~/public_html/bidalert-frontend
npm install
npm run build
pm2 restart bidalert-frontend

# Method 2: Using Git
cd ~/public_html/bidalert-frontend
git pull origin main
npm install
npm run build
pm2 restart all
```

---

## 🔍 TROUBLESHOOTING COMMANDS

```bash
# Check if port is in use
lsof -i :3000
lsof -i :5000

# Check Node.js version
node -v
npm -v

# Check running processes
ps aux | grep node

# Check system resources
top
htop

# Check logs
tail -f ~/public_html/bidalert-backend/logs/error.log

# Test API endpoint
curl http://localhost:5000/api/health
curl https://yourdomain.com/api/health

# Check environment variables
cat ~/public_html/bidalert-backend/.env
```

---

## 🔐 .htaccess CONFIGURATION

Create/edit `~/public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # API requests to backend (port 5000)
    RewriteCond %{REQUEST_URI} ^/api
    RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
    
    # All other requests to Next.js frontend (port 3000)
    RewriteCond %{REQUEST_URI} !^/api
    RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>

# Protect .env files
<FilesMatch "^\.env">
    Order allow,deny
    Deny from all
</FilesMatch>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
</IfModule>
```

---

## 🌐 ENVIRONMENT VARIABLES

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NODE_ENV=production
```

### Backend `.env`
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

## 📊 MONITORING

```bash
# Real-time PM2 monitoring
pm2 monit

# Check memory usage
free -h

# Check CPU usage
top

# Check disk usage
df -h

# View last 50 log lines
pm2 logs --lines 50

# Clear PM2 logs
pm2 flush
```

---

## 🆘 EMERGENCY FIXES

### App Not Starting
```bash
pm2 delete all
cd ~/public_html/bidalert-backend
pm2 start server.js --name bidalert-api
cd ~/public_html/bidalert-frontend
pm2 start npm --name bidalert-frontend -- start
pm2 save
```

### Database Connection Error
```bash
# Check database credentials
cat ~/public_html/bidalert-backend/.env

# Test connection
mysql -u your_username -p your_database
```

### Port Already in Use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>

# Restart PM2
pm2 restart all
```

### Out of Memory
```bash
# Restart with memory limit
pm2 delete bidalert-api
pm2 start server.js --name bidalert-api --max-memory-restart 500M
pm2 save
```

---

## 📞 HOSTINGER SUPPORT

- **hPanel**: https://hpanel.hostinger.com
- **Live Chat**: Available 24/7 in hPanel
- **Email**: support@hostinger.com
- **Knowledge Base**: https://support.hostinger.com

### Questions to Ask Support:
1. "Can you enable Node.js for my hosting plan?"
2. "Can you enable Apache mod_proxy module?"
3. "What is my MySQL hostname?"
4. "How do I increase memory limit for Node.js?"

---

## ✅ VERIFICATION CHECKLIST

```bash
# 1. Check PM2 status
pm2 status

# 2. Test backend
curl http://localhost:5000/api/health

# 3. Test frontend
curl http://localhost:3000

# 4. Test database
mysql -u your_username -p -e "SELECT 1;"

# 5. Check logs for errors
pm2 logs --lines 20
```

---

## 🎯 USEFUL ALIASES (Optional)

Add to `~/.bashrc`:

```bash
alias pm2status='pm2 status'
alias pm2logs='pm2 logs'
alias pm2restart='pm2 restart all'
alias cdfront='cd ~/public_html/bidalert-frontend'
alias cdback='cd ~/public_html/bidalert-backend'
```

Then run: `source ~/.bashrc`

---

**🚀 Keep this file handy for quick reference during deployment and maintenance!**
