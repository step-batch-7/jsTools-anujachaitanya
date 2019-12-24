const { numericSort } = require("./sortTypes");

const sortLines = function(lines) {
  let sortedLines = lines.split("\n").sort();
  return sortedLines.join("\n");
};

const getInvalidOption = function(options) {
  const validOptions = ["-r", "-n"];
  invalidOptions = options.filter(x => !validOptions.includes(x));
  return invalidOptions[0];
};

const parseUserArgs = function(userArgs) {
  let parsedUserArgs = { path: undefined, options: [] };
  userArgs.map(x => {
    let option = x.split("");
    option[0] == "-"
      ? parsedUserArgs.options.push(x)
      : (parsedUserArgs.path = x);
  });
  const option = getInvalidOption(parsedUserArgs.options);
  parsedUserArgs.invalidOption = option;
  return parsedUserArgs;
};

module.exports = {
  sortLines,
  getInvalidOption,
  parseUserArgs
};
