const { createReadStream } = require('fs');
const { createInputStream, parseUserArgs } = require('./src/optionParsing');
const { sort } = require('./src/executeSort');
const [, , ...cmdLineArgs] = process.argv;

const main = function () {
  const options = parseUserArgs(cmdLineArgs);
  const readStream = createInputStream(options, process.stdin, createReadStream);
  sort(options, readStream, ({ error, contents }) => {
    process.stdout.write(contents);
    process.stderr.write(error);
  });
};

main();
