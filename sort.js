const { parseUserArgs, loadContents, sort } = require("./sortLib");
const cmdLineArgs = process.env;
const fsTools = require("./src/config");
const main = function() {
  const path = parseUserArgs(cmdLineArgs);
  const lines = loadContents(path, fsTools);
  return sort(lines);
};
