const { numericSort } = require("./sortTypes");

const sortLines = function(options, lines) {
  let sortedLines = lines.split("\n").sort();
  if (options.includes("-n")) {
    sortedLines = numericSort(sortedLines);
  }
  options.includes("-r") && sortedLines.reverse();
  return sortedLines.join("\n");
};

const getInvalidOption = function(options) {
  const validOptions = ["-r", "-n"];
  const invalidOptions = options.filter(
    option => !validOptions.includes(option)
  );
  return invalidOptions[0];
};

const parseUserArgs = function(userArgs) {
  let parsedUserArgs = { path: undefined, options: [] };
  userArgs.map(argv => {
    argv.startsWith("-")
      ? parsedUserArgs.options.push(argv)
      : (parsedUserArgs.path = argv);
  });
  const invalidOption = getInvalidOption(parsedUserArgs.options);
  parsedUserArgs.invalidOption = invalidOption;
  return parsedUserArgs;
};

module.exports = {
  sortLines,
  getInvalidOption,
  parseUserArgs
};
