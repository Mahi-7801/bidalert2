# 🚀 How to Deploy on Vercel

Since your Backend is complex (uses databases, file uploading, and OCR), it **cannot** run on Vercel.
We will use a **Hybrid Setup**:
- **Frontend** → Hosted on **Vercel** (Fast, Global CDN).
- **Backend** → Hosted on **VPS** (Your current server `bid2.bidalert.in`).

---

## 🛑 Step 1: Deploy Backend to VPS (Do this FIRST)
The frontend CANNOT work if the backend is not online.
1. Go to your local folder `d:\Bidalert Next JS\bid2alert.resilientshieldcybersolutions.com`.
2. Find `bidalert_unified.zip` (it was created by the build script).
3. Upload it to your Hosting's `public_html` folder.
4. **Extract** it.
5. **Delete** "Under Construction" `index.html`.
6. Start the Node.js App (`server.js`).
7. **Verify**: Open `https://bid2.bidalert.in/api/health` in your browser. It should say `"status": "ok"`.

---

## ⚡ Step 2: Deploy Frontend to Vercel
I have already updated your `next.config.ts` to automatically connect to your VPS.

1. **Push Code to GitHub**
   - Create a GitHub repository (e.g., `bidalert-frontend`).
   - Push *only* the `bid2alert-nextjs` folder (or the whole project, but set Root Directory correctly).

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com) → **Add New Project**.
   - Select your GitHub repo.
   - **Framework Preset**: Next.js (Auto-detected).
   - **Root Directory**: `bid2alert-nextjs` (Edit this if it defaults to `/`).
   - **Environment Variables**:
     You don't typically need them because I hardcoded the rewrite to `bid2.bidalert.in`, but for safety, add:
     - `NEXT_PUBLIC_API_URL` = `https://bid2.bidalert.in/api`

3. **Click Deploy**
   - Vercel will build the site.
   - Once done, you will get a URL like `bidalert-nextjs.vercel.app`.

---

## 🔗 How It Works
When you visit your Vercel site:
1. User clicks "Login".
2. Browser sends request to `https://your-vercel-app.com/api/auth/login`.
3. Vercel **Rewrites** (Proxies) this request to `https://bid2.bidalert.in/api/auth/login`.
4. Your VPS processes it and sends the response back.

**Success!** You now have a Vercel Frontend and a VPS Backend.
