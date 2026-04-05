# 🚀 Quick Deployment Reference

## 📦 Build & Deploy (3 Simple Steps)

### Step 1: Export Database
```bash
# Run this on your LOCAL machine
export-database.bat
```
This creates `bidalert_database_export.sql`

### Step 2: Build Project
```bash
# Run this on your LOCAL machine
build-and-deploy.bat
```
This creates `bidalert-deployment.zip`

### Step 3: Deploy to Server
1. **Upload files to server:**
   - Upload `bidalert-deployment.zip`
   - Upload `bidalert_database_export.sql`

2. **Extract on server:**
   ```bash
   unzip bidalert-deployment.zip
   ```

3. **Import database:**
   - Use phpMyAdmin to import `bidalert_database_export.sql`
   - Or via command line:
   ```bash
   mysql -u bidalert_bidalert2 -p bidalert_bidalert2 < bidalert_database_export.sql
   ```

4. **Update database host:**
   Edit `backend/.env` and change `DB_HOST` to correct value
   (Ask your hosting provider for MySQL hostname)

5. **Run setup script:**
   ```bash
   chmod +x server-setup.sh
   ./server-setup.sh
   ```

---

## 🔧 Important Configuration

### Find MySQL Hostname
Common locations to check:
- cPanel → MySQL Databases → Remote MySQL
- Hosting control panel → Database section
- Contact hosting support

Common values:
- `localhost` (most common)
- `127.0.0.1`
- `mysql.your-domain.com`
- Specific IP address

### Update Backend .env
```env
DB_HOST=localhost  # ← Change this!
DB_USER=bidalert_bidalert2
DB_PASSWORD=Bidalert@123vcs
DB_NAME=bidalert_bidalert2
```

### Update Frontend .env.local
```env
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

---

## 📊 Useful Commands

### PM2 Management
```bash
pm2 status              # Check status
pm2 logs                # View logs
pm2 restart all         # Restart apps
pm2 stop all            # Stop apps
pm2 delete all          # Remove apps
pm2 monit               # Monitor in real-time
```

### Manual Start (without PM2)
```bash
# Backend
cd backend
node server.js

# Frontend (in new terminal)
cd frontend
npm start
```

### Check if Running
```bash
# Check backend
curl http://localhost:5000/api/health

# Check frontend
curl http://localhost:3000
```

---

## 🐛 Troubleshooting

### Database Connection Error
1. Verify `DB_HOST` in `backend/.env`
2. Test connection:
   ```bash
   mysql -h localhost -u bidalert_bidalert2 -p
   ```
3. Check if MySQL allows remote connections
4. Verify firewall settings

### Port Already in Use
```bash
# Find what's using the port
netstat -ano | findstr :5000
# Kill the process (Windows)
taskkill /PID <process_id> /F
```

### Application Won't Start
1. Check logs: `pm2 logs`
2. Verify Node.js version: `node -v` (should be v18+)
3. Reinstall dependencies: `npm install`
4. Check .env file exists and is correct

### Build Errors
1. Clear cache:
   ```bash
   cd bid2alert-nextjs
   rm -rf .next
   npm run build
   ```
2. Check for missing dependencies
3. Verify Node.js version

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Database created on server
- [ ] Database credentials updated in `.env`
- [ ] Frontend API URL updated in `.env.local`
- [ ] JWT_SECRET changed to secure value
- [ ] Database exported from local
- [ ] Project built successfully
- [ ] All files uploaded to server
- [ ] Dependencies installed on server
- [ ] Database imported to server
- [ ] MySQL hostname verified
- [ ] Applications started with PM2
- [ ] Frontend accessible via browser
- [ ] Backend API responding
- [ ] SSL certificate installed (for HTTPS)

---

## 🎯 Quick Test

After deployment, test these URLs:

1. **Frontend:** `http://your-domain.com`
2. **Backend Health:** `http://your-domain.com/api/health`
3. **Backend API:** `http://your-domain.com/api/tenders`

If all three work, you're good to go! 🎉

---

## 📞 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Review error logs: `pm2 logs`
3. Verify environment variables
4. Contact hosting provider support for server-specific issues

---

**Last Updated:** 2026-01-28
