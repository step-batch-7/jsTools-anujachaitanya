const { parseUserArgs, loadContents, sort } = require("./sortLib");

const performSort = function(cmdLineArgs, fsTools) {
  const path = parseUserArgs(cmdLineArgs);
  const contents = loadContents(path, fsTools);
  if (contents.error) {
    throw new Error(`${contents.sub} : ${contents.error}`);
  }
  return sort(contents.lines).join("\n");
};

module.exports = { performSort };
