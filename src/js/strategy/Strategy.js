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

  async findUnitsCapableToAttack() {
    const resultArr = [];
    for (const enemyUnit of this.gameController.enemies.members) {
      // eslint-disable-next-line no-await-in-loop
      const attackArea = await this.navigation.defineActionArea(enemyUnit, this.gamePlay.boardSize ** 2, actions.attack);
      // eslint-disable-next-line no-await-in-loop
      const possibleTargets = await this.gameController.heroes.getPositions()
        .filter((item) => attackArea.includes(item));
      if (possibleTargets.length !== 0) resultArr.push(enemyUnit);
    }
    return resultArr;
  }

  async findWeakestUnit(possibleTargets) {
    let weakest = null;
    let tempDefence = 99999999;
    for (const possibleTarget of possibleTargets) {
      // eslint-disable-next-line no-await-in-loop
      const unit = await this.gameController.heroes.findMemberByPosition(possibleTarget);
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

  async makeMaxDamage() {
    const resultArr = []; // attacker - target
    const heroPositions = await this.gameController.heroes.getPositions();
    // console.log('hero positions');
    // console.log(heroPositions);
    const attackers = await this.findUnitsCapableToAttack();
    // console.log('attackers')
    // console.log(attackers)
    let mostDangerousAttacker;
    let maxDamage = 0;
    let weakestTarget;
    for (const enemyUnit of attackers) {
      // eslint-disable-next-line no-await-in-loop
      const attackArea = await this.navigation.defineActionArea(enemyUnit, this.gamePlay.boardSize ** 2, actions.attack);
      const possibleTargets = heroPositions.filter((item) => attackArea.includes(item));
      // eslint-disable-next-line no-await-in-loop
      const target = await this.findWeakestUnit(possibleTargets);
      const possibleDamage = Math.max(enemyUnit.character.attack - target.character.defence, enemyUnit.character.attack * 0.1);
      if (possibleDamage >= maxDamage) {
        maxDamage = possibleDamage;
        mostDangerousAttacker = enemyUnit;
        weakestTarget = target;
      }
    }
    // console.log('mostDangerousAttacker')
    // console.log(mostDangerousAttacker)
    // console.log('weakestTarget')
    // console.log(weakestTarget)

    if (mostDangerousAttacker !== null && mostDangerousAttacker !== undefined) {
      resultArr.push(mostDangerousAttacker);
      resultArr.push(weakestTarget);
      // console.log(resultArr)
      return resultArr;
    }

    return null;
  }
}
