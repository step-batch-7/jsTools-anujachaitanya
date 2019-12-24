const { parseUserArgs, sortByOptions } = require("./sortLib");

const sortLines = function(streams, userOptions, data) {
  let sortedLines = data.split("\n").sort();
  if (userOptions.options.length != 0) {
    sortedLines = sortByOptions(userOptions.options, sortedLines);
  }
  return streams.logger(sortedLines.join("\n"));
};

const performSort = function(cmdLineArgs, fsTools, streams) {
  const userOptions = parseUserArgs(cmdLineArgs);
  if (userOptions.invalidOption) {
    return streams.error(
      `Option ${userOptions.invalidOption}: invalid options`
    );
  }
  if (userOptions.path) {
    return fsTools.reader(userOptions.path, fsTools.encoding, (error, data) => {
      if (error) {
        return streams.error(`sort: No such a file or directory`);
      }
      return sortLines(streams, userOptions, data);
    });
  }
};

module.exports = { performSort, sortLines };
