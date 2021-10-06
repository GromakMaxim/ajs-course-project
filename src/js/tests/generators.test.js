import { characterGenerator } from '../generators.js';
import Bowman from '../characters/Bowman';
import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';

test('expect randomly created character', () => {
  const testCase = [Swordsman, Bowman, Magician];
  const actual = characterGenerator(testCase, 5);

  expect(actual).not.toBe(null);
});

test('expect error', () => {
  const testCase = [];
  const actual = characterGenerator(testCase, 5);
  expect(actual).toThrow(Error);
});
