const sort = function(lines) {
  return lines.sort();
};

const loadContents = function(filePath, fsModule) {
  if (fsModule.exists(filePath)) {
    const contents = fsModule.reader(filePath, fsModule.encoding);
    return contents.split("\n");
  }
};

const parseUserArgs = function(userArgs) {
  const filePath = userArgs[0];
  return filePath;
};

module.exports = { sort, loadContents, parseUserArgs };
