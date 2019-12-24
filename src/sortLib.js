const { numericSort } = require("./sortTypes");

const sortByOptions = function(options, lines) {
  let sortedLines = lines;
  if (options.includes("-n")) sortedLines = numericSort(sortedLines);
  options.includes("-r") && sortedLines.reverse();
  return sortedLines;
};

const loadContents = function(filePath, fsModule) {
  if (fsModule.exists(filePath)) {
    const contents = fsModule.reader(filePath, fsModule.encoding);
    const lines = contents.split("\n");
    return { lines: lines };
  }
  return { error: "No such a file or directory", sub: "sort" };
};

const areOptionsValid = function(options) {
  const validOptions = ["-r", "-n"];
  options.forEach(x => {
    !validOptions.includes(x) &&
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
  throw new Error(`${error.sub}: ${error.error}`);
};

module.exports = {
<<<<<<< HEAD
  sortByOptions,
=======
  sort,
  loadContents,
>>>>>>> parent of fffe868... made async readFile and modified perform sort
  parseUserArgs,
  generateErrorMsg,
  areOptionsValid
};
