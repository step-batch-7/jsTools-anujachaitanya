const StreamPicker = require('../src/streamPicker');
const assert = require('chai').assert;

describe('StreamPicker', () => {
  describe('pickStream', () => {
    it('should give stdin if path is not given', () => {
      const createReadStream = {};
      const stdin = {};
      const streamPicker = new StreamPicker(createReadStream, stdin);
      const readableStream = streamPicker.pickStream();
      assert.strictEqual(readableStream, stdin);
    });

    it('should create fileStream for given path if it is given', () => {
      const createReadStream = path => path;
      const stdin = {};
      const streamPicker = new StreamPicker(createReadStream, stdin);
      const readableStream = streamPicker.pickStream('sample.txt');
      assert.strictEqual(readableStream, 'sample.txt');
    });
  });
});
