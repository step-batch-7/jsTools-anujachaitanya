const numericSort = function(lines) {
  const numericLines = lines.filter(line =>
    Number.isInteger(Math.floor(+line))
  );
  const nonNumericLines = lines.filter(
    line => !Number.isInteger(Math.floor(+line))
  );
  return nonNumericLines.concat(numericLines.sort((a, b) => a - b));
};

module.exports = { numericSort };
