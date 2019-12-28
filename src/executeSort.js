const { parseUserArgs } = require('./optionParsing');
const { loadLines } = require('./sortLib');
const exitCode = 2;
const EMPTY_STRING = '';
let inputStream = process.stdin;

const sort = function (cmdLineArgs, readStream, displayResult)
{
  const userOptions = parseUserArgs(cmdLineArgs);

  if (userOptions.error) {
    displayResult(userOptions.error, EMPTY_STRING);
    process.exitCode = exitCode;
    return;
  }

  const finishCallback = ({ errorMsg, contents }) =>
  {
    errorMsg ? contents = EMPTY_STRING : errorMsg = EMPTY_STRING;
    displayResult(errorMsg, contents);
  };

  userOptions.path && (inputStream = readStream(userOptions.path));
  loadLines(userOptions.options, inputStream, finishCallback);
};

module.exports = { sort };
