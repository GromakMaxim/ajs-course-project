import Swordsman from '../characters/entity/Swordsman';
import PositionedCharacter from '../characters/PositionedCharacter';
import characterType from '../enums/characterTypes';
import Team from '../characters/Team';
import Vampire from '../characters/entity/Vampire';
import GamePlay from '../service/GamePlay';
import GameController from '../service/GameController';
import Magician from '../characters/entity/Magician';
import Bowman from '../characters/entity/Bowman';

test('expect positioned character', () => {
  const p1 = new Swordsman(1, 'swordsman');
  const posCh = new PositionedCharacter(p1, 1);

  expect(posCh.position)
    .toEqual(1);
  expect(posCh.character.level)
    .toEqual(1);
  expect(posCh.character.type)
    .toEqual('swordsman');
});

test('expect error', () => {
  const p1 = {
    position: 1,
    character: {
      level: 1,
      attack: 10,
      defence: 30,
      currentHealth: 50,
      maxHealth: 50,
    },
  };
  expect(() => new PositionedCharacter(p1, 1))
    .toThrow('character must be instance of Character or its children');
  expect(() => new PositionedCharacter(new Swordsman(1, 'swordsman'), '1'))
    .toThrow('position must be a number');
});

test('expect 58', async () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 63);
  const heroesTeam = new Team([p1, p2], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 56);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  await e1.moveToTarget(p2, gc);
  const actual = e1.position;
  expect(actual)
    .toEqual(58);
});

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

  const actual = e1.findClosestShooter(gc);
  expect(actual)
    .toStrictEqual(p3);
});

test('expect closest bow', () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Bowman(1, characterType.bowman), 8);
  const p3 = new PositionedCharacter(new Magician(1, characterType.magician), 12);
  const heroesTeam = new Team([p1, p2, p3], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 50);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const actual = e1.findClosestShooter(gc);
  expect(actual)
    .toStrictEqual(p2);
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
  const actual = e1.findClosestShooter(gc);
  expect(actual)
    .toStrictEqual(p1);
});

test('expect null (no shooters in team)', () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 63);
  const heroesTeam = new Team([p1, p2], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 56);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const actual = e1.findClosestShooter(gc);
  expect(actual)
    .toStrictEqual(null);
});

test('expect null (no shooters in team)', () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 63);
  const heroesTeam = new Team([p1, p2], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 56);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const actual = e1.findClosestShooter(gc);
  expect(actual)
    .toStrictEqual(null);
});

test('expect char no1', () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 2);
  const p3 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 4);
  const p4 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 6);

  const heroesTeam = new Team([p1, p2, p3, p4], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 56);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const actual = e1.findClosestEnemy(gc);
  expect(actual)
    .toStrictEqual(p1);
});

test('expect char no4', () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 2);
  const p3 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 4);
  const p4 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 6);

  const heroesTeam = new Team([p1, p2, p3, p4], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 63);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const actual = e1.findClosestEnemy(gc);
  expect(actual)
    .toStrictEqual(p4);
});
