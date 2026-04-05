# 📋 BidAlert - hPanel Deployment Checklist

Use this checklist to track your deployment progress.

---

## ✅ Pre-Deployment (Local)

- [ ] Build completed successfully (`npm run build`)
- [ ] Update `.env.local` with production API URL
- [ ] Update `backend/.env` with production database credentials
- [ ] Test build locally (`npm start`)
- [ ] Export database from local MySQL

---

## ✅ hPanel Setup

- [ ] Login to hPanel (https://hpanel.hostinger.com)
- [ ] SSH access enabled
- [ ] MySQL database created
  - Database name: ________________
  - Username: ________________
  - Password: ________________
  - Hostname: ________________
- [ ] FTP/SFTP credentials noted
- [ ] Domain configured

---

## ✅ File Upload

- [ ] Frontend files uploaded to `public_html/bidalert-frontend/`
  - [ ] `.next/` folder
  - [ ] `public/` folder
  - [ ] `package.json`
  - [ ] `.env.local`
- [ ] Backend files uploaded to `public_html/bidalert-backend/`
  - [ ] All `.js` files
  - [ ] `routes/` folder
  - [ ] `package.json`
  - [ ] `.env` file
- [ ] Database imported via phpMyAdmin

---

## ✅ SSH Configuration

- [ ] Connected to server via SSH
- [ ] Node.js version checked (`node -v`)
- [ ] Backend dependencies installed (`npm install --production`)
- [ ] Frontend dependencies installed (`npm install --production`)
- [ ] PM2 installed globally (`npm install -g pm2`)

---

## ✅ Application Start

- [ ] Backend started with PM2
  ```bash
  pm2 start server.js --name bidalert-api
  ```
- [ ] Frontend started with PM2
  ```bash
  pm2 start npm --name bidalert-frontend -- start
  ```
- [ ] PM2 configuration saved (`pm2 save`)
- [ ] PM2 startup configured (`pm2 startup`)
- [ ] Applications running (`pm2 status`)

---

## ✅ Domain Configuration

- [ ] `.htaccess` created with proxy rules
- [ ] API routing configured
- [ ] SSL certificate installed
- [ ] HTTPS forced (redirect HTTP to HTTPS)

---

## ✅ Testing

- [ ] Frontend accessible: https://yourdomain.com
- [ ] Backend API accessible: https://yourdomain.com/api/health
- [ ] Database connection working
- [ ] Login/Register working
- [ ] All pages loading correctly
- [ ] No console errors

---

## ✅ Security

- [ ] JWT_SECRET changed in production
- [ ] Strong database password set
- [ ] `.env` files protected from public access
- [ ] CORS configured properly
- [ ] `NODE_ENV=production` set

---

## ✅ Monitoring

- [ ] PM2 logs checked (`pm2 logs`)
- [ ] No errors in logs
- [ ] Applications auto-restart on crash
- [ ] Server restart tested

---

## 🎯 Post-Deployment

- [ ] Test all major features
- [ ] Check mobile responsiveness
- [ ] Test payment/subscription features (if applicable)
- [ ] Setup backup schedule
- [ ] Document server credentials securely
- [ ] Share live URL with team

---

## 📝 Important Information

**Server Details:**
- Server IP: ________________
- SSH Port: ________________
- SSH Username: ________________

**Database:**
- Host: ________________
- Database: ________________
- Username: ________________

**Domain:**
- Main URL: ________________
- API URL: ________________

**PM2 Commands:**
```bash
pm2 status          # Check status
pm2 logs            # View logs
pm2 restart all     # Restart apps
pm2 stop all        # Stop apps
```

---

## 🆘 Emergency Contacts

- **Hostinger Support**: https://hpanel.hostinger.com (Live Chat)
- **Email**: support@hostinger.com
- **Phone**: Check hPanel for regional numbers

---

**Last Updated:** ________________
**Deployed By:** ________________
**Status:** ☐ In Progress  ☐ Completed  ☐ Issues

---

## 📌 Notes

_Add any deployment notes, issues encountered, or special configurations here:_

