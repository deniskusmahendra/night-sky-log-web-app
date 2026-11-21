const express = require("express");
const { TARGETS } = require("./targets");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/targets", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(TARGETS);
});

app.listen(PORT, () => {
  console.log(`Night Sky Log API listening on http://localhost:${PORT}`);
});
