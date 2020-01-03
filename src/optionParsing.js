const getInvalidOption = function (options) {
  const validOptions = ['r', 'n'];
  const [invalidOption] = options.filter(
    option => !validOptions.includes(option)
  );
  const error = invalidOption
    ? `sort: invalid option -- ${invalidOption}`
    : invalidOption;
  return error;
};

const extractOptions = userArgs => {
  let options = userArgs.filter(argv => argv.startsWith('-'));
  options = options.map(option => {
    const [, ...trimmedOption] = option.split('');
    return trimmedOption.join('');
  });
  return options;
};

const extractPath = userArgs => {
  const filePaths = userArgs.filter(userArg => !userArg.startsWith('-'));
  const [path] = filePaths;
  return path;
};

const parseUserArgs = function (cmdLineArgs) {
  const parsedUserArgs = {path: undefined, options: [], error: undefined};
  parsedUserArgs.options = extractOptions(cmdLineArgs);
  parsedUserArgs.path = extractPath(cmdLineArgs);
  parsedUserArgs.error = getInvalidOption(parsedUserArgs.options);
  return parsedUserArgs;
};

module.exports = {
  parseUserArgs,
  getInvalidOption
};
