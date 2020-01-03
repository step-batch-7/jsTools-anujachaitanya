const assert = require('chai').assert;
const {parseUserArgs} = require('../src/optionParsing');

describe('parseUserArgs', () => {
  it('should return path for given arguments', () => {
    const expected = {
      path: 'sample.txt',
      options: [],
      error: undefined
    };
    const actual = parseUserArgs(['sample.txt']);
    assert.deepStrictEqual(actual, expected);
  });

  it('should return path and options if options are there', () => {
    const expected = {
      path: 'sample.txt',
      options: [],
      error: undefined
    };
    const actual = parseUserArgs(['sample.txt']);
    assert.deepStrictEqual(actual, expected);
  });

  it('should parse the args for -n and -r both', () => {
    const expected = {
      path: 'sample.txt',
      options: ['r', 'n'],
      error: undefined
    };
    const actual = parseUserArgs(['-r', '-n', 'sample.txt']);
    assert.deepStrictEqual(actual, expected);
  });

  it('should give error for invalid option ', () => {
    const expected = {
      path: 'sample.txt',
      options: ['r', 'x'],
      error: 'sort: invalid option -- x'
    };
    const actual = parseUserArgs(['-r', '-x', 'sample.txt']);
    assert.deepStrictEqual(actual, expected);
  });

});
