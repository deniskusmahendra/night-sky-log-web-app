# Express — setup note

Install (Node.js 18+ required; create `package.json` first):

```bash
npm init -y
npm install express
```

Minimal app (`index.js`, CommonJS as used in `server/`):

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

ESM alternative: add `"type": "module"` to `package.json`, then use `import express from "express"`.

Add a `"start": "node index.js"` script to run it with `npm start`. For our API, routes use `res.json(...)` instead of `res.send(...)`.

Sources: [Express README](https://github.com/expressjs/express/blob/master/Readme.md), [hello-world example](https://github.com/expressjs/express/blob/master/examples/hello-world/index.js) (via Context7).
