const sort = function(lines) {
  return lines.sort();
};

const loadContents = function(filePath, reader, encoding) {
  try {
    console.log("in try");
    const contents = reader(filePath, encoding);
    return contents.split("\n");
  } catch (err) {
    console.log(err);
  }
};
module.exports = { sort, loadContents };
