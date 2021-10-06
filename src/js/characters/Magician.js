import Character from '../Character.js';

export default class Magician extends Character {
  constructor(level, type) {
    super(level, type);
    this.attack = 10;
    this.defence = 40;
  }
}
