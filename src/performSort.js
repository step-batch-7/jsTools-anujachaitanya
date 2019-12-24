const { parseUserArgs, sort, loadContents } = require("./sortLib");

const sortForFile = function(lines) {
  const sortedLines = sort(lines);
  return sortedLines.join("\n");
};

const performSort = function(cmdLineArgs, fsTools) {
  const userOptions = parseUserArgs(cmdLineArgs);
  try {
    if (userOptions.path) {
      let lines = loadContents(
        userOptions.path,
        fsTools.reader,
        fsTools.exists,
        fsTools.encoding
      );
      const sortedLines = sort(lines).join("\n");
      return { lines: sortedLines };
    }
  } catch (error) {
    return { error: `sort: ${error.message}` };
  }
};

module.exports = { performSort, sortForFile };
