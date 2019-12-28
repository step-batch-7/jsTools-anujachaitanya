const USAGE =
  "Usage: sort [-bcCdfigMmnrsuz] [-kPOS1[,POS2] ... ] [+POS1 [-POS2]] [-S memsize] [-T tmpdir] [-t separator] [-o outfile] [--batch-size size] [--files0-from file] [--heapsort] [--mergesort] [--radixsort] [--qsort] [--mmap] [--parallel thread_no] [--human-numeric-sort] [--version-sort] [--random-sort [--random-source file]] [--compress-program program] [file ...]";

const getInvalidOption = function(options) {
  const validOptions = ["r", "n"];
  const invalidOptions = options.filter(option => !validOptions.includes(option));
  let error = invalidOptions[0]
    ? `sort: invalid option -- ${invalidOptions[0]}\n${USAGE}`
    : invalidOptions[0];
  return error;
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
  let parsedUserArgs = { path: undefined, options: [], error: undefined };
  parsedUserArgs.options = extractOptions(cmdLineArgs);
  parsedUserArgs.path = extractPath(cmdLineArgs);
  parsedUserArgs.error = getInvalidOption(parsedUserArgs.options);
  return parsedUserArgs;
};

module.exports = {
  parseUserArgs,
  getInvalidOption
};
