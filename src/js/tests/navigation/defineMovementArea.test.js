// eslint-disable-next-line import/named
import PositionedCharacter from '../../characters/PositionedCharacter';
import Bowman from '../../characters/entity/Bowman';
import actions from '../../enums/actions';
import Swordsman from '../../characters/entity/Swordsman';
import Magician from '../../characters/entity/Magician';
import FieldNavigation from '../../service/FieldNavigation';

const heroes = [
  new Swordsman(5, 'swordsman'),
  new Bowman(5, 'bowman'),
  new Magician(999, 'magician'),
];

test('expect arr (start pos = 35; movement dist = 4)', async () => {
  const character = heroes[0];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [
    3, 7, 8, 11,
    14, 17, 19, 21,
    26, 27, 28, 32,
    33, 34, 36,
    37, 38, 39,
    42, 43, 44, 49,
    51, 53, 56, 59,
    62];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 35; movement dist = 2)', async () => {
  const character = heroes[1];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [17, 19, 21, 26, 27, 28, 33, 34, 36, 37, 42, 43, 44, 49, 51, 53];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 35; movement dist = 1)', async () => {
  const character = heroes[2];
  const pos = 35;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [26, 27, 28, 34, 36, 42, 43, 44];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 34; movement dist = 4)', async () => {
  const character = heroes[0];
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [
    2, 6, 10, 13, 16,
    18, 20, 25, 26, 27,
    32, 33, 35, 36,
    37, 38, 41, 42, 43,
    48, 50, 52, 58, 61,
  ];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 34; movement dist = 2)', async () => {
  const character = heroes[1];
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [
    16, 18, 20, 25, 26,
    27, 32, 33, 35,
    36, 41, 42, 43, 48,
    50, 52,
  ];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 34; movement dist = 1)', async () => {
  const character = heroes[2];
  const pos = 34;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [25, 26, 27, 33, 35, 41, 42, 43];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 38; movement dist = 4)', async () => {
  const character = heroes[0];
  const pos = 38;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [2, 6, 11, 14, 20, 22, 29, 30, 31, 34, 35, 36, 37, 39, 45, 46, 47, 52, 54, 59, 62];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 38; movement dist = 2)', async () => {
  const character = heroes[1];
  const pos = 38;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [20, 22, 29, 30, 31, 36, 37, 39, 45, 46, 47, 52, 54];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 38; movement dist = 1)', async () => {
  const character = heroes[2];
  const pos = 38;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [29, 30, 31, 37, 39, 45, 46, 47];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 0; movement dist = 4)', async () => {
  const character = heroes[0];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [1, 2, 3, 4, 8, 9, 16, 18, 24, 27, 32, 36];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 0; movement dist = 2)', async () => {
  const character = heroes[1];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [1, 2, 8, 9, 16, 18];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 0; movement dist = 1)', async () => {
  const character = heroes[2];
  const pos = 0;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [1, 8, 9];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 7; movement dist = 4)', async () => {
  const character = heroes[0];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [3, 4, 5, 6, 14, 15, 21, 23, 28, 31, 35, 39];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 7; movement dist = 2)', async () => {
  const character = heroes[1];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [5, 6, 14, 15, 21, 23];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 7; movement dist = 0)', async () => {
  const character = heroes[2];
  const pos = 7;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [6, 14, 15];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 56; movement dist = 4)', async () => {
  const character = heroes[0];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [24, 28, 32, 35, 40, 42, 48, 49, 57, 58, 59, 60];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 56; movement dist = 2)', async () => {
  const character = heroes[1];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [40, 42, 48, 49, 57, 58];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 56; movement dist = 1)', async () => {
  const character = heroes[2];
  const pos = 56;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [48, 49, 57];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 63; movement dist = 4)', async () => {
  const character = heroes[0];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [27, 31, 36, 39, 45, 47, 54, 55, 59, 60, 61, 62];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 63; movement dist = 2)', async () => {
  const character = heroes[1];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [45, 47, 54, 55, 61, 62];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect arr (start pos = 63; movement dist = 1)', async () => {
  const character = heroes[2];
  const pos = 63;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  const expected = [54, 55, 62];
  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .resolves
    .toStrictEqual(expected);
});

test('expect error (position > field size)', async () => {
  const character = heroes[0];
  const pos = 100;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .rejects
    .toThrow(Error);
});

test('expect error (position < 0)', async () => {
  const character = heroes[0];
  const pos = -100;
  const testCase = new PositionedCharacter(character, pos);
  const battlefield = new FieldNavigation(64);

  await expect(battlefield.defineActionArea(testCase, 64, actions.move))
    .rejects
    .toThrow(Error);
});
