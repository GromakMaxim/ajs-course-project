export default class Hint {
  constructor(character) {
    this.lvl = character.level;
    this.attack = character.attack;
    this.defence = character.defence;
    this.currentHealth = character.currentHealth;
    this.maxHealth = character.maxHealth;
    this.pictures = ['🎖', '⚔', '🛡', '❤'];
  }

  getHint() {
    return `${this.pictures[0] + this.lvl
    + this.pictures[1] + this.attack
    + this.pictures[2] + this.defence
    + this.pictures[3] + this.currentHealth}/${this.maxHealth}`;
  }
}
