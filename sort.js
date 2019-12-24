const { sort } = require("./src/executeSort");
const cmdLineArgs = process.argv.slice(2);
const fs = require("fs");
const main = function() {
  const fsTools = {
    reader: fs.readFile,
    encoding: "utf8"
  };
  sort(cmdLineArgs, fsTools, console.log, console.error);
};

main();
