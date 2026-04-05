# Deployment Options

You have two main ways to deploy this project.

## Option 1: Unified Deployment on VPS (Recommended)
**Best for:** Ease of use, no CORS issues, everything in one place.
**Status:** You already have the specific build file ready (`bidalert_unified.zip`).

1. **Clean Your Server**
   - Open your hosting File Manager.
   - Go to `public_html`.
   - **Delete everything** (especially the `index.html` that shows "Under Construction").

2. **Upload & Extract**
   - Upload `bidalert_unified.zip` (from your local valid directory) to `public_html`.
   - Extract the zip file.
   - You should see `server.js`, `package.json`, and a `public` folder (containing your frontend).

3. **Start the Server**
   - In your hosting Node.js setup:
   - Application Root: `public_html`
   - Application Startup File: `server.js`
   - Click **Run NPM Install**.
   - Click **Start App**.

4. **Verify**
   - Visit `https://bid2.bidalert.in`. It should work immediately.

---

## Option 2: Hybrid Deployment (Vercel Frontend + VPS Backend)
**Best for:** Using Vercel's global CDN for the frontend.
**Requirement:** Your backend MUST still run on your VPS (like in Option 1, but you can ignore the `public` folder there).

**Step 1: Fix the Backend on VPS**
You *must* do Option 1 first to get your Backend API running at `https://bid2.bidalert.in`.

**Step 2: Prepare Frontend for Vercel**
Your current setup is for "Static Export" (Unified). To use Vercel, you need to change configurations.

1. **Edit `bid2alert-nextjs/next.config.ts`**:
   Remove `output: 'export'` and add rewrites.

   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
       // output: 'export', // <-- REMOVE OR COMMENT THIS OUT
       reactStrictMode: true,
       typescript: {
           ignoreBuildErrors: true,
       },
       images: {
           unoptimized: true,
           remotePatterns: [ ... ],
       },
       async rewrites() {
           return [
               {
                   source: '/api/:path*',
                   destination: 'https://bid2.bidalert.in/api/:path*' // Point to your VPS Backend
               }
           ];
       }
   } as any;

   export default nextConfig;
   ```

2. **Deploy to Vercel**
   - Push your code to GitHub.
   - Import the `bid2alert-nextjs` folder as the Root Directory in Vercel.
   - Vercel will auto-detect Next.js and deploy.

**Warning:** If you switch to Option 2, your local `build-unified.bat` script will stop working efficiently because it expects `output: 'export'`.
