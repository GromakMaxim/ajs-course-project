import FieldNavigation from '../service/FieldNavigation';
import actions from '../enums/actions';

export default class Strategy {
  constructor(gamePlay, gameController) {
    if (new.target === Strategy) {
      throw new Error('Cant create instance of Strategy class. Character class is abstract!');
    }
    this.gamePlay = gamePlay;
    this.gameController = gameController;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
  }

  findUnitsCapableToAttack() {
    const resultArr = [];
    for (const enemyUnit of this.gameController.enemies.members) {
      const attackArea = this.navigation.defineActionArea(enemyUnit, this.gamePlay.boardSize ** 2, actions.attack);
      const possibleTargets = this.gameController.heroes.getPositions()
        .filter((item) => attackArea.includes(item));
      if (possibleTargets.length !== 0) resultArr.push(enemyUnit);
    }
    return resultArr;
  }

  findWeakestUnit(possibleTargets) {
    let weakest = null;
    let tempDefence = 99999999;
    for (const possibleTarget of possibleTargets) {
      const unit = this.gameController.heroes.findMemberByPosition(possibleTarget);
      if (unit.character.defence < tempDefence) {
        tempDefence = unit.character.defence;
        weakest = unit;
      }
    }
    if (weakest !== null) {
      return weakest;
    }
    return null;
  }

  makeMaxDamage() {
    return new Promise(((resolve) => {
      const resultArr = []; // attacker - target
      const heroPositions = this.gameController.heroes.getPositions();
      const attackers = this.findUnitsCapableToAttack();

      let mostDangerousAttacker;
      let maxDamage = 0;
      let weakestTarget;
      for (const enemyUnit of attackers) {
        const attackArea = this.navigation.defineActionArea(enemyUnit, this.gamePlay.boardSize ** 2, actions.attack);
        const possibleTargets = heroPositions.filter((item) => attackArea.includes(item));
        const target = this.findWeakestUnit(possibleTargets);
        const possibleDamage = Math.max(enemyUnit.character.attack - target.character.defence, enemyUnit.character.attack * 0.1);
        if (possibleDamage >= maxDamage) {
          maxDamage = possibleDamage;
          mostDangerousAttacker = enemyUnit;
          weakestTarget = target;
        }
      }

      resultArr.push(mostDangerousAttacker);
      resultArr.push(weakestTarget);
      resolve(resultArr);
    }));
  }
}
