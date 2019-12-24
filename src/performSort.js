<<<<<<< HEAD
<<<<<<< HEAD
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
=======
const {
  parseUserArgs,
  loadContents,
  sort,
  generateErrorMsg
} = require("./sortLib");

const performSort = function(cmdLineArgs, fsTools) {
  const userOptions = parseUserArgs(cmdLineArgs);
=======
const {
  parseUserArgs,
  loadContents,
  sort,
  generateErrorMsg
} = require("./sortLib");

const performSort = function(cmdLineArgs, fsTools) {
  const userOptions = parseUserArgs(cmdLineArgs);
>>>>>>> parent of fffe868... made async readFile and modified perform sort
  const contents = loadContents(userOptions.path, fsTools);
  contents.options = userOptions.options;
  if (contents.error) {
    generateErrorMsg(contents);
<<<<<<< HEAD
>>>>>>> parent of fffe868... made async readFile and modified perform sort
=======
>>>>>>> parent of fffe868... made async readFile and modified perform sort
  }
  return sort(contents).join("\n");
};

module.exports = { performSort, sortLines };
