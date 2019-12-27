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

module.exports = { numericSort, sortLines };
