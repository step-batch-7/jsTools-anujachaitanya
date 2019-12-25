const { parseUserArgs, sortLines } = require("./sortLib");

const sortForFile = function(userOptions, error, data) {
  const errors = {
    ENOENT: `No such a file or directory`,
    EISDIR: `Is a directory`,
    EACCES: `Permission denied`
  };
  if (error) {
    this.errorStream(`sort: ${errors[error.code]}`);
    return;
  }
  this.outputStream(sortLines(userOptions.options, data));
};

const sort = function(cmdLineArgs, fsTools, outputStream, errorStream) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.invalidOption) {
    errorStream(`sort: invalid option -${userOptions.invalidOption}`);
    return;
  }

  if (userOptions.path) {
    fsTools.reader(
      userOptions.path,
      fsTools.encoding,
      sortForFile.bind({ outputStream, errorStream }, userOptions)
    );
  }
};

module.exports = { sort, sortForFile };
