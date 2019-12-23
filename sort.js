const { performSort } = require("./src/performSort");
const cmdLineArgs = process.argv.slice(2);
const { fsTools } = require("./src/config");
const main = function() {
  try {
    console.log(performSort(cmdLineArgs, fsTools));
  } catch (error) {
    console.error(error.message);
  }
};

main();
