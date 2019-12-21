const sort = function(lines) {
  return lines.sort();
};

const loadContents = function(filePath, reader, encoding) {
  try {
    const contents = reader(filePath, encoding);
    return contents.split("\n");
  } catch (err) {
    console.log(err);
  }
};

const parseUserArgs = function(userArgs) {
  const filePath = userArgs[0];
  return filePath;
};
module.exports = { sort, loadContents, parseUserArgs };
