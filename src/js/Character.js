export default class Character {
  constructor(level, type = 'generic') {
    if (new.target === Character) {
      throw new Error('Cant create instance of Character class. Character class is abstract!');
    }

    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
  }
}
