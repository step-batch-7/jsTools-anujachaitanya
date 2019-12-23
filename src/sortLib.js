const sort = function(contents) {
  let sortedLines = contents.lines.sort();
  contents.options.includes("-r") && sortedLines.reverse();
  return sortedLines;
};

const loadContents = function(filePath, fsModule) {
  if (fsModule.exists(filePath)) {
    const contents = fsModule.reader(filePath, fsModule.encoding);
    const lines = contents.split("\n");
    return { lines: lines };
  }
  return { error: "No such a file or directory", sub: filePath };
};

const parseUserArgs = function(userArgs) {
  let parseUserArgs = { path: undefined, options: [] };
  userArgs.map(x => {
    x.match("-r") ? parseUserArgs.options.push(x) : (parseUserArgs.path = x);
  });
  return parseUserArgs;
};

const generateErrorMsg = function(error) {
  throw new Error(`${error.sub} : ${error.error}`);
};

module.exports = {
  sort,
  loadContents,
  parseUserArgs,
  generateErrorMsg
};
