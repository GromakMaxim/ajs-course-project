// units are trying to get closer and engage in close combat
import Strategy from './Strategy';

export default class AttackStrategy extends Strategy {
  // if smb in range - attack him
  process() {
    console.log('Attack selected');
    const possibleTargets = this.findUnitsCapableToAttack();

    if (possibleTargets.length !== 0) {
      this.makeMaxDamage()
        .then((resolve) => {
          if (resolve !== null) {
            const target = resolve[1];
            const attacker = resolve[0];
            attacker.character.makeDamage(target, this.gamePlay, this.gameController)
              .then(() => {
                console.log('Ход игрока...');
              });
          } else {
            console.log('Компьютер ждёт подходящего момента...');
          }
        });
    } else {
      const minLimit = 0;
      const maxLimit = this.gameController.enemies.members.length - 1;
      const rndIndex = Math.floor(Math.random() * (maxLimit - minLimit + 1)) + minLimit;
      const attacker = this.gameController.enemies.members[rndIndex];
      const closestEnemy = attacker.findClosestEnemy(this.gameController);

      attacker.moveToTarget(closestEnemy, this.gameController);
      console.log(`Компьютер: переход ${attacker.character.type} на клетку ${attacker.position}`);
    }
    this.gameController.refresh();
    console.log('Ход игрока...');
  }
}
