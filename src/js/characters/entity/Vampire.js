import Character from '../Character.js';

export default class Vampire extends Character {
  constructor(level, type) {
    super(level, type);
    this.attack = 25;
    this.defence = 25;
    this.movementDistance = 2;
    this.attackDistance = 2;
  }
}
