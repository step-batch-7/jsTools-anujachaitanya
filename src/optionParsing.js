const zero = 0;
const one = 1;
const getInvalidOption = function (options) {
  const validOptions = ['r', 'n'];
  const invalidOptions = options.filter(
    option => !validOptions.includes(option)
  );
  const error = invalidOptions[zero]
    ? `sort: invalid option -- ${invalidOptions[zero]}`
    : invalidOptions[zero];
  return error;
};

const extractOptions = userArgs => {
  let options = userArgs.filter(argv => argv.startsWith('-'));
  options = options.map(option => option.slice(one));
  return options;
};

const extractPath = userArgs => {
  const path = userArgs.filter(userArg => !userArg.startsWith('-'))[zero];
  return path;
};

const parseUserArgs = function (cmdLineArgs) {
  const parsedUserArgs = { path: undefined, options: [], error: undefined };
  parsedUserArgs.options = extractOptions(cmdLineArgs);
  parsedUserArgs.path = extractPath(cmdLineArgs);
  parsedUserArgs.error = getInvalidOption(parsedUserArgs.options);
  return parsedUserArgs;
};

module.exports = {
  parseUserArgs,
  getInvalidOption
};
