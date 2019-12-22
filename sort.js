const { parseUserArgs, loadContents, sort } = require("./src/sortLib");
const cmdLineArgs = process.argv.slice(2);
const { fsTools } = require("./src/config");
const main = function() {
  const path = parseUserArgs(cmdLineArgs);
  const lines = loadContents(path, fsTools);
  console.log(sort(lines).join("\n"));
};

main();
