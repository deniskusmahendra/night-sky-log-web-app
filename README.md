# Night Sky Log

A small app that suggests what to look at in the night sky each month. It includes an Express API, a Vite web page, and a local OpenCode TUI plugin.

## What's here

- `server/` — Express API serving `GET /api/targets` with 24 bright targets (planets, star clusters, nebulae, and galaxies).
- `web/` — Vite + Chart.js page with a month picker, target cards, and a "Seen It" toggle.
- `docs/` — short setup notes for Express, Vite, and Chart.js.
- `.opencode/plugins/sky/` — OpenCode v2 TUI plugin that adds the `/sky` slash command.

## Requirements

- Node.js 18 or newer and npm
- OpenCode v2 if you want the `/sky` plugin

## Run locally

Install dependencies in both folders:

```bash
cd server && npm install
cd ../web && npm install
```

Start the API in one terminal:

```bash
cd server
npm start
```

It listens on `http://localhost:3001` by default.

Start the web page in another terminal:

```bash
cd web
npm run dev
```

Open **http://localhost:5173/**.

## Build the web page

```bash
cd web
npm run build
```

The production files are written to `web/dist/`. Use `npm run preview` to preview that build locally. The server is plain JavaScript and has no build step.

## API

`GET /api/targets` returns a JSON array of 24 objects:

```json
{
  "id": "orion-nebula",
  "name": "Orion Nebula",
  "type": "Nebula",
  "bestMonth": 1,
  "difficulty": 1,
  "tip": "Spot the fuzzy sword below Orion's Belt, then use binoculars for the core."
}
```

| Field | Meaning |
| --- | --- |
| `id` | Unique kebab-case identifier |
| `name` | Common name of the target |
| `type` | `Planet`, `Star cluster`, `Nebula`, or `Galaxy` |
| `bestMonth` | Month number, 1–12 |
| `difficulty` | 1 (easiest) to 3 (hardest) |
| `tip` | One-line observing tip |

The endpoint sends `Access-Control-Allow-Origin: *` so the Vite page can read it during local development.

## Web page features

- The month picker filters cards by `bestMonth`; "All months" is the default.
- The bar chart at the top shows how many targets are best in each month.
- Each card has a **Seen It** button. Target ids are stored in browser `localStorage` under `night-sky-log:seen`, so they survive reloads and filtering. Clicking again marks the target as unseen.

### Configuration

- `PORT` sets the API port (default `3001`).
- The web page calls `/api/targets` by default. During local development, Vite proxies that path to `http://localhost:3001`, so the Express server must be running.
- `VITE_API_URL` overrides that URL if you need to point at a separate API:

```bash
VITE_API_URL=https://example.com/api/targets npm run dev
```

## Deploy to Vercel

The app is configured as a Vercel **Services** project with two services in `vercel.json`:

- `server` (`server/`, Express) is the API. It is publicly reachable at `/api/*`.
- `web` (`web/`, Vite) is the static site. It is publicly reachable at `/*`.

Top-level rewrites send `/api/(.*)` to `server` and everything else to `web`. The browser calls `/api/targets` on the same origin, so no environment variable is needed in production. There are no service-to-service bindings because the static web service does not call the server from server-side code.

Steps:

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Select the option to group the detected applications into a single project using **Services**. Keep the Root Directory at the repository root.
4. Deploy. The site and `/api/targets` will be available on the same Vercel URL.

To test the Vercel setup locally, run `vercel dev` from the repository root. It runs both services and applies the same rewrites. The Vite dev proxy is disabled automatically when `VERCEL` is set, so `/api` goes through Vercel routing instead of `localhost:3001`.

For plain local development without Vercel, keep using `npm start` in `server/` and `npm run dev` in `web/`.

## OpenCode `/sky` plugin

The plugin in `.opencode/plugins/sky/` is auto-discovered by OpenCode v2. It registers a palette command and slash command titled **`/sky — Clear skies tonight`**; running it shows a toast saying **"Clear skies tonight"**.

Check that it is loaded with:

```bash
opencode plugin list
```

Restart OpenCode after changing plugin files. If you run OpenCode from a different checkout, copy the plugin into that directory's `.opencode/plugins/` folder (or configure it in `cli.json`).
