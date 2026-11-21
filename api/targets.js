const { TARGETS } = require("../server/targets.js");

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(TARGETS);
};
