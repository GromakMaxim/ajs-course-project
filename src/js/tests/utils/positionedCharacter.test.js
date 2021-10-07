import Bowman from '../../characters/Bowman';
import Swordsman from '../../characters/Swordsman';
import { definePositionedCharacter, definePositionedTeams } from '../../utils';
import PositionedCharacter from '../../PositionedCharacter';
import Magician from '../../characters/Magician';
import Undead from '../../characters/Undead';
import Daemon from '../../characters/Daemon';
import Vampire from '../../characters/Vampire';

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

test('expect correct array', () => {
  const char1 = new Bowman(5, 'bowman');
  const char2 = new Magician(10, 'magician');
  const char3 = new Swordsman(3, 'swordsman');

  const enemy1 = new Undead(3, 'undead');
  const enemy2 = new Vampire(6, 'vampire');
  const enemy3 = new Daemon(7, 'daemon');

  const team1 = [char1, char2, char3];
  const team2 = [enemy1, enemy2, enemy3];
  const testBoardSize = 64;

  const actual = definePositionedTeams(team1, team2, testBoardSize);
  if (actual === null) throw new Error('test failed!');
});
