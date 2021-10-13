// units are trying to get closer and engage in close combat
import actions from '../actions';
import FieldNavigation from '../FieldNavigation';
import VictoryConditionsChecker from '../VictoryConditionsChecker';

export default class AttackStrategy {
  constructor(gamePlay, gameController) {
    this.gamePlay = gamePlay;
    this.gameController = gameController;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
  }

  // if smb in range - attack him
  process() {
    console.log('Attack selected');
    const heroPositions = this.gameController.heroes.getPositions();
    for (const enemyUnit of this.gameController.enemies.members) {
      // const movementArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.move);
      const attackArea = this.navigation.defineActionArea(enemyUnit, this.gamePlay.boardSize ** 2, actions.attack);
      const positionsToAttack = heroPositions.filter((item) => attackArea.includes(item));
      if (positionsToAttack.length !== 0) {
        const attacker = enemyUnit.character;
        const target = this.gameController.heroes.findMemberByPosition(positionsToAttack[0]).character;
        const damage = Math.max(attacker.attack - target.defence, attacker.attack * 0.1);
        target.health -= damage;
        this.gamePlay.showDamage(positionsToAttack[0], damage)
          .then(() => {
            console.log(`Компьютер нанёс урон персонажу ${target.type}: ${damage}`);
            if (target.health <= 0) {
              this.gameController.heroes.deleteMemberByPosition(positionsToAttack[0]);
              this.gameController.allChars = this.gameController.heroes.members.concat(this.gameController.enemies.members);
              new VictoryConditionsChecker().checkWinningCondition();
              if (target === this.gamePlay.selectedCharacter.character) {
                this.gamePlay.selectedCharacter = null;
              }
            }
            this.gameController.refresh();
            this.gameController.VCChecker.checkWinningCondition();
          });
        break;
      }
    }
    console.log('Ход игрока...');
  }
}
