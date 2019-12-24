const { parseUserArgs, sort } = require("./sortLib");

const performSortForFile = function(streams, error, data) {
  if (error) {
    return streams.error(`sort: No such a file or directory`);
  }
  this.lines = data.split("\n");
  const sortedLines = sort(this).join("\n");
  return streams.logger(sortedLines);
};

const performSort = function(cmdLineArgs, fsTools, streams) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.invalidOption) {
    return streams.error(
      `Option ${userOptions.invalidOption}: invalid options`
    );
  }
  if (userOptions.path) {
    fsTools.readerAsync(
      userOptions.path,
      "utf8",
      performSortForFile.bind(userOptions, streams)
    );
  }
};

module.exports = { performSort };
