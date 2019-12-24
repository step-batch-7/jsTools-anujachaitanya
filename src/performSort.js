const { parseUserArgs, sort } = require("./sortLib");

const performSortForFile = function(streams, userOptions, error, data) {
  if (error) {
    return streams.error(`sort: No such a file or directory`);
  }
  userOptions.lines = data.split("\n");
  const sortedLines = sort(userOptions).join("\n");
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
    return fsTools.readerAsync(
      userOptions.path,
      "utf8",
      performSortForFile.bind(null, streams, userOptions)
    );
  }
};

module.exports = { performSort, performSortForFile };
