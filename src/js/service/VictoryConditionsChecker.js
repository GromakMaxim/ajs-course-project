export default class VictoryConditionsChecker {
  // i dont know best practice how to make singleton via JS, so I made this

  constructor() {
    if (typeof VictoryConditionsChecker.instance === 'object') {
      return VictoryConditionsChecker.instance;
    }
    VictoryConditionsChecker.instance = this;
    return VictoryConditionsChecker.instance;
  }

  setGameController(gameController) {
    this.gameController = gameController;
  }

  checkWinningCondition() {
    if (this.gameController.enemies.members.length === 0) {
      console.log('Player has won!');
      const isChanged = this.gameController.theme.next();
      if (!isChanged) {
        this.gameController.isBlocked = true;
      } else {
        this.gameController.heroes.lvlUp();
        this.gameController.init();
      }
    }

    if (this.gameController.heroes.members.length === 0) {
      console.log('Computer has won!');
      this.gameController.isBlocked = true;
    }
  }
}
