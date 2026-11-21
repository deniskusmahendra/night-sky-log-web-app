# Chart.js — setup note

Install:

```bash
npm install chart.js
```

Chart.js 4.x is ESM-only, so the project should be an ES module:

```json
{ "type": "module" }
```

With a bundler such as Vite, import the pre-registered build for a quick start (`chart.js/auto` includes all controllers, elements, scales, and plugins but disables tree-shaking):

```js
import Chart from "chart.js/auto";

new Chart(document.querySelector("#chart"), {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [{ label: "Targets", data: [3, 5, 2] }],
  },
});
```

The first argument is the canvas element; the config supplies a `type` plus `data` (`labels` and `datasets`) and optional `options`. For smaller bundles, register only the components you use instead of importing `chart.js/auto`.

Sources: [installation](https://github.com/chartjs/chart.js/blob/master/docs/getting-started/installation.md), [integration](https://github.com/chartjs/chart.js/blob/master/docs/getting-started/integration.md), [usage](https://github.com/chartjs/chart.js/blob/master/docs/getting-started/usage.md), [v4 migration](https://github.com/chartjs/chart.js/blob/master/docs/migration/v4-migration.md) (via Context7).
