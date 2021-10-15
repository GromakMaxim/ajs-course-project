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
