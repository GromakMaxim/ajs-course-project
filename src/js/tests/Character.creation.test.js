import Character from '../characters/Character.js';
import Magician from '../characters/entity/Magician';
import Bowman from '../characters/entity/Bowman';
import Swordsman from '../characters/entity/Swordsman';

test('expect exception. cant create new obj', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Character(10);
  })
    .toThrow(Error);
});

test('expect exception. cant create new obj', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Character(1);
  })
    .toThrow('Cant create instance of Character class. Character class is abstract!');
});

test('expect level 5', () => {
  const magician = new Magician(5, 'magician');
  expect(magician.level)
    .toBe(5);
});

test('expect defence 40', () => {
  const magician = new Magician(5, 'magician');
  expect(magician.defence)
    .toBe(40);
});

test('expect attack 10', () => {
  const magician = new Magician(5, 'magician');
  expect(magician.attack)
    .toBe(10);
});

test('expect error (cause lvl < 1)', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Magician(-50, 'magician');
  })
    .toThrow(Error);
});

test('expect error (cause lvl == 0 )', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Magician(0, 'magician');
  })
    .toThrow(Error);
});

test('expect health == 10', () => {
  const ch1 = new Magician(1, 'magician');
  ch1.setCurrentHealth(10); // 10/50
  const actual = ch1.currentHealth;
  const expected = 10;
  expect(actual)
    .toEqual(expected);
});

test('expect error (cause health < 0)', () => {
  const ch1 = new Magician(1, 'magician');
  expect(() => {
    ch1.setCurrentHealth(-10);
  })
    .toThrow(Error);
});

test('expect error (cause health < 0)', () => {
  const ch1 = new Magician(1, 'magician');
  expect(() => {
    ch1.setMaxHealth(-10);
  })
    .toThrow(Error);
});

test('expect health from 10 to 90', () => {
  const ch1 = new Magician(1, 'magician');
  ch1.setCurrentHealth(10); // 10/50
  ch1.increaseHealth();

  const actual = ch1.currentHealth;
  const expected = 90;

  expect(actual)
    .toEqual(expected);

  expect(ch1.maxHealth)
    .toEqual(90);
});

test('expect health from 80 to 100', () => {
  const ch1 = new Magician(1, 'magician'); // 80/80
  ch1.setMaxHealth(80);
  ch1.setCurrentHealth(80);
  ch1.increaseHealth();

  const actual = ch1.currentHealth;
  const expected = 100;

  expect(actual)
    .toEqual(expected);
});

test('increase attack from 10 to 13', () => {
  const ch1 = new Magician(1, 'magician'); // 40/50
  ch1.setCurrentHealth(40);
  ch1.increaseAttack();

  const actual = ch1.attack;
  const expected = 13;

  expect(actual)
    .toEqual(expected);
});

test('increase defence from 40 to 52', () => {
  const ch1 = new Magician(1, 'magician');
  ch1.setCurrentHealth(40);// 40/50
  ch1.increaseDefence();

  const actual = ch1.defence;
  const expected = 52;

  expect(actual)
    .toEqual(expected);
});

test('increase attack from 10 to 13 (character wasnt damaged)', () => {
  const ch1 = new Magician(1, 'magician');// 50/50
  ch1.increaseAttack();

  const actual = ch1.attack;
  const expected = 13;

  expect(actual)
    .toEqual(expected);
});

test('increase defence from 40 to 52 (character wasnt damaged)', () => {
  const ch1 = new Magician(1, 'magician'); // 50/50
  ch1.increaseDefence();

  const actual = ch1.defence;
  const expected = 52;

  expect(actual)
    .toEqual(expected);
});

test('attack wasnt increased (too heavy damage)', () => {
  const ch1 = new Magician(1, 'magician');
  ch1.setCurrentHealth(10); // 10/50
  ch1.increaseAttack();

  const actual = ch1.attack;
  const expected = 10;

  expect(actual)
    .toEqual(expected);
});

test('defence wasnt increased (too heavy damage)', () => {
  const ch1 = new Magician(1, 'magician');
  ch1.setCurrentHealth(10); // 10/50
  ch1.increaseDefence();

  const actual = ch1.defence;
  const expected = 40;

  expect(actual)
    .toEqual(expected);
});

test('expect lvlUp (increase all parameters, Magician)', () => {
  const ch1 = new Magician(1, 'magician'); // 50/50
  ch1.lvlUp();

  expect(ch1.maxHealth)
    .toEqual(100);
  expect(ch1.currentHealth)
    .toEqual(100);
  expect(ch1.attack)
    .toEqual(13);
  expect(ch1.defence)
    .toEqual(52);
});

test('expect lvlUp (increase all parameters, Magician)', () => {
  const ch1 = new Bowman(1, 'bowman'); // 50/50
  ch1.lvlUp();

  expect(ch1.maxHealth)
    .toEqual(100);
  expect(ch1.currentHealth)
    .toEqual(100);
  expect(ch1.attack)
    .toEqual(32.5);
  expect(ch1.defence)
    .toEqual(32.5);
});

test('expect lvlUp (increase all parameters, Magician)', () => {
  const ch1 = new Swordsman(1, 'swordsman'); // 50/50
  ch1.lvlUp();

  expect(ch1.maxHealth)
    .toEqual(100);
  expect(ch1.currentHealth)
    .toEqual(100);
  expect(ch1.attack)
    .toEqual(52);
  expect(ch1.defence)
    .toEqual(13);
});
