export default class Hint {
  constructor(lvl, attack, defence, health) {
    this.lvl = lvl;
    this.attack = attack;
    this.defence = defence;
    this.health = health;
    this.pictures = ['🎖', '⚔', '🛡', '❤'];
  }

  getHint() {
    return this.pictures[0] + this.lvl
      + this.pictures[1] + this.attack
      + this.pictures[2] + this.defence
      + this.pictures[3] + this.health;
  }
}
