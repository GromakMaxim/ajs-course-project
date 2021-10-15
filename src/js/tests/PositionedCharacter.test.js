import Swordsman from '../characters/entity/Swordsman';
import PositionedCharacter from '../characters/PositionedCharacter';

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
