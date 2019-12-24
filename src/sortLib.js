const { numericSort } = require("./sortTypes");

const sort = function(lines) {
  let sortedLines = lines.sort();
  return sortedLines;
};

const getInvalidOption = function(options) {
  const validOptions = ["-r", "-n"];
  invalidOptions = options.filter(x => !validOptions.includes(x));
  return invalidOptions[0];
};

const loadContents = function(path, reader, exists, encoding) {
  if (!exists(path)) {
    throw new Error("No such a file or directory");
  }
  const lines = reader(path, encoding);
  return lines.split("\n");
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
  getInvalidOption,
  parseUserArgs,
  loadContents
};
