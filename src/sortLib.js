const fileErrors = {
  ENOENT: 'No such file or directory',
  EISDIR: 'Is a directory',
  EACCES: 'Permission denied'
};  

const sortLines = function (options, lines) {
  let sortedLines = lines.split('\n').sort();
  options.includes('n') && (sortedLines = numericSort(sortedLines));
  options.includes('r') && sortedLines.reverse();
  return sortedLines.join('\n');
};

const numericSort = function (lines) {
  const numericLines = lines.filter(line => {
    const firstIndex = 0;
    const firstField = line.split('')[firstIndex];
    return Number.isInteger(+firstField);
  });
  const nonNumericLines = lines.filter(line => !numericLines.includes(line));
  const sortedNumberLines = numericLines.sort((no1, no2) => no1 - no2);
  return nonNumericLines.concat(sortedNumberLines);
};



const loadLines = function (options, inputStream, callBack) {
  inputStream.on('error', (error) => {
    const errorMsg = `sort: ${fileErrors[error.code]}`;
    process.exitCode = 2;
    callBack({ errorMsg });
  });
  let lines = '';
  inputStream.on('data', data => {
    lines = lines.concat(data);
  });

  inputStream.on('end', () => {
    const contents = sortLines(options, lines);
    callBack({ contents });
  });
};

module.exports = { numericSort, sortLines, loadLines };
