import NPCStrategy from '../../strategy/NPCStrategy';
import Swordsman from '../../characters/entity/Swordsman';
import Bowman from '../../characters/entity/Bowman';
import Magician from '../../characters/entity/Magician';
import Team from '../../Team';
import Vampire from '../../characters/entity/Vampire';
import Undead from '../../characters/entity/Undead';

test('expect 1', () => {
  const h1 = new Swordsman(5, 'swordsman');
  const h2 = new Bowman(5, 'bowman');
  const h3 = new Magician(5, 'magician');

  const e1 = new Vampire(5, 'vampire');
  const e2 = new Vampire(6, 'vampire');
  const e3 = new Vampire(1, 'vampire');

  const heroes = new Team([h1, h2, h3], 'player', 64);
  const enemies = new Team([e1, e2, e3], 'enemy', 64);

  const strategy = new NPCStrategy(null, heroes, enemies);
  expect(strategy.findShooters())
    .toEqual(1);
});

test('expect 0', () => {
  const h1 = new Swordsman(5, 'swordsman');
  const h2 = new Bowman(5, 'bowman');
  const h3 = new Magician(5, 'magician');

  const e1 = new Undead(5, 'undead');
  const e2 = new Vampire(6, 'vampire');
  const e3 = new Vampire(1, 'vampire');

  const heroes = new Team([h1, h2, h3], 'player', 64);
  const enemies = new Team([e1, e2, e3], 'enemy', 64);

  const strategy = new NPCStrategy(null, heroes, enemies);
  expect(strategy.findShooters())
    .toEqual(0);
});

test('expect -1', () => {
  const h1 = new Swordsman(5, 'swordsman');
  const h2 = new Bowman(5, 'bowman');
  const h3 = new Magician(5, 'magician');

  const e1 = new Undead(5, 'undead');
  const e2 = new Undead(6, 'undead');
  const e3 = new Vampire(1, 'vampire');

  const heroes = new Team([h1, h2, h3], 'player', 64);
  const enemies = new Team([e1, e2, e3], 'enemy', 64);

  const strategy = new NPCStrategy(null, heroes, enemies);
  expect(strategy.findShooters())
    .toEqual(-1);
});
