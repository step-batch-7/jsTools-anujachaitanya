const getInvalidOption = function(options) {
  const validOptions = ["-r", "-n"];
  const invalidOptions = options.filter(
    option => !validOptions.includes(option)
  );
  return invalidOptions[0];
};

const extractOptions = userArgs => {
  const options = userArgs.filter(argv => argv.startsWith("-"));
  return options;
};

const extractPath = (options, userArgs) => {
  const path = userArgs.filter(userArg => !options.includes(userArg))[0];
  return path;
};

const parseUserArgs = function(cmdLineArgs) {
  let parsedUserArgs = {
    path: undefined,
    options: [],
    invalidOption: undefined
  };
  parsedUserArgs.options = extractOptions(cmdLineArgs);
  parsedUserArgs.path = extractPath(parsedUserArgs.options, cmdLineArgs);
  parsedUserArgs.invalidOption = getInvalidOption(parsedUserArgs.options);
  return parsedUserArgs;
};

module.exports = {
  getInvalidOption,
  parseUserArgs
};
