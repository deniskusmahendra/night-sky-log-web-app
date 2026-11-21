# Vite — setup note

Scaffold a new project, or install into an existing one:

```bash
npm create vite@latest        # interactive; choose the "vanilla" template
npm install -D vite           # for an existing project
```

Standard npm scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

`index.html` at the project root is the entry point; load your code as a module:

```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```

Run `npm run dev` for HMR, `npm run build` for production assets, and `npm run preview` to preview that build locally. CLI options such as `--port` and `--open` can be passed to `vite`; run `npx vite --help` for the full list. Note that `vite preview` is for local preview, not a production server.

Sources: [Vite guide](https://github.com/vitejs/vite/blob/main/docs/guide/index.md), [static deployment guide](https://github.com/vitejs/vite/blob/main/docs/guide/static-deploy.md), [create-vite README](https://github.com/vitejs/vite/blob/main/packages/create-vite/README.md) (via Context7).
