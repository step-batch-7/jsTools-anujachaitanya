const {
  parseUserArgs,
  loadContents,
  sort,
  generateErrorMsg
} = require("./sortLib");

const performSort = function(cmdLineArgs, fsTools) {
  const userOptions = parseUserArgs(cmdLineArgs);
  const contents = loadContents(userOptions.path, fsTools);
  contents.options = userOptions.options;
  if (contents.error) {
    generateErrorMsg(contents);
  }
  return sort(contents).join("\n");
};

module.exports = { performSort };
