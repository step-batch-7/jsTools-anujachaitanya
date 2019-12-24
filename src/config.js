const fs = require("fs");
const fsTools = {
  reader: fs.readFile,
  encoding: "utf8",
  exists: fs.existsSync
};

module.exports = { fsTools };
