export default class DefenceStrategy {
  constructor(gamePlay, heroes, enemies) {
    this.gamePlay = gamePlay;
    this.heroes = heroes;
    this.enemies = enemies;
  }

  process() {
    console.log('Defence selected');
  }

}
