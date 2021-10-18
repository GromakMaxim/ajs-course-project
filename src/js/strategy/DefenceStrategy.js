import Strategy from './Strategy';

export default class DefenceStrategy extends Strategy {
  async process() {
    console.log('Defence selected');
    const resolve = await this.makeMaxDamage();
    // console.log(resolve)
    if (resolve !== null) {
      const target = resolve[1];
      const attacker = resolve[0];
      await attacker.character.makeDamage(target, this.gamePlay, this.gameController);
      console.log('Ход игрока...');
    } else {
      console.log('Компьютер ждёт подходящего момента...');
    }
  }
}
