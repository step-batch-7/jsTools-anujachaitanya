const { sortLines} = require('./sortLib');
const { readContent } = require('./streamReader');
const EMPTY_STRING = '';
const fileErrors = {
  ENOENT: 'No such file or directory',
  EISDIR: 'Is a directory',
  EACCES: 'Permission denied'
};

const sort = function (userOptions, streams, onSortCompletion) {
  if (userOptions.error) {
    onSortCompletion({ error: userOptions.error, contents: EMPTY_STRING });
    process.exitCode = 2;
    return;
  }
  const finishCallback = function ({ errorMsg, contents }) {
    if (errorMsg) {
      const error = `sort: ${fileErrors[errorMsg]}`;
      onSortCompletion({ error, contents: EMPTY_STRING });
      process.exitCode = 2;
      return;
    }
    const sortedLines = sortLines(userOptions.options, contents);
    onSortCompletion({ contents: sortedLines, error: EMPTY_STRING });
  };
  const readStream = userOptions.path ?
    () => streams.fileStream(userOptions.path) :
    () => streams.stdin;
  readContent(readStream(), finishCallback);
};

module.exports = { sort };
