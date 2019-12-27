const getInvalidOption = function(options) {
  const validOptions = ["r", "n"];
  const invalidOptions = options.filter(option => !validOptions.includes(option));
  return invalidOptions[0];
};

const extractOptions = userArgs => {
  let options = userArgs.filter(argv => argv.startsWith("-"));
  options = options.map(option => option.slice(1));
  return options;
};

const extractPath = userArgs => {
  const path = userArgs.filter(userArg => !userArg.startsWith("-"))[0];
  return path;
};

const parseUserArgs = function(cmdLineArgs) {
  let parsedUserArgs = {
    path: undefined,
    options: [],
    invalidOption: undefined
  };
  parsedUserArgs.options = extractOptions(cmdLineArgs);
  parsedUserArgs.path = extractPath(cmdLineArgs);
  parsedUserArgs.invalidOption = getInvalidOption(parsedUserArgs.options);
  return parsedUserArgs;
};

module.exports = {
  getInvalidOption,
  parseUserArgs
};
