const { numericSort } = require("./sortTypes");

const sort = function(contents) {
  let sortedLines = contents.lines.sort();
  if (contents.options.includes("-n")) sortedLines = numericSort(sortedLines);
  contents.options.includes("-r") && sortedLines.reverse();
  return sortedLines;
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
  sort,
  parseUserArgs,
  getInvalidOption
};
