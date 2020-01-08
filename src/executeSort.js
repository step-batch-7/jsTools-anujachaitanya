const { sortLines } = require('./sortLib');
const { readStream } = require('./streamReader');
const EMPTY_STRING = '';

const sort = function(userOptions, streamPicker, onSortCompletion) {
  if (userOptions.error) {
    onSortCompletion({ error: userOptions.error, contents: EMPTY_STRING });
    process.exitCode = 2;
    return;
  }

  const finishCallback = function({ errorMsg, contents }) {
    if (errorMsg) {
      onSortCompletion({ error: errorMsg, contents: EMPTY_STRING });
      process.exitCode = 2;
      return;
    }
    const sortedLines = sortLines(userOptions.options, contents);
    onSortCompletion({ contents: sortedLines, error: EMPTY_STRING });
  };

  const readableStream = streamPicker.pickStream(userOptions.path);
  readStream(readableStream, finishCallback);
};

module.exports = { sort };
