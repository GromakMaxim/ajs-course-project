import GameController from '../service/GameController';
import Swordsman from '../characters/entity/Swordsman';
import PositionedCharacter from '../characters/PositionedCharacter';
import Team from '../characters/Team';
import GamePlay from '../service/GamePlay';

test('expect 250', () => {
  const p1 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 0);
  const p3 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 0);
  const p4 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 0);
  const p5 = new PositionedCharacter(new Swordsman(1, 'swordsman'), 0);
  const team = new Team([p1, p2, p3, p4, p5], 'player');
  const gc = new GameController(new GamePlay(), null);

  gc.heroes = team;
  const actual = gc.calculateScore();
  expect(actual)
    .toStrictEqual(250);
});
