const fileErrors = {
  ENOENT: `No such file or directory`,
  EISDIR: `Is a directory`,
  EACCES: `Permission denied`
};

const sortLines = function(options, lines) {
  let sortedLines = lines.split("\n").sort();
  options.includes("n") && (sortedLines = numericSort(sortedLines));
  options.includes("r") && sortedLines.reverse();
  return sortedLines.join("\n");
};

const numericSort = function(lines) {
  const numericLines = lines.filter(line => {
    const firstField = line.split("")[0];
    return Number.isInteger(+firstField);
  });
  const nonNumericLines = lines.filter(line => !numericLines.includes(line));
  const sortedLines = nonNumericLines.concat(numericLines.sort((a, b) => a - b));
  return sortedLines;
};

const loadLines = function(options, inputStream, callBack) {
  let lines = "";

  inputStream.on("error", error => {
    const errorMsg = `sort: ${fileErrors[error.code]}`;
    process.exitCode = 2;
    callBack({ errorMsg });
  });

  inputStream.on("data", data => (lines = lines.concat(data)));

  inputStream.on("end", () => {
    const contents = sortLines(options, lines);
    callBack({ contents });
  });
};

module.exports = { numericSort, sortLines, loadLines };
