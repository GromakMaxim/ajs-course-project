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
    return new Promise(((resolve) => {
      if (this.gameController.enemies.members.length === 0) {
        console.log('Player has won!');
        this.gameController.score += this.gameController.calculateScore();
        const isChanged = this.gameController.theme.next();
        if (!isChanged) {
          this.gameController.isBlocked = true;
        } else {
          const parameter = this.gameController.theme.pointer + 1;
          this.gameController.init(parameter);
        }
        resolve(true);
      }
      if (this.gameController.heroes.members.length === 0) {
        console.log('Computer has won!');
        this.gameController.isBlocked = true;
        resolve(true);
      }
      resolve(false);
    }));
  }
}
