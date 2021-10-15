import Swordsman from '../characters/entity/Swordsman';
import Hint from '../service/Hint';

test('expect correct hint', () => {
  const p1 = new Swordsman(1, 'swordsman');
  const hint = new Hint(p1);
  expect(hint.lvl)
    .toEqual(p1.level);
  expect(hint.attack)
    .toEqual(p1.attack);
  expect(hint.defence)
    .toEqual(p1.defence);
  expect(hint.currentHealth)
    .toEqual(p1.currentHealth);
  expect(hint.maxHealth)
    .toEqual(p1.maxHealth);
  expect(hint.pictures)
    .toStrictEqual(['🎖', '⚔', '🛡', '❤']);
});

test('expect correct msg', () => {
  const p1 = new Swordsman(1, 'swordsman');
  const hint = new Hint(p1);
  const testPics = ['🎖', '⚔', '🛡', '❤'];

  const actual = hint.getHint();
  const expected = `${testPics[0] + p1.level
  + testPics[1] + p1.attack
  + testPics[2] + p1.defence
  + testPics[3] + p1.currentHealth}/${p1.maxHealth}`;

  expect(actual)
    .toStrictEqual(expected);
});
