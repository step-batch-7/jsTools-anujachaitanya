class StreamPicker {
  constructor(createReadStream, stdin) {
    this.createReadStream = createReadStream;
    this.stdin = stdin;
  }

  pickStream(path) {
    if (path) {
      return this.createReadStream(path);
    }
    return this.stdin;
  }
}

module.exports = StreamPicker;
