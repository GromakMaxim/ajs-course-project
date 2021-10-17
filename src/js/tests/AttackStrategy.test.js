import Bowman from '../characters/entity/Bowman';
import PositionedCharacter from '../characters/PositionedCharacter';
import characterType from '../enums/characterTypes';
import Swordsman from '../characters/entity/Swordsman';
import Magician from '../characters/entity/Magician';
import Team from '../characters/Team';
import Vampire from '../characters/entity/Vampire';
import GamePlay from '../service/GamePlay';
import GameController from '../service/GameController';
import AttackStrategy from '../strategy/AttackStrategy';

test('expect closest magician', () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 8);
  const p3 = new PositionedCharacter(new Magician(1, characterType.magician), 12);
  const heroesTeam = new Team([p1, p2, p3], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 49);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new AttackStrategy(gp, gc);
  const actual = ds.findClosesShooter(e1);
  expect(actual)
    .toStrictEqual(p3);
});

test('expect closest magician2', () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Bowman(1, characterType.bowman), 8);
  const p3 = new PositionedCharacter(new Magician(1, characterType.magician), 12);
  const heroesTeam = new Team([p1, p2, p3], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 49);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new AttackStrategy(gp, gc);
  const actual = ds.findClosesShooter(e1);
  expect(actual)
    .toStrictEqual(p3);
});

test('expect closest bowman', () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Bowman(1, characterType.bowman), 8);
  const p3 = new PositionedCharacter(new Bowman(1, characterType.magician), 12);
  const heroesTeam = new Team([p1, p2, p3], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 49);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new AttackStrategy(gp, gc);
  const actual = ds.findClosesShooter(e1);
  expect(actual)
    .toStrictEqual(p3);
});

test('expect closest bowman (corner case)', () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Bowman(1, characterType.bowman), 63);
  const heroesTeam = new Team([p1, p2], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 56);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new AttackStrategy(gp, gc);
  const actual = ds.findClosesShooter(e1);
  expect(actual)
    .toStrictEqual(p2);
});
