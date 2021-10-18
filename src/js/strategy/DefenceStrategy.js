import Strategy from './Strategy';

export default class DefenceStrategy extends Strategy {
  process() {
    console.log('Defence selected');
    this.makeMaxDamage()
      .then((resolve) => {
        const target = resolve[1];
        const attacker = resolve[0];

        attacker.character.makeDamage(target, this.gamePlay, this.gameController);
        console.log('Ход игрока...');
      });
  }
}
