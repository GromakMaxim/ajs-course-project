export default class GameState {
  constructor(gameController) {
    this.theme = gameController.theme.pointer;
    this.enemyTeam = gameController.enemies;
    this.heroesTeam = gameController.heroes;
  }
}
