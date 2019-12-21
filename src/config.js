const fs = require("fs");
const fsTools = {
  reader: fs.readFileSync,
  encoding: "utf8"
};

module.exports = { fsTools };
