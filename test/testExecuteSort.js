const assert = require('chai').assert;
const { EventEmitter } = require('events');
const { sort } = require('../src/executeSort');

describe('sort', function () {
  it('should give error if options are invalid', () => {
    const displayResult = function ({ error, contents }) {
      assert.strictEqual(contents, '');
      assert.strictEqual(error, 'sort: invalid option -- x');
    };
    sort(['sample.txt', '-x'], {}, displayResult);
  });

  it('should sort a given file and pass result to callBack', function () {
    const displayResult = function ({ error, contents }) {
      assert.strictEqual(contents, 'line1\nline2\nline3' );
      assert.strictEqual(error, '');
    };
    const inputStream = new EventEmitter();
    const createReadStream = function (path) {
      assert.strictEqual(path, 'sample.txt');
      return inputStream;
    };
    sort(['sample.txt'], createReadStream, displayResult);
    inputStream.emit('data', 'line1\nline2\nline3' );
    inputStream.emit('end');
  });

  it('should give error to callback if error event is occurred', function () {
    const displayResult = function ({ error, contents }) {
      assert.strictEqual(error, 'sort: No such file or directory');
      assert.strictEqual(contents, '');
    };

    const inputStream = new EventEmitter();
    const createReadStream = function (path) {
      assert.strictEqual(path, 'sample.txt');
      return inputStream;
    };
    sort(['sample.txt'], createReadStream, displayResult);
    inputStream.emit('error', { code: 'ENOENT' });
  });

  it('should give error if file is not readable', function () {
    const displayResult = function ({ error, contents }) {
      assert.strictEqual(error, 'sort: Permission denied');
      assert.strictEqual(contents, '');
    };

    const inputStream = new EventEmitter();
    const createReadStream = function (path) {
      assert.strictEqual(path, 'sample.txt');
      return inputStream;
    };
    sort(['sample.txt'], createReadStream, displayResult);
    inputStream.emit('error', { code: 'EACCES' });
  });

  it('should give error if given path is directory', function () {
    const displayResult = function ({ error, contents }) {
      assert.strictEqual(error, 'sort: Is a directory');
      assert.strictEqual(contents, '');
    };

    const inputStream = new EventEmitter();
    const createReadStream = function (path) {
      assert.strictEqual(path, 'sample.txt');
      return inputStream;
    };
    sort(['sample.txt'], createReadStream, displayResult);
    inputStream.emit('error', { code: 'EISDIR' });
  });

  it('if path is not given should sort the contents from stdin', function () {
    const displayResult = function ({ error, contents }) {
      assert.strictEqual(error, '');
      assert.strictEqual(contents, 'a\nb\nc');
    };
    const inputStream = new EventEmitter();
    sort([], inputStream, displayResult);
    inputStream.emit('data', 'a\n');
    inputStream.emit('data', 'c\n');
    inputStream.emit('data', 'b');
    inputStream.emit('end');
  });

});
