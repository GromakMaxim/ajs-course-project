import VictoryConditionsChecker from '../service/VictoryConditionsChecker';
import GameController from '../service/GameController';
import GamePlay from '../service/GamePlay';
import Swordsman from '../characters/entity/Swordsman';
import Team from '../characters/Team';
import Vampire from '../characters/entity/Vampire';

test('expect equal', () => {
  const vcc1 = new VictoryConditionsChecker();
  const vcc2 = new VictoryConditionsChecker();
  const actual = vcc1 === vcc2;
  expect(actual)
    .toStrictEqual(true);
  expect(vcc1)
    .toStrictEqual(vcc2);
});

test('testcase', () => {
  const vcc = new VictoryConditionsChecker();
  const gc = new GameController(new GamePlay(), null);
  vcc.setGameController(gc);
  expect(vcc.gameController)
    .toStrictEqual(gc);
});

test('expect false. game is in progress', () => {
  const p1 = new Swordsman(1, 'swordsman');
  const e1 = new Vampire(1, 'vampire');
  const teamHeroes = new Team([p1], 'player', 64);
  const teamEnemies = new Team([e1], 'enemy', 64);

  const vcc = new VictoryConditionsChecker();
  const gc = new GameController(new GamePlay(), null);
  gc.heroes = teamHeroes;
  gc.enemies = teamEnemies;
  vcc.setGameController(gc);

  const actual = vcc.checkWinningCondition();
  expect(actual)
    .toStrictEqual(false);
});

test('expect true. computer has won', () => {
  const p1 = new Swordsman(1, 'swordsman');
  const e1 = new Vampire(1, 'vampire');
  const teamHeroes = new Team([p1], 'player', 64);
  const pos = teamHeroes.getPositions()[0];
  teamHeroes.deleteMemberByPosition(pos);

  const teamEnemies = new Team([e1], 'enemy', 64);

  const vcc = new VictoryConditionsChecker();
  const gc = new GameController(new GamePlay(), null);
  gc.heroes = teamHeroes;
  gc.enemies = teamEnemies;
  vcc.setGameController(gc);

  const actual = vcc.checkWinningCondition();
  expect(actual)
    .toStrictEqual(true);
});
