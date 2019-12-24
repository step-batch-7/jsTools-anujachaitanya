const { performSort } = require("./src/performSort");
const cmdLineArgs = process.argv.slice(2);
const { fsTools, streams } = require("./src/config");
const main = function() {
  performSort(cmdLineArgs, fsTools, streams);
};

main();
