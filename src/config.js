const fs = require("fs");
const fsTools = {
  reader: fs.readFileSync,
  encoding: "utf8",
  exists: fs.existsSync
};

module.exports = { fsTools };
