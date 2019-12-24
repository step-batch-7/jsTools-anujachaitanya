const fs = require("fs");
const fsTools = {
  reader: fs.readFile,
  encoding: "utf8",
  exists: fs.existsSync
};

const streams = {
  error: console.error,
  logger: console.log
};

module.exports = { fsTools, streams };
