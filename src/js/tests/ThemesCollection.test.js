import ThemesCollection from '../service/ThemesCollection';

test('expect correct themes collection instance', () => {
  const tc = new ThemesCollection();
  expect(tc.themes)
    .toStrictEqual(['prairie', 'desert', 'arctic', 'mountain']);
  expect(tc.pointer)
    .toEqual(0);
  expect(tc.isCycle)
    .toEqual(false);
});

test('expect correctly set pointer', () => {
  const tc = new ThemesCollection();
  for (let i = 0; i < 4; i++) {
    tc.setPointer(i);
    expect(tc.pointer)
      .toEqual(i);
  }

  tc.setPointer(0);
  tc.setPointer(1000);
  expect(tc.pointer)
    .toEqual(0);
  tc.setPointer(-500);
  expect(tc.pointer)
    .toEqual(0);
});

test('expect correct pointer switching', () => {
  const tc = new ThemesCollection();
  for (let i = 0; i < 3; i++) {
    tc.next();
    expect(tc.pointer)
      .toEqual(i + 1);
  }
  expect(tc.pointer)
    .toEqual(3);
  tc.isCycle = true;
  tc.next();
  expect(tc.pointer)
    .toEqual(0);

  tc.isCycle = false;
  tc.setPointer(3);
  expect(tc.pointer)
    .toEqual(3);

  for (let i = 3; i > 1; i--) {
    tc.previous();
    expect(tc.pointer)
      .toEqual(i - 1);
  }
});

test('expect correctly returned theme title', () => {
  const tc = new ThemesCollection();
  let actual = tc.getThemeByIndex(0);
  const expected = 'prairie';
  expect(actual)
    .toStrictEqual(expected);
  actual = tc.getThemeByIndex(-50);
  expect(actual)
    .toStrictEqual(null);
  actual = tc.getThemeByIndex(500);
  expect(actual)
    .toStrictEqual(null);
});

test('expect current theme', () => {
  const tc = new ThemesCollection();
  expect(tc.pointer)
    .toEqual(0);
  let actual = tc.getCurrentTheme();
  let expected = 'prairie';
  expect(actual)
    .toStrictEqual(expected);

  tc.next();
  expect(tc.pointer)
    .toEqual(1);
  actual = tc.getCurrentTheme();
  expected = 'desert';
  expect(actual)
    .toStrictEqual(expected);
});

test('expect true', () => {
  const tc = new ThemesCollection();
  let actual = tc.next();
  expect(actual)
    .toStrictEqual(true);

  actual = tc.previous();
  expect(actual)
    .toStrictEqual(true);

  actual = tc.previous();
  expect(actual)
    .toStrictEqual(false);

  tc.setPointer(3);
  expect(tc.pointer)
    .toEqual(3);
  actual = tc.next();
  expect(actual)
    .toEqual(false);

  tc.isCycle = true;
  expect(tc.isCycle)
    .toStrictEqual(true);
  for (let i = 0; i < 100; i++) {
    actual = tc.next();
    expect(actual)
      .toStrictEqual(true);
  }

  for (let i = 0; i < 100; i++) {
    actual = tc.previous();
    expect(actual)
      .toStrictEqual(true);
  }
});
