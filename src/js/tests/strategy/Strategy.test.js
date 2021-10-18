import PositionedCharacter from '../../characters/PositionedCharacter';
import Swordsman from '../../characters/entity/Swordsman';
import Team from '../../characters/Team';
import GameController from '../../service/GameController';
import DefenceStrategy from '../../strategy/DefenceStrategy';
import Bowman from '../../characters/entity/Bowman';
import characterType from '../../enums/characterTypes';
import GamePlay from '../../service/GamePlay';
import Vampire from '../../characters/entity/Vampire';
import Undead from '../../characters/entity/Undead';
import Magician from '../../characters/entity/Magician';

test('expect bowman', async () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 1);
  const heroesTeam = new Team([p1, p2], 'player');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;

  const ds = new DefenceStrategy(gp, gc);

  await expect(ds.findWeakestUnit([0, 1]))
    .resolves
    .toStrictEqual(p2);
});

test('expect vampire', async () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 1);
  const heroesTeam = new Team([p1, p2], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 3);
  const e2 = new PositionedCharacter(new Undead(1, characterType.undead), 63);
  const enemiesTeam = new Team([e1, e2], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new DefenceStrategy(gp, gc);

  const expected = [e1];
  await expect(ds.findUnitsCapableToAttack())
    .resolves
    .toStrictEqual(expected);
});

test('expect vampire vs bowman', () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 8);
  const p3 = new PositionedCharacter(new Magician(1, characterType.magician), 12);
  const heroesTeam = new Team([p1, p2, p3], 'player');

  const e1 = new PositionedCharacter(new Vampire(1, characterType.vampire), 9);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new DefenceStrategy(gp, gc);
  return ds.makeMaxDamage()
    .then((data) => {
      expect(data)
        .toStrictEqual([e1, p2]);
    });
});

test('expect undead vs swordsman', () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 8);
  const p3 = new PositionedCharacter(new Magician(1, characterType.magician), 12);
  const heroesTeam = new Team([p1, p2, p3], 'player');

  const e1 = new PositionedCharacter(new Undead(1, characterType.undead), 9);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new DefenceStrategy(gp, gc);
  return ds.makeMaxDamage()
    .then((data) => {
      expect(data)
        .toStrictEqual([e1, p2]);
    });
});

test('expect undead vs swordsman (cause its defence)', () => {
  const p1 = new PositionedCharacter(new Bowman(1, characterType.bowman), 0);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 8);
  const p3 = new PositionedCharacter(new Magician(1, characterType.magician), 12);
  const heroesTeam = new Team([p1, p2, p3], 'player');

  const e1 = new PositionedCharacter(new Undead(1, characterType.daemon), 9);

  const enemiesTeam = new Team([e1], 'enemy');
  const gp = new GamePlay();
  const gc = new GameController(gp, null);
  gp.boardSize = 64;
  gc.heroes = heroesTeam;
  gc.enemies = enemiesTeam;

  const ds = new DefenceStrategy(gp, gc);
  return ds.makeMaxDamage()
    .then((data) => {
      expect(data)
        .toStrictEqual([e1, p2]);
    });
});
