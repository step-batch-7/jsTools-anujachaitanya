const { parseUserArgs } = require('./optionParsing');
const { loadLines } = require('./sortLib');
const EMPTY_STRING = '';
let inputStream = process.stdin;

const sort = function (cmdLineArgs, readStream, onSortCompletion) {
  const userOptions = parseUserArgs(cmdLineArgs);

  if (userOptions.error) {
    onSortCompletion({ error: userOptions.error, contents: EMPTY_STRING });
    process.exitCode = 2;
    return;
  }

  const finishCallback = function ({ errorMsg, contents }) {
    if (errorMsg) {
      onSortCompletion({ error: errorMsg, contents: EMPTY_STRING });
      return;
    }
    onSortCompletion({ contents: contents, error: EMPTY_STRING });
  };

  if (userOptions.path) {
    inputStream = readStream(userOptions.path);
  }
  loadLines(userOptions.options, inputStream, finishCallback);
};

module.exports = { sort };
