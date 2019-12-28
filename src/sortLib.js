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
  return nonNumericLines.concat(numericLines.sort((a, b) => a - b));
};

const loadLines = function(options, inputStream, finishCallback) {
  let lines = "";

  inputStream.on("error", error => {
    const errorMsg = `sort: ${fileErrors[error.code]}`;
    process.exitCode = 2;
    finishCallback({ errorMsg });
  });

  inputStream.on("data", data => (lines += data));

  inputStream.on("end", () => {
    const contents = sortLines(options, lines);
    finishCallback({ contents });
  });
};

module.exports = { numericSort, sortLines, loadLines };
