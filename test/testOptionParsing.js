const assert = require('chai').assert;
const { parseUserArgs, getInvalidOption } = require('../src/optionParsing');

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

});

describe('getInvalidOption', () => {
  it('should return invalid options', () => {
    assert.strictEqual(getInvalidOption(['x']), 'sort: invalid option -- x');
  });

  it('should return undefined for valid options', () => {
    assert.isUndefined(getInvalidOption(['r']));
  });

  it('should return invalid options if others are valid options', () => {
    const actual = getInvalidOption(['r', 'x']);
    assert.strictEqual(actual, 'sort: invalid option -- x');
  });

  it('should return undefined for options -n', () => {
    assert.isUndefined(getInvalidOption(['n']));
  });
});
