# Deployment Guide — ActionPath

The frontend and backend deploy independently:

- **Frontend (React + Vite)** → **Vercel** (static)
- **Backend (Express + Pino)** → **Render** (Node web service)

Deploy the **backend first** so you have a public URL to plug into the frontend.

---

## 1. Backend on Render

1. Push this repo to GitHub (e.g. `DIXITNAYAN/Eligibility-checker-`).
2. Go to <https://dashboard.render.com> → **New** → **Web Service**.
3. **Connect** your GitHub account and select the repo.
4. Fill in these settings:

   | Field | Value |
   |---|---|
   | Name | `actionpath-api` (anything you like) |
   | Region | `Singapore` (closest to India) |
   | Branch | `main` |
   | Root Directory | *(leave blank — repo root)* |
   | Runtime | `Node` |
   | Build Command | `npm install -g pnpm@10 && pnpm install --frozen-lockfile && pnpm --filter @workspace/api-server run build` |
   | Start Command | `pnpm --filter @workspace/api-server run start` |
   | Instance Type | `Free` (or higher) |

5. Under **Environment** add:
   - `NODE_ENV` = `production`
   - `NODE_VERSION` = `20`

6. Click **Create Web Service**. Render will build and deploy. After ~3 minutes you will get a URL like:

   ```
   https://actionpath-api.onrender.com
   ```

7. Verify the health check:

   ```
   https://actionpath-api.onrender.com/api/healthz
   ```
   Should return `{"status":"ok"}`.

---

## 2. Frontend on Vercel

1. Go to <https://vercel.com/new> → **Import Git Repository** → pick the same repo.
2. Vercel detects Vite. Override these settings:

   | Field | Value |
   |---|---|
   | Framework Preset | `Vite` |
   | Root Directory | `artifacts/actionpath` |
   | Install Command | `cd ../.. && npm install -g pnpm@10 && pnpm install --frozen-lockfile` |
   | Build Command | `cd ../.. && pnpm --filter @workspace/actionpath run build` |
   | Output Directory | `dist/public` |

3. Under **Environment Variables** add:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://actionpath-api.onrender.com` *(your Render URL from step 1)* |

4. Click **Deploy**. After ~1 minute you will have:

   ```
   https://eligibility-checker.vercel.app
   ```

5. Open the site, fill the profile form, and confirm recommendations load.

---

## Updating the deployed apps

Both Render and Vercel auto-redeploy on every `git push` to `main`.

---

## Common gotchas

- **CORS**: the backend already enables CORS for all origins, so Vercel → Render works out of the box. If you want to lock it down, edit `artifacts/api-server/src/app.ts` and pass an `origin` option to `cors()`.
- **Render free tier sleeps** after 15 min of inactivity. The first request after a sleep takes ~30 sec while the dyno wakes up. Upgrade to a paid plan to avoid this.
- **Vercel build fails with `pnpm not found`**: make sure the install command starts with `npm install -g pnpm@10` as shown above. Vercel does not ship pnpm by default.
- **Frontend calls fail with 404**: check that `VITE_API_BASE_URL` does **not** end with a trailing slash.
