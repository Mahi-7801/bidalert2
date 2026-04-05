# 🗺️ BidAlert - hPanel Deployment Flowchart

Visual guide to the deployment process.

---

## 📊 DEPLOYMENT FLOW

```
┌─────────────────────────────────────────────────────────────┐
│                    START DEPLOYMENT                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: LOCAL PREPARATION                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │ • Run: npm run build                               │     │
│  │ • Update .env.local (production API URL)           │     │
│  │ • Update backend/.env (DB credentials)             │     │
│  │ • Export local database to .sql file               │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: hPANEL SETUP                                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │ • Login to hPanel                                  │     │
│  │ • Enable SSH Access                                │     │
│  │ • Create MySQL Database                            │     │
│  │ • Note credentials                                 │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: UPLOAD FILES                                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Choose Upload Method:                              │     │
│  │                                                     │     │
│  │ [A] File Manager  [B] FTP/SFTP  [C] SSH + Git     │     │
│  │                                                     │     │
│  │ Upload to:                                         │     │
│  │ • public_html/bidalert-frontend/                   │     │
│  │ • public_html/bidalert-backend/                    │     │
│  │                                                     │     │
│  │ ⚠️  DO NOT upload node_modules/                    │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: DATABASE IMPORT                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ • Go to hPanel → phpMyAdmin                        │     │
│  │ • Select your database                             │     │
│  │ • Import → Choose .sql file → Go                   │     │
│  │ • Wait for completion                              │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: SSH - INSTALL DEPENDENCIES                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │ ssh username@server-ip -p 65002                    │     │
│  │                                                     │     │
│  │ Backend:                                           │     │
│  │ cd ~/public_html/bidalert-backend                  │     │
│  │ npm install --production                           │     │
│  │                                                     │     │
│  │ Frontend:                                          │     │
│  │ cd ~/public_html/bidalert-frontend                 │     │
│  │ npm install --production                           │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: INSTALL & CONFIGURE PM2                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │ npm install -g pm2                                 │     │
│  │                                                     │     │
│  │ Start Backend:                                     │     │
│  │ cd ~/public_html/bidalert-backend                  │     │
│  │ pm2 start server.js --name bidalert-api            │     │
│  │                                                     │     │
│  │ Start Frontend:                                    │     │
│  │ cd ~/public_html/bidalert-frontend                 │     │
│  │ pm2 start npm --name bidalert-frontend -- start    │     │
│  │                                                     │     │
│  │ Save Config:                                       │     │
│  │ pm2 save                                           │     │
│  │ pm2 startup                                        │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 7: CONFIGURE DOMAIN & PROXY                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Create .htaccess in public_html/                   │     │
│  │                                                     │     │
│  │ Configure:                                         │     │
│  │ • Force HTTPS                                      │     │
│  │ • Proxy /api → localhost:5000                      │     │
│  │ • Proxy /* → localhost:3000                        │     │
│  │ • Protect .env files                               │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 8: ENABLE SSL                                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │ • hPanel → Security → SSL                          │     │
│  │ • Install Free SSL (Let's Encrypt)                 │     │
│  │ • Wait 2-5 minutes                                 │     │
│  │ • Verify HTTPS works                               │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 9: TESTING & VERIFICATION                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │ ✓ pm2 status (both apps running)                   │     │
│  │ ✓ https://yourdomain.com (frontend loads)          │     │
│  │ ✓ https://yourdomain.com/api/health (API works)    │     │
│  │ ✓ Login/Register functionality                     │     │
│  │ ✓ Database queries working                         │     │
│  │ ✓ No errors in pm2 logs                            │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  ✅ DEPLOYMENT COMPLETE!                     │
│                                                              │
│  Your app is live at: https://yourdomain.com                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 TROUBLESHOOTING DECISION TREE

```
                    ┌─────────────────┐
                    │  Issue Occurs?  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ App Won't   │  │ Database    │  │ 502 Bad     │
    │ Start       │  │ Error       │  │ Gateway     │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
           ▼                ▼                ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ Check:      │  │ Check:      │  │ Check:      │
    │ • pm2 logs  │  │ • .env file │  │ • pm2 status│
    │ • node -v   │  │ • DB creds  │  │ • pm2 logs  │
    │ • npm i     │  │ • phpMyAdmin│  │ • restart   │
    └─────────────┘  └─────────────┘  └─────────────┘
```

---

## 📁 FILE STRUCTURE ON SERVER

```
~/public_html/
│
├── .htaccess                    # Proxy & SSL config
│
├── bidalert-frontend/           # Next.js Frontend
│   ├── .next/                   # Build output
│   ├── public/                  # Static files
│   ├── node_modules/            # Dependencies
│   ├── package.json
│   ├── package-lock.json
│   └── .env.local               # Frontend env vars
│
├── bidalert-backend/            # Express Backend
│   ├── routes/                  # API routes
│   ├── middleware/              # Middleware
│   ├── node_modules/            # Dependencies
│   ├── server.js                # Main server file
│   ├── package.json
│   ├── package-lock.json
│   └── .env                     # Backend env vars
│
└── backups/                     # Optional backup folder
    ├── db_backup_20260210.sql
    └── files_backup_20260210.tar.gz
```

---

## 🔌 PORT MAPPING

```
┌──────────────────────────────────────────────────────┐
│                    INTERNET                          │
│                        │                             │
│                        ▼                             │
│              https://yourdomain.com                  │
│                        │                             │
│                        ▼                             │
│              ┌─────────────────┐                     │
│              │  Apache Server  │                     │
│              │   (Port 80/443) │                     │
│              └────────┬────────┘                     │
│                       │                              │
│         ┌─────────────┴─────────────┐                │
│         │                           │                │
│         ▼                           ▼                │
│  ┌─────────────┐            ┌─────────────┐         │
│  │  /api/*     │            │    /*       │         │
│  │  Proxy to   │            │  Proxy to   │         │
│  │ Port 5000   │            │  Port 3000  │         │
│  └──────┬──────┘            └──────┬──────┘         │
│         │                          │                │
│         ▼                          ▼                │
│  ┌─────────────┐            ┌─────────────┐         │
│  │  Backend    │            │  Frontend   │         │
│  │  (Express)  │◄───────────┤  (Next.js)  │         │
│  │  Port 5000  │   API Call │  Port 3000  │         │
│  └──────┬──────┘            └─────────────┘         │
│         │                                            │
│         ▼                                            │
│  ┌─────────────┐                                     │
│  │   MySQL     │                                     │
│  │  Database   │                                     │
│  │  Port 3306  │                                     │
│  └─────────────┘                                     │
└──────────────────────────────────────────────────────┘
```

---

## ⏱️ ESTIMATED TIME

| Step | Task | Time |
|------|------|------|
| 1 | Local preparation | 5 min |
| 2 | hPanel setup | 10 min |
| 3 | File upload | 15-30 min |
| 4 | Database import | 5 min |
| 5 | Install dependencies | 10 min |
| 6 | Configure PM2 | 5 min |
| 7 | Domain & proxy setup | 10 min |
| 8 | SSL installation | 5 min |
| 9 | Testing | 10 min |
| **TOTAL** | **First-time deployment** | **75-90 min** |

**Subsequent updates:** 10-15 minutes

---

## 🎯 SUCCESS INDICATORS

```
✅ PM2 Status
┌─────────────────────────────────────────────────┐
│ App Name           │ Status  │ CPU │ Memory    │
├────────────────────┼─────────┼─────┼───────────┤
│ bidalert-api       │ online  │ 0%  │ 45.2 MB   │
│ bidalert-frontend  │ online  │ 0%  │ 120.5 MB  │
└─────────────────────────────────────────────────┘

✅ Website Accessible
• https://yourdomain.com → Loads homepage
• https://yourdomain.com/login → Login page works
• https://yourdomain.com/api/health → Returns 200 OK

✅ No Errors in Logs
• pm2 logs → No error messages
• Browser console → No JavaScript errors
```

---

**📖 For detailed instructions, see: HPANEL_DEPLOYMENT_GUIDE.md**
