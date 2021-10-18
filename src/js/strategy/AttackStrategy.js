// units are trying to get closer and engage in close combat
import Strategy from './Strategy';

export default class AttackStrategy extends Strategy {
  // if smb in range - attack him
  async process() {
    console.log('Attack selected');
    const possibleTargets = await this.findUnitsCapableToAttack();

    if (possibleTargets.length !== 0) {
      const resolve = await this.makeMaxDamage();
      if (resolve !== null) {
        const target = resolve[1];
        const attacker = resolve[0];
        await attacker.character.makeDamage(target, this.gamePlay, this.gameController);
        console.log('Ход игрока...');
      } else {
        console.log('Компьютер ждёт подходящего момента...');
      }
    } else {
      const minLimit = 0;
      const maxLimit = this.gameController.enemies.members.length - 1;
      const rndIndex = Math.floor(Math.random() * (maxLimit - minLimit + 1)) + minLimit;
      const attacker = await this.gameController.enemies.members[rndIndex];
      const closestEnemy = await attacker.findClosestEnemy(this.gameController);
      // console.log('closestEnemy')
      // console.log(closestEnemy)
      await attacker.moveToTarget(closestEnemy, this.gameController);
      console.log(`Компьютер: переход ${attacker.character.type} на клетку ${attacker.position}`);
    }
    this.gameController.refresh();
  }
}
