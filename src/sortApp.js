const EMPTY_STRING = '';
const { sortLines } = require('./sortLib');
const { readStream } = require('./streamReader');

class SortApp {
  constructor(optionParser, streamPicker) {
    this.optionParser = optionParser;
    this.streamPicker = streamPicker;
  }

  run(cmdLineArgs, onCompletion) {
    const userOptions = this.optionParser(cmdLineArgs);
    if (userOptions.error) {
      onCompletion({ error: userOptions.error, contents: '' });
      return;
    }
    const finishCallback = function({ errorMsg, contents }) {
      if (errorMsg) {
        onCompletion({ error: errorMsg, contents: EMPTY_STRING });
        process.exitCode = 2;
        return;
      }
      const sortedLines = sortLines(userOptions.options, contents);
      onCompletion({ contents: sortedLines, error: EMPTY_STRING });
    };
    const readableStream = this.streamPicker.pickStream(userOptions.path);
    readStream(readableStream, finishCallback);
  }
}

module.exports = SortApp;
