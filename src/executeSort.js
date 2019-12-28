const { parseUserArgs } = require("./optionParsing");
const { loadLines } = require("./sortLib");
let inputStream = process.stdin;
const EMPTY_STRING = "";

const sort = function(cmdLineArgs, readStream, displayResult) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.error) {
    displayResult(userOptions.error, EMPTY_STRING);
    process.exitCode = 2;
    return;
  }

  const finishCallback = ({ errorMsg, contents }) => {
    errorMsg ? (contents = EMPTY_STRING) : (errorMsg = EMPTY_STRING);
    displayResult(errorMsg, contents);
  };

  if (userOptions.path) {
    inputStream = readStream(userOptions.path);
  }
  loadLines(userOptions.options, inputStream, finishCallback);
  return;
};

module.exports = { sort, loadLines };
