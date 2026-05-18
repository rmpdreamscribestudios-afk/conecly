# CONECLY Website

Production-ready marketing site for CONECLY, built with React, Vite, and Tailwind CSS.

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS
- lucide-react icons
- Vercel static deployment

## Requirements

- Node.js 20.19 or newer
- npm

The preferred local Node version is listed in `.nvmrc`.

## Local Development

Install dependencies:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment Variables

CONECLY uses Supabase from the browser for the MVP profile and opportunity flows. Add these variables locally in `.env.local` and in Vercel project settings:

```bash
VITE_SUPABASE_URL=https://llbqmjkrnaeulsazmdoe.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

Use the public anon/publishable key from Supabase, not a service role key. Because `VITE_` variables are bundled into the client, the database must be protected with Row Level Security policies.

The frontend expects lightweight `profiles` and `opportunities` tables with these columns:

```text
first_name
location
intent
category
bio / description
contact_method
contact_value
availability
rate
photo_link
type
created_at
```

`profiles` receives the full profile submission. `opportunities` receives the public feed row generated from the same form.

## Project Structure

```text
.
├── .github/workflows/ci.yml
├── public/
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/
│   ├── sections/
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

## GitHub Setup

1. Install Git if it is not already available:

   ```bash
   git --version
   ```

2. Initialize the repository from this project folder:

   ```bash
   git init
   git add .
   git commit -m "Prepare CONECLY website for deployment"
   ```

3. Create a new empty repository on GitHub.

4. Connect the local repository to GitHub:

   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

5. Confirm the GitHub Actions CI workflow passes on `main`.

## Vercel Deployment

1. Go to [Vercel](https://vercel.com/new) and import the GitHub repository.
2. Keep the detected framework preset as `Vite`.
3. Confirm these project settings:

   ```text
   Install Command: npm ci
   Build Command: npm run build
   Output Directory: dist
   Development Command: npm run dev
   ```

4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production, Preview, and Development.
5. Click **Deploy**.
6. After the first deploy, open the production URL and verify the page loads.
7. Submit a test profile, confirm a row appears in both Supabase tables, then remove the test row if needed.

Deploy safely by keeping the Supabase service role key out of Vercel, enabling RLS before sharing the production URL, and starting with narrow MVP policies: allow anonymous inserts into `profiles` and `opportunities`, and allow anonymous reads only from `opportunities`.

## Production Notes

- `vercel.json` pins the Vercel build settings, serves the Vite `dist` output, applies long-term cache headers to generated assets, and routes all paths to `index.html`.
- `.gitignore` excludes dependencies, build output, local environment files, Vercel state, and local tool output.
- GitHub Actions runs `npm ci` and `npm run build` on pushes to `main` and pull requests.
