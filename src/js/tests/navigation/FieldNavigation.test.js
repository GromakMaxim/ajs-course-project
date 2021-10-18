import FieldNavigation from '../../service/FieldNavigation';
import PositionedCharacter from '../../characters/PositionedCharacter';
import Swordsman from '../../characters/entity/Swordsman';
import characterType from '../../enums/characterTypes';
import Vampire from '../../characters/entity/Vampire';
import GameController from '../../service/GameController';
import GamePlay from '../../service/GamePlay';
import Team from '../../characters/Team';
import Undead from '../../characters/entity/Undead';

test('expect 0', () => {
  const battlefield = new FieldNavigation(64);
  const actual = battlefield.getValue();
  const expected = 0;
  expect(actual)
    .toEqual(expected);
});

test('expect 8', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.goDown();
  const actual = battlefield.getValue();
  const expected = 8;
  expect(actual)
    .toEqual(expected);
});

test('expect 16', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.goDown();
  battlefield.goDown();
  const actual = battlefield.getValue();
  const expected = 16;
  expect(actual)
    .toEqual(expected);
});

test('expect false', () => {
  const battlefield = new FieldNavigation(64);
  const expected = false;
  expect(battlefield.goUp())
    .toEqual(expected);
});

test('expect 9', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.goDown();
  battlefield.goRight();
  const actual = battlefield.getValue();
  const expected = 9;
  expect(actual)
    .toEqual(expected);
});

test('expect false', () => {
  const battlefield = new FieldNavigation(64);
  expect(battlefield.goUpLeft())
    .toEqual(false);
});

test('expect 28', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.setPointerByArrayArgs([4, 3]);
  battlefield.goUpRight();
  expect(battlefield.getValue())
    .toEqual(28);
});

test('expect false', () => {
  const battlefield = new FieldNavigation(64);
  expect(battlefield.goUpRight())
    .toEqual(false);
});

test('expect 9', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.goDownRight();
  const actual = battlefield.getValue();
  expect(actual)
    .toEqual(9);
});

test('expect [0,0] index=0', () => {
  const battlefield = new FieldNavigation(64);
  const actual = battlefield.getCoordinates(0);
  expect(actual)
    .toEqual([0, 0]);
});

test('expect [0,1] index=1', () => {
  const battlefield = new FieldNavigation(64);
  const actual = battlefield.getCoordinates(1);
  expect(actual)
    .toEqual([0, 1]);
});

test('expect [1,0] index=8', () => {
  const battlefield = new FieldNavigation(64);
  const actual = battlefield.getCoordinates(8);
  expect(actual)
    .toEqual([1, 0]);
});

test('expect [7,7] index=63', () => {
  const battlefield = new FieldNavigation(64);
  const actual = battlefield.getCoordinates(63);
  expect(actual)
    .toEqual([7, 7]);
});

test('expect null index=105', () => {
  const battlefield = new FieldNavigation(64);
  const actual = battlefield.getCoordinates(105);
  expect(actual)
    .toEqual(null);
});

test('expect [3,7]', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.setPointerByArrayArgs([3, 7]);
  expect([battlefield.row, battlefield.column])
    .toEqual([3, 7]);
});

test('expect [0,0] (err in coords, not able to set pointer)', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.setPointerByArrayArgs([3, 8]);
  expect([battlefield.row, battlefield.column])
    .toEqual([0, 0]);
});

test('expect [3,5]', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.setPointer(3, 5);
  expect([battlefield.row, battlefield.column])
    .toEqual([3, 5]);
});

test('expect [0,0] (err in coords, not able to set pointer)', () => {
  const battlefield = new FieldNavigation(64);
  battlefield.setPointer(3, 8);
  expect([battlefield.row, battlefield.column])
    .toEqual([0, 0]);
});

test('expect correct distance', () => {
  const battlefield = new FieldNavigation(64);
  let actual;
  // zero
  for (let i = 0; i < 8; i++) {
    actual = battlefield.findDistanceBetween(i, i);
    expect(actual)
      .toEqual(0);
  }

  // 1row
  for (let i = 0; i < 8; i++) {
    actual = battlefield.findDistanceBetween(0, i);
    expect(actual)
      .toEqual(i);
  }

  // 1 column
  for (let i = 0; i < 8; i++) {
    actual = battlefield.findDistanceBetween(i, 0);
    expect(actual)
      .toEqual(i);
  }

  expect(battlefield.findDistanceBetween(18, 45))
    .toStrictEqual(6);

  expect(battlefield.findDistanceBetween(45, 18))
    .toStrictEqual(6);

  expect(battlefield.findDistanceBetween(56, 5))
    .toStrictEqual(12);
  expect(battlefield.findDistanceBetween(5, 56))
    .toStrictEqual(12);

  expect(battlefield.findDistanceBetween(32, 39))
    .toStrictEqual(7);

  expect(battlefield.findDistanceBetween(39, 32))
    .toStrictEqual(7);

  expect(battlefield.findDistanceBetween(4, 60))
    .toStrictEqual(7);

  expect(battlefield.findDistanceBetween(60, 4))
    .toStrictEqual(7);
});

test('expect closest position =36(diagonal)', async () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 0);
  const teamH = new Team([p1], 'player');

  const e1 = new PositionedCharacter(new Undead(1, characterType.undead), 63);
  const teamE = new Team([e1], 'enemy');
  const gc = new GameController(new GamePlay(), null);
  gc.heroes = teamH;
  gc.enemies = teamE;
  gc.allChars = gc.heroes.members.concat(gc.enemies.members);
  const expected = 36;
  await expect(gc.navigation.findNearestPositionToTarget(p1, e1, gc))
    .resolves
    .toStrictEqual(expected);
});

test('expect closest position =39(vertical)', async () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 7);
  const teamH = new Team([p1], 'player');

  const e1 = new PositionedCharacter(new Undead(1, characterType.undead), 63);
  const teamE = new Team([e1], 'enemy');
  const gc = new GameController(new GamePlay(), null);
  gc.heroes = teamH;
  gc.enemies = teamE;
  gc.allChars = gc.heroes.members.concat(gc.enemies.members);

  const expected = 39;
  await expect(gc.navigation.findNearestPositionToTarget(p1, e1, gc))
    .resolves
    .toStrictEqual(expected);
});

test('expect closest position =60(horizontal)', async () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 56);
  const teamH = new Team([p1], 'player');

  const e1 = new PositionedCharacter(new Undead(1, characterType.undead), 63);
  const teamE = new Team([e1], 'enemy');
  const gc = new GameController(new GamePlay(), null);
  gc.heroes = teamH;
  gc.enemies = teamE;
  gc.allChars = gc.heroes.members.concat(gc.enemies.members);
  const expected = 60;
  await expect(gc.navigation.findNearestPositionToTarget(p1, e1, gc))
    .resolves
    .toStrictEqual(expected);
});

test('expect closest position =62(intersect)', async () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 59);
  const teamH = new Team([p1], 'player');

  const e1 = new PositionedCharacter(new Undead(1, characterType.undead), 63);
  const teamE = new Team([e1], 'enemy');
  const gc = new GameController(new GamePlay(), null);
  gc.heroes = teamH;
  gc.enemies = teamE;
  gc.allChars = gc.heroes.members.concat(gc.enemies.members);
  const expected = 62;
  await expect(gc.navigation.findNearestPositionToTarget(p1, e1, gc))
    .resolves
    .toStrictEqual(expected);
});

test('expect closest position =27(intersect)', async () => {
  const battlefield = new FieldNavigation(64);
  const attacker = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 27);
  const target = new PositionedCharacter(new Vampire(1, characterType.vampire), 28);
  const expected = 27;
  await expect(battlefield.findNearestPositionToTarget(attacker, target))
    .resolves
    .toStrictEqual(expected);
});

test('expect closest position =59', async () => {
  const p1 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 63);
  const p2 = new PositionedCharacter(new Swordsman(1, characterType.swordsman), 60);
  const teamH = new Team([p1, p2], 'player');

  const e1 = new PositionedCharacter(new Undead(1, characterType.undead), 56);
  const teamE = new Team([e1], 'enemy');
  const gc = new GameController(new GamePlay(), null);
  gc.heroes = teamH;
  gc.enemies = teamE;
  gc.allChars = gc.heroes.members.concat(gc.enemies.members);
  const expected = 59;
  await expect(gc.navigation.findNearestPositionToTarget(e1, p1, gc))
    .resolves
    .toStrictEqual(expected);
});
