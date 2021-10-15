import GameController from '../service/GameController';
import GamePlay from '../service/GamePlay';
import GameState from '../service/GameState';

test('expect correct obj', () => {
  const gc = new GameController(new GamePlay(), null);
  const gs = new GameState(gc);

  expect(gs.enemyTeam)
    .toStrictEqual(gc.enemies);
  expect(gs.theme)
    .toStrictEqual(gc.theme.pointer);
  expect(gs.heroesTeam)
    .toStrictEqual(gc.heroes);
});
