import Bowman from '../../characters/Bowman';
import Swordsman from '../../characters/Swordsman';
import PositionedCharacter from '../../PositionedCharacter';
import { definePositionedCharacter } from '../../utils';

test('expect correct array with positioned characters', () => {
  const bow = new Bowman(5, 'bowman');
  const sword1 = new Swordsman(3, 'swordsman');
  const sword2 = new Swordsman(2, 'swordsman');

  const testCharacters = [bow, sword1, sword2];
  const testPositions = [0, 32, 57];

  const actual = definePositionedCharacter(testCharacters, testPositions);

  const expected = [
    new PositionedCharacter(bow, 0),
    new PositionedCharacter(sword1, 32),
    new PositionedCharacter(sword2, 57),
  ];

  expect(actual)
    .toStrictEqual(expected);
});

test('expect error', () => {
  const bow = new Bowman(5, 'bowman');
  const sword1 = new Swordsman(3, 'swordsman');
  const sword2 = new Swordsman(2, 'swordsman');

  const testCharacters = [bow, sword1, sword2];
  const testPositions = [0, 32];

  expect(() => {
    definePositionedCharacter(testCharacters, testPositions);
  })
    .toThrow(Error);
});

test('expect correct array (team members < positions)', () => {
  const bow = new Bowman(5, 'bowman');
  const sword1 = new Swordsman(3, 'swordsman');
  const sword2 = new Swordsman(2, 'swordsman');

  const testCharacters = [bow, sword1, sword2];
  const testPositions = [0, 32, 33, 40, 48];

  const actual = definePositionedCharacter(testCharacters, testPositions);

  const expected = [
    new PositionedCharacter(bow, 0),
    new PositionedCharacter(sword1, 32),
    new PositionedCharacter(sword2, 33),
  ];

  expect(actual)
    .toStrictEqual(expected);
});
