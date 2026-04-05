# 🔧 BidAlert - hPanel Troubleshooting Guide

Solutions to common deployment issues on Hostinger.

---

## 🚨 COMMON ISSUES & SOLUTIONS

### ❌ Issue 1: "Cannot find module" Error

**Symptoms:**
```
Error: Cannot find module 'express'
Error: Cannot find module 'next'
```

**Solution:**
```bash
# SSH into server
cd ~/public_html/bidalert-backend
rm -rf node_modules package-lock.json
npm install --production

cd ~/public_html/bidalert-frontend
rm -rf node_modules package-lock.json
npm install --production

pm2 restart all
```

---

### ❌ Issue 2: Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using the port
lsof -i :5000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or stop all PM2 processes
pm2 delete all

# Restart apps
cd ~/public_html/bidalert-backend
pm2 start server.js --name bidalert-api

cd ~/public_html/bidalert-frontend
pm2 start npm --name bidalert-frontend -- start

pm2 save
```

---

### ❌ Issue 3: Database Connection Failed

**Symptoms:**
```
Error: ER_ACCESS_DENIED_ERROR
Error: connect ECONNREFUSED
Error: ER_BAD_DB_ERROR
```

**Solution:**

**Step 1: Verify credentials**
```bash
cat ~/public_html/bidalert-backend/.env
```

**Step 2: Test MySQL connection**
```bash
mysql -u your_username -p your_database
# Enter password when prompted
```

**Step 3: Check common issues**
```bash
# Issue: Wrong hostname
# Fix: Update DB_HOST in .env
# Try: localhost, 127.0.0.1, or check hPanel for correct hostname

# Issue: User doesn't have permissions
# Fix: In hPanel → Databases → Add user to database with ALL PRIVILEGES

# Issue: Database doesn't exist
# Fix: Create database in hPanel → Databases → MySQL Databases
```

**Step 4: Update .env and restart**
```bash
nano ~/public_html/bidalert-backend/.env
# Update DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
# Press Ctrl+X, then Y, then Enter to save

pm2 restart bidalert-api
pm2 logs bidalert-api
```

---

### ❌ Issue 4: 502 Bad Gateway

**Symptoms:**
- Website shows "502 Bad Gateway"
- API endpoints return 502 error

**Solution:**

**Step 1: Check if apps are running**
```bash
pm2 status
```

**Step 2: If apps are stopped, start them**
```bash
pm2 restart all
```

**Step 3: Check logs for errors**
```bash
pm2 logs --lines 50
```

**Step 4: Verify ports are correct**
```bash
# Backend should be on port 5000
curl http://localhost:5000/api/health

# Frontend should be on port 3000
curl http://localhost:3000
```

**Step 5: Check .htaccess configuration**
```bash
cat ~/public_html/.htaccess
# Ensure proxy rules are correct
```

---

### ❌ Issue 5: PM2 Not Found

**Symptoms:**
```
bash: pm2: command not found
```

**Solution:**
```bash
# Install PM2 globally
npm install -g pm2

# If permission denied, try with sudo (if available)
sudo npm install -g pm2

# Verify installation
pm2 -v

# If still not found, add to PATH
export PATH=$PATH:~/.npm-global/bin
echo 'export PATH=$PATH:~/.npm-global/bin' >> ~/.bashrc
source ~/.bashrc
```

---

### ❌ Issue 6: Node.js Version Too Old

**Symptoms:**
```
Error: The engine "node" is incompatible with this module
```

**Solution:**

**Check current version:**
```bash
node -v
```

**If version < 18:**
1. Contact Hostinger support via live chat
2. Ask them to enable Node.js 18+ for your account
3. Or ask about using NVM (Node Version Manager)

**Using NVM (if available):**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node -v
```

---

### ❌ Issue 7: .htaccess Not Working

**Symptoms:**
- API requests return 404
- Proxy not working
- Still seeing port numbers in URL

**Solution:**

**Step 1: Check if mod_rewrite is enabled**
```bash
# Contact Hostinger support to enable:
# - mod_rewrite
# - mod_proxy
# - mod_proxy_http
```

**Step 2: Alternative - Use subdomain for API**

In hPanel:
1. Go to **Domains** → **Subdomains**
2. Create: `api.yourdomain.com`
3. Point to `public_html/bidalert-backend`

Update frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

Restart frontend:
```bash
pm2 restart bidalert-frontend
```

---

### ❌ Issue 8: Out of Memory

**Symptoms:**
```
JavaScript heap out of memory
Process killed
```

**Solution:**

**Step 1: Restart with memory limit**
```bash
pm2 delete bidalert-frontend
pm2 start npm --name bidalert-frontend --max-memory-restart 500M -- start
pm2 save
```

**Step 2: Optimize build**
```bash
# On local machine
cd bid2alert-nextjs
npm run build:production

# Upload new .next folder to server
```

**Step 3: Contact Hostinger**
- Ask about upgrading hosting plan
- Request memory limit increase

---

### ❌ Issue 9: SSL Certificate Not Working

**Symptoms:**
- "Not Secure" warning in browser
- HTTPS not working
- Mixed content errors

**Solution:**

**Step 1: Install SSL in hPanel**
1. Go to **Security** → **SSL**
2. Select your domain
3. Click **Install SSL** (Free Let's Encrypt)
4. Wait 2-5 minutes

**Step 2: Force HTTPS in .htaccess**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Step 3: Update environment variables**
```env
# Frontend .env.local
NEXT_PUBLIC_API_URL=https://yourdomain.com/api

# Backend .env
NODE_ENV=production
```

**Step 4: Clear browser cache and test**

---

### ❌ Issue 10: File Upload Fails

**Symptoms:**
- Cannot upload files via FTP
- "Permission denied" errors
- Files disappear after upload

**Solution:**

**Step 1: Check file permissions**
```bash
# SSH into server
cd ~/public_html
ls -la

# Fix permissions
chmod 755 bidalert-frontend
chmod 755 bidalert-backend
chmod 644 .htaccess
```

**Step 2: Check disk space**
```bash
df -h
# If disk is full, delete unnecessary files
```

**Step 3: Use correct upload path**
- Upload to: `public_html/` or `~/public_html/`
- NOT to: `/home/` or root directory

---

### ❌ Issue 11: Environment Variables Not Loading

**Symptoms:**
- App can't find API URL
- Database credentials not working
- Features not working as expected

**Solution:**

**Step 1: Check .env file location**
```bash
# Backend .env should be in:
~/public_html/bidalert-backend/.env

# Frontend .env.local should be in:
~/public_html/bidalert-frontend/.env.local
```

**Step 2: Verify file contents**
```bash
cat ~/public_html/bidalert-backend/.env
cat ~/public_html/bidalert-frontend/.env.local
```

**Step 3: Ensure no extra spaces or quotes**
```env
# WRONG:
DB_HOST = "localhost"
DB_USER = ' bidalert_user '

# CORRECT:
DB_HOST=localhost
DB_USER=bidalert_user
```

**Step 4: Restart apps**
```bash
pm2 restart all
```

---

### ❌ Issue 12: PM2 Apps Stop After Server Reboot

**Symptoms:**
- Apps running fine, but stop after server restart
- Need to manually start PM2 every time

**Solution:**

**Step 1: Save PM2 process list**
```bash
pm2 save
```

**Step 2: Setup PM2 startup script**
```bash
pm2 startup
# Copy and run the command that PM2 outputs
```

**Step 3: Verify**
```bash
pm2 list
# Should show saved processes
```

**Step 4: Test (optional)**
```bash
# Reboot server (if you have access)
sudo reboot

# Wait 2 minutes, then check
pm2 status
# Apps should auto-start
```

---

### ❌ Issue 13: API Returns CORS Error

**Symptoms:**
```
Access to fetch at 'https://yourdomain.com/api' has been blocked by CORS policy
```

**Solution:**

**Step 1: Update backend CORS settings**

Edit `~/public_html/bidalert-backend/server.js`:
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://yourdomain.com',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

**Step 2: Restart backend**
```bash
pm2 restart bidalert-api
```

---

### ❌ Issue 14: Build Fails on Server

**Symptoms:**
- `npm run build` fails on server
- Out of memory during build
- Build takes too long

**Solution:**

**Always build locally, not on server:**

```bash
# On your local machine (Windows)
cd "d:\Bidalert Next JS\bid2alert.resilientshieldcybersolutions.com\bid2alert-nextjs"
npm run build

# Upload the .next folder to server via FTP
# Then on server, just run:
pm2 restart bidalert-frontend
```

---

## 🔍 DIAGNOSTIC COMMANDS

### Check Everything
```bash
# System info
uname -a
node -v
npm -v
pm2 -v

# Check running processes
pm2 status
ps aux | grep node

# Check ports
lsof -i :3000
lsof -i :5000

# Check disk space
df -h

# Check memory
free -h

# Check logs
pm2 logs --lines 50

# Test endpoints
curl http://localhost:3000
curl http://localhost:5000/api/health
curl https://yourdomain.com
curl https://yourdomain.com/api/health
```

---

## 📞 WHEN TO CONTACT HOSTINGER SUPPORT

Contact support if:
- ✅ Node.js not available or version too old
- ✅ Apache modules (mod_proxy, mod_rewrite) need enabling
- ✅ SSH access not working
- ✅ Server keeps crashing
- ✅ Disk space issues
- ✅ Need to upgrade hosting plan
- ✅ SSL certificate issues
- ✅ Domain configuration problems

**How to contact:**
1. Login to hPanel
2. Click **Help** or **Support** icon
3. Start **Live Chat** (24/7 available)
4. Explain your issue clearly

**What to tell them:**
- "I'm deploying a Node.js application"
- "I need PM2 to run continuously"
- "Please enable mod_proxy and mod_rewrite"
- "My app runs on ports 3000 and 5000"

---

## 🆘 EMERGENCY RESET

If everything is broken and you want to start fresh:

```bash
# SSH into server
ssh username@server-ip -p 65002

# Stop all PM2 processes
pm2 delete all

# Remove node_modules
cd ~/public_html/bidalert-backend
rm -rf node_modules package-lock.json

cd ~/public_html/bidalert-frontend
rm -rf node_modules package-lock.json

# Reinstall everything
cd ~/public_html/bidalert-backend
npm install --production
pm2 start server.js --name bidalert-api

cd ~/public_html/bidalert-frontend
npm install --production
pm2 start npm --name bidalert-frontend -- start

pm2 save
pm2 startup

# Check status
pm2 status
pm2 logs
```

---

## 📋 TROUBLESHOOTING CHECKLIST

Before asking for help, verify:

- [ ] Node.js version is 18+
- [ ] All files uploaded correctly
- [ ] `.env` files have correct values
- [ ] Database exists and credentials are correct
- [ ] `npm install` completed without errors
- [ ] PM2 apps are running (`pm2 status`)
- [ ] No errors in logs (`pm2 logs`)
- [ ] Ports 3000 and 5000 are not blocked
- [ ] `.htaccess` file exists and is correct
- [ ] SSL certificate is installed
- [ ] Domain is pointing to correct server

---

**💡 TIP: Most issues are solved by checking logs first!**

```bash
pm2 logs --lines 100
```

**The error message usually tells you exactly what's wrong.**

---

**Need more help? See HPANEL_DEPLOYMENT_GUIDE.md for detailed instructions.**
