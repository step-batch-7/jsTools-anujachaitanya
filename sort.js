const fs = require('fs');
const { stdin, stdout, stderr } = require('process');
const { parseUserArgs } = require('./src/optionParsing');
// const { sort } = require('./src/executeSort');
const SortApp = require('./src/sortApp');
const [, , ...cmdLineArgs] = process.argv;
const StreamPicker = require('./src/streamPicker');

const main = function() {
  const display = ({ error, contents }) => {
    stdout.write(contents);
    stderr.write(error);
  };
  const streamPicker = new StreamPicker(fs.createReadStream, stdin);
  const sortApp = new SortApp(parseUserArgs, streamPicker);
  sortApp.run(cmdLineArgs, display);
};

main();
