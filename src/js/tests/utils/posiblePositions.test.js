// eslint-disable-next-line import/named
import {
  defineEnemyPossiblePositions,
  definePlayerPossiblePositions,
  selectRndPositionFromArray,
} from '../../utils';

test('expect array with 2 left lines for field with 64cells', () => {
  const actual = definePlayerPossiblePositions(64);
  const expected = [
    0, 1,
    8, 9,
    16, 17,
    24, 25,
    32, 33,
    40, 41,
    48, 49,
    56, 57,
  ];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect array with 2 right lines for field with 64cells', () => {
  const actual = defineEnemyPossiblePositions(64);
  const expected = [
    6, 7,
    14, 15,
    22, 23,
    30, 31,
    38, 39,
    46, 47,
    54, 55,
    62, 63,
  ];
  expect(actual)
    .toStrictEqual(expected);
});

test('expect correct array', () => {
  const testArr = [
    0, 1,
    8, 9,
    16, 17,
    24, 25,
    32, 33,
    40, 41,
    48, 49,
    56, 57,
  ];
  const testSet = new Set(testArr);

  const actual = selectRndPositionFromArray(testArr, 5);

  for (const item of actual) {
    if (!testSet.has(item)) throw new Error(`test failed! value ${item}`);
  }
});
