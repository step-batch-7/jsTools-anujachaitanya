const sortLines = function (options, lines) {
  let sortedLines = lines.split('\n').sort();
  options.includes('n') && (sortedLines = numericSort(sortedLines));
  options.includes('r') && sortedLines.reverse();
  return sortedLines.join('\n');
};

const numericSort = function (lines) {
  const numericLines = lines.filter(line => {
    const [firstField] = line.split('');
    return Number.isInteger(+firstField);
  });
  const nonNumericLines = lines.filter(line => !numericLines.includes(line));
  const sortedNumberLines = numericLines.sort((no1, no2) => no1 - no2);
  return nonNumericLines.concat(sortedNumberLines);
};

module.exports = {numericSort, sortLines};
