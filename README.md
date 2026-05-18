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

No environment variables are required for the current static site. Use `.env.example` as the template if public Vite variables are added later.

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

4. Leave Environment Variables empty for this version.
5. Click **Deploy**.
6. After the first deploy, open the production URL and verify the page loads.

## Production Notes

- `vercel.json` pins the Vercel build settings, serves the Vite `dist` output, applies long-term cache headers to generated assets, and routes all paths to `index.html`.
- `.gitignore` excludes dependencies, build output, local environment files, Vercel state, and local tool output.
- GitHub Actions runs `npm ci` and `npm run build` on pushes to `main` and pull requests.
