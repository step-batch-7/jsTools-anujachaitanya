const assert = require('chai').assert;
const sinon = require('sinon');
const SortApp = require('../src/sortApp');
const StreamPicker = require('../src/streamPicker');
const { parseUserArgs } = require('../src/optionParsing');

describe('SortApp', () => {
  describe('run', () => {
    it('should give error if options are invalid', () => {
      const displayResult = function({ error, contents }) {
        assert.strictEqual(contents, '');
        assert.strictEqual(error, 'sort: invalid option -- x');
      };

      const sortApp = new SortApp(parseUserArgs, {});
      sortApp.run(['-x'], displayResult);
    });

    it('should sort a given file and pass result to callBack', function() {
      const displayResult = sinon.fake();
      const inputStream = {};
      const createReadStream = () => inputStream;
      inputStream.on = sinon.stub();
      inputStream.on.withArgs('data').yields('a\nc\nb');
      inputStream.on.withArgs('end').yields();
      const streamPicker = new StreamPicker(createReadStream, {});
      const sortApp = new SortApp(parseUserArgs, streamPicker);
      sortApp.run(['one.txt'], displayResult);
      sinon.assert.called(inputStream.on);
      const expected = { error: '', contents: 'a\nb\nc' };
      assert.ok(displayResult.calledOnceWithExactly(expected));
    });

    it('should return error if error event is occurred', function() {
      const displayResult = sinon.fake();
      const inputStream = {};
      const createReadStream = () => inputStream;
      inputStream.on = sinon.stub();
      inputStream.on.withArgs('error').yields({ code: 'ENOENT' });
      const streamPicker = new StreamPicker(createReadStream, {});
      const sortApp = new SortApp(parseUserArgs, streamPicker);
      sortApp.run(['sample.txt'], displayResult);
      sinon.assert.called(inputStream.on);
      const expected = {
        error: 'sort: No such file or directory',
        contents: ''
      };
      assert.ok(displayResult.calledOnceWithExactly(expected));
    });

    it('should give error if file is not readable', function() {
      const displayResult = sinon.fake();
      const inputStream = {};
      const createReadStream = () => inputStream;
      inputStream.on = sinon.stub();
      inputStream.on.withArgs('error').yields({
        code: 'EACCES'
      });
      const streamPicker = new StreamPicker(createReadStream, {});
      const sortApp = new SortApp(parseUserArgs, streamPicker);
      sortApp.run(['sample.txt'], displayResult);
      sinon.assert.called(inputStream.on);
      const expected = {
        error: 'sort: Permission denied',
        contents: ''
      };
      assert.ok(displayResult.calledOnceWithExactly(expected));
    });

    it('should give error if given path is directory', function() {
      const displayResult = sinon.fake();
      const inputStream = {};
      const createReadStream = () => inputStream;
      inputStream.on = sinon.stub();
      inputStream.on.withArgs('error').yields({
        code: 'EISDIR'
      });
      const streamPicker = new StreamPicker(createReadStream, {});
      const sortApp = new SortApp(parseUserArgs, streamPicker);
      sortApp.run(['sample.txt'], displayResult);
      sinon.assert.called(inputStream.on);
      const expected = {
        error: 'sort: Is a directory',
        contents: ''
      };
      assert.ok(displayResult.calledOnceWithExactly(expected));
    });

    it('should sort stdin contents if path is not given', function() {
      const displayResult = sinon.fake();
      const inputStream = {};
      inputStream.on = sinon.stub();
      inputStream.on.withArgs('data').yields('a\nc\nb');
      inputStream.on.withArgs('end').yields();
      const streamPicker = new StreamPicker({}, inputStream);
      const sortApp = new SortApp(parseUserArgs, streamPicker);
      sortApp.run([], displayResult);
      sinon.assert.called(inputStream.on);
      const expected = { error: '', contents: 'a\nb\nc' };
      assert.ok(displayResult.calledOnceWithExactly(expected));
    });
  });
});
