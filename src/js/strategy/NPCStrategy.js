import AttackStrategy from './AttackStrategy.js';
import DefenceStrategy from './DefenceStrategy';

export default class NPCStrategy {
  constructor(gamePlay, heroesTeam, enemiesTeam, allChars) {
    this.gamePlay = gamePlay;
    this.heroes = heroesTeam;
    this.enemies = enemiesTeam;
    this.allChars = allChars;
  }

  analyze() {
    const result = this.findShooters();

    switch (result) {
      case -1:
      case 0:
        new AttackStrategy(this.gamePlay, this.heroes, this.enemies, this.allChars)
          .process();
        break;

      case 1:
        new DefenceStrategy(this.gamePlay, this.heroes, this.enemies, this.allChars)
          .process();
        break;

      default:
    }
  }

  findShooters() {
    const npcShooters = this.enemies.members
      .filter((item) => item.character.type === 'vampire' || item.character.type === 'daemon')
      .length;
    const playerShooters = this.heroes.members
      .filter((item) => item.character.type === 'magician' || item.character.type === 'bowman')
      .length;

    if (npcShooters > playerShooters) return 1;
    if (playerShooters === npcShooters) return 0;
    return -1;
  }
}
