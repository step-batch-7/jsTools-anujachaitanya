const numericSort = function(lines) {
  const numericLines = lines.filter(line => {
    const firstField = line.split("")[0];
    return Number.isInteger(+firstField);
  });
  const nonNumericLines = lines.filter(line => !numericLines.includes(line));
  return nonNumericLines.concat(numericLines.sort((a, b) => a - b));
};

module.exports = { numericSort };
