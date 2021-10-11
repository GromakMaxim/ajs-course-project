// eslint-disable-next-line import/named
import PositionedCharacter from '../../PositionedCharacter';
import Bowman from '../../characters/Bowman';
import actions from '../../actions';
import Swordsman from '../../characters/Swordsman';
import Magician from '../../characters/Magician';
import FieldNavigation from '../../FieldNavigation';

const heroes = [
  new Swordsman(5, 'swordsman'),
  new Bowman(5, 'bowman'),
  new Magician(999, 'magician'),
];

test('expect arr (start pos = 35; movement dist = 4)', () => {
  const character = heroes[0];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    3, 7, 8, 11,
    14, 17, 19, 21,
    26, 27, 28, 32,
    33, 34, 35, 36,
    37, 38, 39,
    42, 43, 44, 49,
    51, 53, 56, 59,
    62];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 35; movement dist = 2)', () => {
  const character = heroes[1];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [17, 19, 21, 26, 27, 28, 33, 34, 35, 36, 37, 42, 43, 44, 49, 51, 53];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 35; movement dist = 1)', () => {
  const character = heroes[2];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [26, 27, 28, 34, 35, 36, 42, 43, 44];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 34; movement dist = 4)', () => {
  const character = heroes[0];
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    2, 6, 10, 13, 16,
    18, 20, 25, 26, 27,
    32, 33, 34, 35, 36,
    37, 38, 41, 42, 43,
    48, 50, 52, 58, 61,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 34; movement dist = 2)', () => {
  const character = heroes[1];
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    16, 18, 20, 25, 26,
    27, 32, 33, 34, 35,
    36, 41, 42, 43, 48,
    50, 52,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 34; movement dist = 1)', () => {
  const character = heroes[2];
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    25, 26, 27,
    33, 34, 35,
    41, 42, 43,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 38; movement dist = 4)', () => {
  const character = heroes[0];
  const pos = 38;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    2, 6, 11, 14, 20, 22, 29, 30, 31, 34, 35, 36, 37, 38, 39, 45, 46, 47, 52, 54, 59, 62,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 38; movement dist = 2)', () => {
  const character = heroes[1];
  const pos = 38;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    20, 22, 29, 30, 31, 36, 37, 38, 39, 45, 46, 47, 52, 54,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 38; movement dist = 1)', () => {
  const character = heroes[2];
  const pos = 38;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    29, 30, 31, 37, 38, 39, 45, 46, 47,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 0; movement dist = 4)', () => {
  const character = heroes[0];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    0, 1, 2, 3, 4, 8, 9, 16, 18, 24, 27, 32, 36,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 0; movement dist = 2)', () => {
  const character = heroes[1];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    0, 1, 2, 8, 9, 16, 18,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 0; movement dist = 1)', () => {
  const character = heroes[2];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    0, 1, 8, 9,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 7; movement dist = 4)', () => {
  const character = heroes[0];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    3, 4, 5, 6, 7,
    14, 15, 21, 23, 28,
    31, 35, 39,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 7; movement dist = 2)', () => {
  const character = heroes[1];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    5, 6, 7, 14, 15, 21, 23,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 7; movement dist = 0)', () => {
  const character = heroes[2];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    6, 7, 14, 15,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 56; movement dist = 4)', () => {
  const character = heroes[0];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    24, 28, 32, 35, 40, 42, 48, 49, 56, 57, 58, 59, 60,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 56; movement dist = 2)', () => {
  const character = heroes[1];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    40, 42, 48, 49, 56, 57, 58,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 56; movement dist = 1)', () => {
  const character = heroes[2];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    48, 49, 56, 57,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 63; movement dist = 4)', () => {
  const character = heroes[0];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    27, 31, 36, 39, 45, 47, 54, 55, 59, 60, 61, 62, 63,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 63; movement dist = 2)', () => {
  const character = heroes[1];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    45, 47, 54, 55, 61, 62, 63,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 63; movement dist = 1)', () => {
  const character = heroes[2];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const actual = battlefield.defineActionArea(testCase, 64, actions.move);
  const expected = [
    54, 55, 62, 63,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect error (position > field size)', () => {
  const character = heroes[0];
  const pos = 100;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  expect(() => {
    battlefield.defineActionArea(testCase, 64, actions.move);
  })
    .toThrow(Error);
});

test('expect error (position < 0)', () => {
  const character = heroes[0];
  const pos = -100;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  expect(() => {
    battlefield.defineActionArea(testCase, 64, actions.move);
  })
    .toThrow(Error);
});
