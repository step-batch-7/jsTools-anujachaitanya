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

const areOptionsValid = function(options) {
  const regex = /-r/g;
  options.forEach(x => {
    !x.match(regex) &&
      generateErrorMsg({ error: "invalid options", sub: `option ${x}` });
  });
  return true;
};

const parseUserArgs = function(userArgs) {
  let parseUserArgs = { path: undefined, options: [] };
  userArgs.map(x => {
    let option = x.split("");
    option[0] == "-" ? parseUserArgs.options.push(x) : (parseUserArgs.path = x);
  });
  areOptionsValid(parseUserArgs.options);
  return parseUserArgs;
};

const generateErrorMsg = function(error) {
  throw new Error(`${error.sub} : ${error.error}`);
};

module.exports = {
  sort,
  loadContents,
  parseUserArgs,
  generateErrorMsg,
  areOptionsValid
};
