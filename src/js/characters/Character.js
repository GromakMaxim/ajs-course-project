import characterType from '../enums/characterTypes';

export default class Character {
  constructor(level, type = characterType.generic) {
    if (new.target === Character) {
      throw new Error('Cant create instance of Character class. Character class is abstract!');
    }
    if (level < 1) {
      throw new Error(`cant created Character with level ${level}`);
    }
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.currentHealth = 50;
    this.maxHealth = 50;
    this.type = type;
  }

  setCurrentHealth(health) {
    if (health >= 0 && health <= this.maxHealth) {
      this.currentHealth = health;
    } else {
      throw new Error('the health level being set is too low');
    }
  }

  setMaxHealth(health) {
    if (health >= 0 && health >= this.currentHealth) {
      this.maxHealth = health;
    } else {
      throw new Error('the health level being set is too low');
    }
  }

  lvlUp() {
    this.increaseLvl();
    this.increaseHealth();
    this.increaseAttack();
    this.increaseDefence();
  }

  increaseLvl() {
    this.level++;
  }

  increaseHealth() {
    this.currentHealth += 80;
    if (this.currentHealth > 100) {
      this.maxHealth = 100;
      this.currentHealth = 100;
    } else {
      this.maxHealth = this.currentHealth;
    }
  }

  increaseAttack() {
    const healthDiff = this.maxHealth - this.currentHealth;
    const percent = (healthDiff / this.maxHealth) * 100;
    if (percent <= 50) {
      this.attack += this.attack * 0.3;
    }
  }

  increaseDefence() {
    const healthDiff = this.maxHealth - this.currentHealth;
    const percent = (healthDiff / this.maxHealth) * 100;
    if (percent <= 50) {
      this.defence += this.defence * 0.3;
    }
  }

  async makeDamage(positionedTarget, gamePlay, gameController) {
    const damage = Math.max(this.attack - positionedTarget.character.defence, this.attack * 0.1);
    positionedTarget.character.currentHealth -= damage;

    await gamePlay.showDamage(positionedTarget.position, damage.toFixed(0));

    console.log(`${this.type} ?????????? ???????? ?????????????????? ${positionedTarget.character.type}: ${damage}`);
    if (positionedTarget.character.currentHealth <= 0) {
      switch (positionedTarget.character.type) {
        case characterType.magician:
        case characterType.bowman:
        case characterType.swordsman:
          await gameController.heroes.deleteMemberByPosition(positionedTarget.position);
          break;

        case characterType.vampire:
        case characterType.daemon:
        case characterType.undead:
          await gameController.enemies.deleteMemberByPosition(positionedTarget.position);
          break;
        default:
          throw new Error(`unsupported character${positionedTarget.character}`);
      }
      if (positionedTarget.position === gamePlay.selectedCharacter.position) {
        gamePlay.deselectCell(gamePlay.selectedCharacter.position);
        gameController.deselectAll();
        gamePlay.selectedCharacter = null;
      }
    }
    gameController.allChars = gameController.heroes.members.concat(gameController.enemies.members);
    await gameController.refresh();
    await gameController.VCChecker.checkWinningCondition();
  }
}
