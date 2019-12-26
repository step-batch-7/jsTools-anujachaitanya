const { sort } = require("./src/executeSort");
const cmdLineArgs = process.argv.slice(2);
const fs = require("fs");
const main = function() {
  sort(cmdLineArgs, fs.readFile, (error, content) => {
    process.stdout.write(content);
    process.stderr.write(error);
  });
};

main();
