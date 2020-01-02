const fs = require('fs');
const {  parseUserArgs } = require('./src/optionParsing');
const { sort } = require('./src/executeSort');
const [, , ...cmdLineArgs] = process.argv;

const main = function () {
  const options = parseUserArgs(cmdLineArgs);
  const streams = { fileStream: fs.createReadStream, stdin: process.stdin};
  sort(options, streams, ({ error, contents }) => {
    process.stdout.write(contents);
    process.stderr.write(error);
  });
};

main();
