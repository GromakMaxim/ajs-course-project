import AttackStrategy from './AttackStrategy';
import DefenceStrategy from './DefenceStrategy';
import characterType from '../enums/characterTypes';

export default class StrategyAnalyzer {
  constructor(gamePlay, gameController) {
    this.gamePlay = gamePlay;
    this.gameController = gameController;
  }

  analyze() {
    console.log('Ход компьютера... ');
    const result = this.findShooters();

    switch (result) {
      case -1:
      case 0:
        new AttackStrategy(this.gamePlay, this.gameController)
          .process();
        break;

      case 1:
        new DefenceStrategy(this.gamePlay, this.gameController)
          .process();
        break;

      default:
    }
  }

  findShooters() {
    const npcShooters = this.gameController.enemies.members
      .filter((item) => item.character.type === characterType.vampire || item.character.type === characterType.daemon)
      .length;
    const playerShooters = this.gameController.heroes.members
      .filter((item) => item.character.type === characterType.bowman || item.character.type === characterType.magician)
      .length;

    if (npcShooters > playerShooters) return 1;
    if (playerShooters === npcShooters) return 0;
    return -1;
  }
}
