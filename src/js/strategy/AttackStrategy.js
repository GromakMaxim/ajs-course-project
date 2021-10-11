// units are trying to get closer and engage in close combat
import actions from '../actions';
import FieldNavigation from '../FieldNavigation';

export default class AttackStrategy {
  constructor(gamePlay, heroes, enemies, allChars) {
    this.gamePlay = gamePlay;
    this.heroes = heroes;
    this.enemies = enemies;
    this.allChars = allChars;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
  }

  // if smb in range - attack him
  process() {
    console.log('Attack selected');
    console.log(this.allChars);
    const heroPositions = this.heroes.getPositions();
    for (const enemyUnit of this.enemies.members) {
      // const movementArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.move);
      const attackArea = this.navigation.defineActionArea(enemyUnit, this.gamePlay.boardSize ** 2, actions.attack);
      const positionsToAttack = heroPositions.filter((item) => attackArea.includes(item));
      if (positionsToAttack.length !== 0) {
        const attacker = enemyUnit.character;
        const target = this.heroes.findMemberByPosition(positionsToAttack[0]).character;
        target.health -= Math.max(attacker.attack - target.defence, attacker.attack * 0.1);
        if (target.health <= 0) {
          this.heroes.deleteMemberByPosition(positionsToAttack[0]);
          this.allChars = this.heroes.members.concat(this.enemies.members);
          if (target === this.gamePlay.selectedCharacter.character){
            this.gamePlay.selectedCharacter = null;
          }
        }
        this.gamePlay.redrawPositions(this.allChars);
      }
    }
  }
}
