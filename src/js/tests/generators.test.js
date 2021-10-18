import { characterGenerator, generateTeam } from '../generators.js';
import Bowman from '../characters/entity/Bowman';
import Swordsman from '../characters/entity/Swordsman';
import Magician from '../characters/entity/Magician';

test('expect randomly created character', () => {
  const testCase = [Swordsman, Bowman, Magician];
  const actual = characterGenerator(testCase, 5);

  expect(actual)
    .not
    .toBe(null);
});

test('expect error', () => {
  const testCase = [];
  expect(() => {
    characterGenerator(testCase, 5);
  })
    .toThrow(Error);
});

test('expect randomized team', () => {
  const team = generateTeam([Swordsman, Bowman, Magician], 5, 5, 64, 'player');
  expect(team)
    .not
    .toBe(null);
  expect(team.members.length !== 0)
    .toStrictEqual(true);
});
