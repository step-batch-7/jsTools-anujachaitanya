const { parseUserArgs } = require('./optionParsing');
const { loadLines } = require('./sortLib');
const exitCode = 2;
const EMPTY_STRING = '';
let inputStream = process.stdin;

const sort = function (cmdLineArgs, readStream, displayResult) {
  const userOptions = parseUserArgs(cmdLineArgs);

  if (userOptions.error) {
    displayResult({ error: userOptions.error, contents: EMPTY_STRING });
    process.exitCode = exitCode;
    return;
  }

  const finishCallback = function ({ errorMsg, contents }) {
    if (errorMsg) {
      displayResult({ error: errorMsg, contents: EMPTY_STRING });
      return;
    }
    displayResult({ contents: contents, error: EMPTY_STRING });
  };

  if (userOptions.path) {
    inputStream = readStream(userOptions.path);
  }
  loadLines(userOptions.options, inputStream, finishCallback);
};

module.exports = { sort };
