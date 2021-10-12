import { characterGenerator } from '../generators.js';
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
