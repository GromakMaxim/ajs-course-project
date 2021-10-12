import Character from '../Character.js';

export default class Swordsman extends Character {
  constructor(level, type) {
    super(level, type);
    this.attack = 40;
    this.defence = 10;
    this.movementDistance = 4;
    this.attackDistance = 1;
  }
}
