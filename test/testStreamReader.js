const sinon = require('sinon');
const assert = require('chai').assert;
const { readContent } = require('../src/streamReader');

describe('readContent', () => {
  it('should return content given through readStream', (done) => {
    const onReadComplete = function ({ errorMsg, contents }) {
      assert.strictEqual(contents, 'a\nc\nb');
      assert.isUndefined(errorMsg);
      done();
    };
    const inputStream = {};
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('data').yields('a\nc\nb');
    inputStream.on.withArgs('end').yields();
    readContent(inputStream, onReadComplete);
    sinon.assert.called(inputStream.on);
  });

  it('should return content given through readStream', (done) => {
    const callback = function ({ errorMsg, contents }) {
      assert.strictEqual(errorMsg, 'ENOENT');
      assert.isUndefined(contents);
      done();
    };
    const inputStream = {};
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('error').yields({code: 'ENOENT'});
    readContent(inputStream, callback);
    sinon.assert.called(inputStream.on);
  });

  it('should return content given through stdin', (done) => {
    const callback = function ({ errorMsg, contents }) {
      assert.strictEqual(contents, 'a\nc\nb');
      assert.isUndefined(errorMsg);
      done();
    };
    const inputStream = {};
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('data').yields('a\nc\nb');
    inputStream.on.withArgs('end').yields();
    readContent(inputStream, callback);
    sinon.assert.called(inputStream.on);
  });
});
