import { calcHealthLevel } from '../../utils';

test('expect critical', () => {
  for (let i = 0; i < 15; i++) {
    const actual = calcHealthLevel(i);
    const expected = 'critical';
    expect(actual)
      .toBe(expected);
  }
});

test('expect normal', () => {
  for (let i = 15; i < 50; i++) {
    const actual = calcHealthLevel(i);
    const expected = 'normal';
    expect(actual)
      .toBe(expected);
  }
});

test('expect high', () => {
  for (let i = 50; i < 100; i++) {
    const actual = calcHealthLevel(i);
    const expected = 'high';
    expect(actual)
      .toBe(expected);
  }
});
