// eslint-disable-next-line import/named
import { defineMovementArea } from '../../utils';
import PositionedCharacter from '../../PositionedCharacter';
import Bowman from '../../characters/Bowman';

test('expect arr (start pos = 35; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    17, 18, 19, 20, 21,
    25, 26, 27, 28, 29,
    33, 34, 35, 36, 37,
    41, 42, 43, 44, 45,
    49, 50, 51, 52, 53,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 34; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    16, 17, 18, 19, 20,
    24, 25, 26, 27, 28,
    32, 33, 34, 35, 36,
    40, 41, 42, 43, 44,
    48, 49, 50, 51, 52,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 35; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 36;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    18, 19, 20, 21, 22,
    26, 27, 28, 29, 30,
    34, 35, 36, 37, 38,
    42, 43, 44, 45, 46,
    50, 51, 52, 53, 54,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 27; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 27;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    9, 10, 11, 12, 13,
    17, 18, 19, 20, 21,
    25, 26, 27, 28, 29,
    33, 34, 35, 36, 37,
    41, 42, 43, 44, 45,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 19; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 19;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    1, 2, 3, 4, 5,
    9, 10, 11, 12, 13,
    17, 18, 19, 20, 21,
    25, 26, 27, 28, 29,
    33, 34, 35, 36, 37,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect short arr (start pos = 11; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 11;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    1, 2, 3, 4, 5,
    9, 10, 11, 12, 13,
    17, 18, 19, 20, 21,
    25, 26, 27, 28, 29,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect short arr (start pos = 3; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 3;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    1, 2, 3, 4, 5,
    9, 10, 11, 12, 13,
    17, 18, 19, 20, 21,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect arr (start pos = 43; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 43;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    25, 26, 27, 28, 29,
    33, 34, 35, 36, 37,
    41, 42, 43, 44, 45,
    49, 50, 51, 52, 53,
    57, 58, 59, 60, 61,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect short arr (start pos = 51; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 51;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    33, 34, 35, 36, 37,
    41, 42, 43, 44, 45,
    49, 50, 51, 52, 53,
    57, 58, 59, 60, 61,
  ];
  expect(actual)
    .toEqual(expected);
});

test('expect short arr (start pos = 59; movement dist = 4)', () => {
  const character = new Bowman(5, 'bowman');
  const pos = 59;
  const testCase = new PositionedCharacter(character, pos);

  const actual = defineMovementArea(testCase, 64);
  const expected = [
    41, 42, 43, 44, 45,
    49, 50, 51, 52, 53,
    57, 58, 59, 60, 61,
  ];
  expect(actual)
    .toEqual(expected);
});
