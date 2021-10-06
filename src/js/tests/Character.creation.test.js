import Character from '../Character.js';

test('expect exception. cant create new obj', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Character(10);
  }).toThrow(Error);
});

test('expect exception. cant create new obj', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Character(1);
  }).toThrow('Cant create instance of Character class. Character class is abstract!');
});
