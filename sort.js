const fs = require('fs');
const { stdin, stdout, stderr } = require('process');
const { parseUserArgs } = require('./src/optionParsing');
const { sort } = require('./src/executeSort');
const [, , ...cmdLineArgs] = process.argv;
const StreamPicker = require('./src/streamPicker');

const main = function() {
  const options = parseUserArgs(cmdLineArgs);
  const streamPicker = new StreamPicker(fs.createReadStream, stdin);
  sort(options, streamPicker, ({ error, contents }) => {
    stdout.write(contents);
    stderr.write(error);
  });
};

main();
