import Character from '../Character.js';
import Magician from '../characters/Magician';

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
  const magician = new Magician(5, 'swordsman');
  expect(magician.defence)
    .toBe(40);
});

test('expect attack 10', () => {
  const magician = new Magician(5, 'swordsman');
  expect(magician.attack)
    .toBe(10);
});
