const getInvalidOption = function(options) {
  const validOptions = ["-r", "-n"];
  const invalidOptions = options.filter(
    option => !validOptions.includes(option)
  );
  return invalidOptions[0];
};
const separateUserArgs = function(userArgs) {
  let parsedUserArgs = { path: undefined, options: [] };
  userArgs.map(argv => {
    argv.startsWith("-")
      ? parsedUserArgs.options.push(argv)
      : (parsedUserArgs.path = argv);
  });
  return parsedUserArgs;
};

const parseUserArgs = function(userArgs) {
  const parsedUserArgs = separateUserArgs(userArgs);
  const invalidOption = getInvalidOption(parsedUserArgs.options);
  parsedUserArgs.invalidOption = invalidOption;
  return parsedUserArgs;
};

module.exports = {
  getInvalidOption,
  parseUserArgs
};
