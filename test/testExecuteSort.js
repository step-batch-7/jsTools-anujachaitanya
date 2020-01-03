const sinon = require('sinon');
const assert = require('chai').assert;
const {sort} = require('../src/executeSort');

describe('sort', function () {
  it('should give error if options are invalid', () => {
    const displayResult = function ({error, contents}) {
      assert.strictEqual(contents, '');
      assert.strictEqual(error, 'sort: invalid option -- x');
    };
    sort({error: 'sort: invalid option -- x'}, {}, {}, displayResult);
  });

  it('should sort a given file and pass result to callBack', function () {
    const displayResult = sinon.fake();
    const inputStream = {};
    const createReadStream = () => inputStream;
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('data').yields('a\nc\nb');
    inputStream.on.withArgs('end').yields();
    sort({path: 'one.txt', options: []}, {}, createReadStream, displayResult);
    sinon.assert.called(inputStream.on);
    const expected = {error: '', contents: 'a\nb\nc'};
    assert.ok(displayResult.calledOnceWithExactly(expected));
  });

  it('should return error if error event is occurred', function () {
    const displayResult = sinon.fake();
    const inputStream = {};
    const createReadStream = () => inputStream;
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('error').yields({code: 'ENOENT'});
    sort({path: 'sample.txt'}, {}, createReadStream, displayResult);
    sinon.assert.called(inputStream.on);
    const expected = {error: 'sort: No such file or directory', contents: ''};
    assert.ok(displayResult.calledOnceWithExactly(expected));
  });

  it('should give error if file is not readable', function () {
    const displayResult = sinon.fake();
    const inputStream = {};
    const createReadStream = () => inputStream;
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('error').yields({code: 'EACCES'});
    sort({path: 'sample.txt'}, {}, createReadStream, displayResult);
    sinon.assert.called(inputStream.on);
    const expected = {error: 'sort: Permission denied', contents: ''};
    assert.ok(displayResult.calledOnceWithExactly(expected));
  });

  it('should give error if given path is directory', function () {
    const displayResult = sinon.fake();
    const inputStream = {};
    const createReadStream = () => inputStream;
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('error').yields({code: 'EISDIR'});
    sort({path: 'sample.txt'}, {}, createReadStream, displayResult);
    sinon.assert.called(inputStream.on);
    const expected = {error: 'sort: Is a directory', contents: ''};
    assert.ok(displayResult.calledOnceWithExactly(expected));
  });

  it('should sort stdin contents if path is not given', function () {
    const displayResult = sinon.fake();
    const inputStream = {};
    inputStream.on = sinon.stub();
    inputStream.on.withArgs('data').yields('a\nc\nb');
    inputStream.on.withArgs('end').yields();
    sort({options: []}, inputStream, {}, displayResult);
    sinon.assert.called(inputStream.on);
    const expected = {error: '', contents: 'a\nb\nc'};
    assert.ok(displayResult.calledOnceWithExactly(expected));
  });
});
