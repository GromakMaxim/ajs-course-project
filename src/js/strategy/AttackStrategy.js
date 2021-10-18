// units are trying to get closer and engage in close combat
import actions from '../enums/actions';
import Strategy from './Strategy';

export default class AttackStrategy extends Strategy {
  // if smb in range - attack him
  process() {
    console.log('Attack selected');
    const heroPositions = this.gameController.heroes.getPositions();
    for (const enemyUnit of this.gameController.enemies.members) {
      const attackArea = this.navigation.defineActionArea(enemyUnit, this.gamePlay.boardSize ** 2, actions.attack);
      const positionsToAttack = heroPositions.filter((item) => attackArea.includes(item));
      if (positionsToAttack.length !== 0) {
        const target = this.gameController.heroes.members.find((item) => item.position === positionsToAttack[0]);
        enemyUnit.character.makeDamage(target, this.gamePlay, this.gameController);
        break;
      }
    }
    console.log('Ход игрока...');
  }
}
