import PositionedCharacter from '../../characters/PositionedCharacter';
import Bowman from '../../characters/entity/Bowman';
import actions from '../../actions';
import Swordsman from '../../characters/entity/Swordsman';
import Magician from '../../characters/entity/Magician';
import FieldNavigation from '../../FieldNavigation';

const heroes = [
  new Swordsman(5, 'swordsman'), // 1
  new Bowman(5, 'bowman'), // 2
  new Magician(999, 'magician'), // 4
];

test('expect arr (start pos = 35; attack dist = 1)', () => {
  const character = heroes[0];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [26, 27, 28, 34, 36, 42, 43, 44];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 35; attack dist = 2)', () => {
  const character = heroes[1];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    17, 18, 19, 20, 21,
    25, 26, 27, 28, 29,
    33, 34, 36, 37,
    41, 42, 43, 44, 45,
    49, 50, 51, 52, 53,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 35; attack dist = 4)', () => {
  const character = heroes[2];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [];
  for (let i = 0; i < 64; i++) {
    if (i !== pos) expected.push(i);
  }
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 32; attack dist = 1)', () => {
  const character = heroes[0];
  const pos = 32;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [24, 25, 33, 40, 41];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 33; attack dist = 2)', () => {
  const character = heroes[1];
  const pos = 33;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    16, 17, 18, 19,
    24, 25, 26, 27,
    32, 34, 35,
    40, 41, 42, 43,
    48, 49, 50, 51,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 34; attack dist = 4)', () => {
  const character = heroes[2];
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    0, 1, 2, 3, 4, 5, 6,
    8, 9, 10, 11, 12, 13, 14,
    16, 17, 18, 19, 20, 21, 22,
    24, 25, 26, 27, 28, 29, 30,
    32, 33, 35, 36, 37, 38,
    40, 41, 42, 43, 44, 45, 46,
    48, 49, 50, 51, 52, 53, 54,
    56, 57, 58, 59, 60, 61, 62,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 39; attack dist = 1)', () => {
  const character = heroes[0];
  const pos = 39;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [30, 31, 38, 46, 47];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 39; attack dist = 2)', () => {
  const character = heroes[1];
  const pos = 39;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [21, 22, 23, 29, 30, 31, 37, 38, 45, 46, 47, 53, 54, 55];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 39; attack dist = 4)', () => {
  const character = heroes[2];
  const pos = 39;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    3, 4, 5, 6, 7,
    11, 12, 13, 14, 15,
    19, 20, 21, 22, 23,
    27, 28, 29, 30, 31,
    35, 36, 37, 38,
    43, 44, 45, 46, 47,
    51, 52, 53, 54, 55,
    59, 60, 61, 62, 63,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 0; attack dist = 1)', () => {
  const character = heroes[0];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [1, 8, 9];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 0; attack dist = 2)', () => {
  const character = heroes[1];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [1, 2, 8, 9, 10, 16, 17, 18];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 0; attack dist = 4)', () => {
  const character = heroes[2];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    1, 2, 3, 4,
    8, 9, 10, 11, 12,
    16, 17, 18, 19, 20,
    24, 25, 26, 27, 28,
    32, 33, 34, 35, 36,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 7; attack dist = 1)', () => {
  const character = heroes[0];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [6, 14, 15];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 7; attack dist = 2)', () => {
  const character = heroes[1];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [5, 6, 13, 14, 15, 21, 22, 23];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 7; attack dist = 4)', () => {
  const character = heroes[2];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    3, 4, 5, 6,
    11, 12, 13, 14, 15,
    19, 20, 21, 22, 23,
    27, 28, 29, 30, 31,
    35, 36, 37, 38, 39,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 56; attack dist = 1)', () => {
  const character = heroes[0];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [48, 49, 57];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 56; attack dist = 2)', () => {
  const character = heroes[1];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [40, 41, 42, 48, 49, 50, 57, 58];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 56; attack dist = 4)', () => {
  const character = heroes[2];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    24, 25, 26, 27, 28,
    32, 33, 34, 35, 36,
    40, 41, 42, 43, 44,
    48, 49, 50, 51, 52,
    57, 58, 59, 60,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 63; attack dist = 1)', () => {
  const character = heroes[0];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [54, 55, 62];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 63; attack dist = 2)', () => {
  const character = heroes[1];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [45, 46, 47, 53, 54, 55, 61, 62];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 63; attack dist = 4)', () => {
  const character = heroes[2];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.attack);
  const expected = [
    27, 28, 29, 30, 31,
    35, 36, 37, 38, 39,
    43, 44, 45, 46, 47,
    51, 52, 53, 54, 55,
    59, 60, 61, 62,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect error (position > field size && attack)', () => {
  const character = heroes[0];
  const pos = 100;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  expect(() => {
    battlefield.defineActionArea(testCase, 64, actions.attack);
  })
    .toThrow(Error);
});

test('expect error (position < 0)', () => {
  const character = heroes[0];
  const pos = -100;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  expect(() => {
    battlefield.defineActionArea(testCase, 64, actions.attack);
  })
    .toThrow(Error);
});
