const { parseUserArgs, sortLines } = require("./sortLib");

const sortForFile = function(userOptions, error, data) {
  if (error) {
    this.errorStream(`sort: No such a file or directory`);
    return;
  }
  this.outputStream(sortLines(userOptions.options, data));
};

const sort = function(cmdLineArgs, fsTools, outputStream, errorStream) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.path) {
    fsTools.reader(
      userOptions.path,
      fsTools.encoding,
      sortForFile.bind({ outputStream, errorStream }, userOptions)
    );
  }
};

module.exports = { sort, sortForFile };
