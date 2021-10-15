import Bowman from '../characters/entity/Bowman';
import Swordsman from '../characters/entity/Swordsman';
import PositionedCharacter from '../characters/PositionedCharacter';
import Team from '../characters/Team';

test('expect team length =3)', () => {
  const p1 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 1);
  const p3 = new PositionedCharacter(new Bowman(1, 'bowman'), 8);
  const testTeam = new Team([p1, p2], 'player');
  testTeam.addMember(p3);

  const actual = testTeam.members.length;
  const expected = 3;

  expect(actual)
    .toEqual(expected);
});

test('expect error (position is busy))', () => {
  const p1 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 1);
  const p3 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const testTeam = new Team([p1, p2], 'player');

  expect(() => {
    testTeam.addMember(p3);
  })
    .toThrow(Error);
});

test('expect team lvlup', () => {
  const p1 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 1);
  const p3 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const testTeam = new Team([p1, p2, p3], 'player');
  testTeam.lvlUp();
  expect(testTeam.members[0].character.level)
    .toEqual(2);
  expect(testTeam.members[1].character.level)
    .toEqual(2);
  expect(testTeam.members[2].character.level)
    .toEqual(2);
});

test('expect deleting a character', () => {
  const p1 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 3);
  const p3 = new PositionedCharacter(new Bowman(1, 'bowman'), 10);
  const testTeam = new Team([p1, p2, p3], 'player');
  testTeam.deleteMemberByPosition(3);
  expect(testTeam.members.length)
    .toEqual(2);
  testTeam.deleteMemberByPosition(10);
  expect(testTeam.members.length)
    .toEqual(1);
  testTeam.deleteMemberByPosition(0);
  expect(testTeam.members.length)
    .toEqual(0);
});

test('expect  character at pos 3', () => {
  const p1 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 3);
  const p3 = new PositionedCharacter(new Bowman(1, 'bowman'), 10);
  const testTeam = new Team([p1, p2, p3], 'player');
  const actual = testTeam.findMemberByPosition(3);
  expect(actual)
    .toStrictEqual(p2);
});

test('expect randomized lvlUp', () => {
  const p1 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 3);
  const p3 = new PositionedCharacter(new Bowman(1, 'bowman'), 10);
  const testTeam = new Team([p1, p2, p3], 'player');

  let passed = false;
  for (let i = 0; i < 100; i++) {
    testTeam.randomizedLvlUp(1, 10);
    const result = (testTeam.members.reduce((sum, member) => (sum + member.character.level), 0) / 3);
    if (result !== 1) {
      passed = true;
      break;
    }
  }
  expect(passed)
    .toEqual(true);
});

test('expect 150', () => {
  const p1 = new PositionedCharacter(new Bowman(1, 'bowman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 3);
  const p3 = new PositionedCharacter(new Bowman(1, 'bowman'), 10);
  const testTeam = new Team([p1, p2, p3], 'player');
  const actual = testTeam.countRemainingLives();
  expect(actual)
    .toStrictEqual(50 * 3);
});

test('expect 5000', () => {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(new PositionedCharacter(new Bowman(1, 'bowman'), 0));
  }
  const testTeam = new Team(arr, 'player');
  const actual = testTeam.countRemainingLives();
  expect(actual)
    .toStrictEqual(50 * 100);
});
