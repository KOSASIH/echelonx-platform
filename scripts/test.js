const { test, expect } = require('@jest/globals');
const { add } = require('../src/math');

test('adds numbers', () => {
  expect(add(1, 2)).toEqual(3);
  expect(add(2, 2)).toEqual(4);
});

test('throws error when given non-numbers', () => {
  expect(() => add('a', 'b')).toThrow('Both arguments must be numbers');
});
