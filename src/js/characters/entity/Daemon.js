import Character from '../Character.js';

export default class Daemon extends Character {
  constructor(level, type) {
    super(level, type);
    this.attack = 10;
    this.defence = 40;
    this.movementDistance = 1;
    this.attackDistance = 4;
  }
}
