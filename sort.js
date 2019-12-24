const { performSort } = require("./src/performSort");
const cmdLineArgs = process.argv.slice(2);
const fs = require("fs");
const main = function() {
  const fsTools = {
    reader: fs.readFileSync,
    exists: fs.existsSync,
    encoding: "utf8"
  };
  const sortContents = performSort(cmdLineArgs, fsTools);
  sortContents.lines && console.log(sortContents.lines);
  sortContents.error && console.error(sortContents.error);
};

main();
