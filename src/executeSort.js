const { parseUserArgs, sortLines } = require("./sortLib");
const EMPTY_STRING = "";

const sortForFile = function(userOptions, error, data) {
  const errors = {
    ENOENT: `No such a file or directory`,
    EISDIR: `Is a directory`,
    EACCES: `Permission denied`
  };
  if (error) {
    this.callback(`sort: ${errors[error.code]}`, EMPTY_STRING);
    return;
  }
  this.callback(EMPTY_STRING, sortLines(userOptions.options, data));
  return;
};

const sort = function(cmdLineArgs, reader, callback) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.invalidOption) {
    callback(
      `sort: invalid option -${userOptions.invalidOption}`,
      EMPTY_STRING
    );
    return;
  }

  if (userOptions.path) {
    reader(
      userOptions.path,
      "utf8",
      sortForFile.bind({ callback }, userOptions)
    );
    return;
  }
  return;
};

module.exports = { sort, sortForFile };
