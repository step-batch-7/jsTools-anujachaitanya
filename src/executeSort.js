const { parseUserArgs, sortLines } = require("./sortLib");

const sortForFile = function(error, data) {
  if (error) {
    this.errorStream(`sort: No such a file or directory`);
    return;
  }
  this.outputStream(sortLines(data));
};

const sort = function(cmdLineArgs, fsTools, outputStream, errorStream) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.path) {
    fsTools.reader(
      userOptions.path,
      fsTools.encoding,
      sortForFile.bind({ outputStream, errorStream })
    );
  }
};

module.exports = { sort, sortForFile };
