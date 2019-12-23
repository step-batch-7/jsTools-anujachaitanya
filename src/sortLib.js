const sort = function(lines) {
  return lines.sort();
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
  const filePath = userArgs[0];
  return filePath;
};

module.exports = { sort, loadContents, parseUserArgs };
