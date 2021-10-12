import FieldNavigation from '../FieldNavigation';

export default class DefenceStrategy {
  constructor(gamePlay, gameController) {
    this.gamePlay = gamePlay;
    this.gameController = gameController;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
  }

  process() {
    console.log('Defence selected');
  }

}
