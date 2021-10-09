import { findFirstAndLastCellOfLine } from '../../utils';

test('expect 0 and 7(curPos = 2)', () => {
  const actual = findFirstAndLastCellOfLine(2, 64);
  const expected = [0, 7];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 0 and 7(curPos = 0)', () => {
  const actual = findFirstAndLastCellOfLine(0, 64);
  const expected = [0, 7];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 0 and 7(curPos = 7)', () => {
  const actual = findFirstAndLastCellOfLine(7, 64);
  const expected = [0, 7];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 8 and 15(curPos = 9)', () => {
  const actual = findFirstAndLastCellOfLine(9, 64);
  const expected = [8, 15];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 8 and 15(curPos = 8)', () => {
  const actual = findFirstAndLastCellOfLine(8, 64);
  const expected = [8, 15];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 8 and 15(curPos = 15)', () => {
  const actual = findFirstAndLastCellOfLine(15, 64);
  const expected = [8, 15];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 56 and 63(curPos = 60)', () => {
  const actual = findFirstAndLastCellOfLine(60, 64);
  const expected = [56, 63];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 56 and 63(curPos = 56)', () => {
  const actual = findFirstAndLastCellOfLine(56, 64);
  const expected = [56, 63];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect 56 and 63(curPos = 63)', () => {
  const actual = findFirstAndLastCellOfLine(63, 64);
  const expected = [56, 63];
  expect(actual)
    .toStrictEqual(expected);
});

