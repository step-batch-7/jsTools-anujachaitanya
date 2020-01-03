const fs = require('fs');
const { stdin , stdout, stderr} = require('process')
const {  parseUserArgs } = require('./src/optionParsing');
const { sort } = require('./src/executeSort');
const [, , ...cmdLineArgs] = process.argv;

const main = function () {
  const options = parseUserArgs(cmdLineArgs);;
  sort(options, stdin, fs.createReadStream, ({ error, contents }) => {
    stdout.write(contents);
    stderr.write(error);
  });
};

main();
