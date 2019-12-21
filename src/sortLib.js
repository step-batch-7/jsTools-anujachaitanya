const sort = function(lines) {
  return lines.sort();
};

const loadContents = function(filePath, reader, encoding) {
  const contents = reader(filePath, encoding);
  return contents.split("\n");
};
module.exports = { sort, loadContents };
