import Character from './Character';
import characterType from '../enums/characterTypes';
// wrapper for the character class
export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }

  moveToTarget(target, gameController) {
    this.position = gameController.navigation.findNearestPositionToTarget(this, target, gameController);
  }

  findClosestShooter(gameController) {
    const shooters = gameController.heroes.members
      .filter((member) => member.character.type === characterType.magician
        || member.character.type === characterType.bowman);

    let closest = null;
    let minDist = 99999999999;
    for (const sh of shooters) {
      const distance = gameController.navigation.findDistanceBetween(sh.position, this.position);
      if (distance < minDist) {
        minDist = distance;
        closest = sh;
      }
    }
    return closest;
  }

  findClosestEnemy(gameController) {
    let closest = null;
    let minDist = 99999999999;
    for (const currentEnemy of gameController.heroes.members) {
      const distance = gameController.navigation.findDistanceBetween(currentEnemy.position, this.position, gameController);
      if (distance < minDist) {
        minDist = distance;
        closest = currentEnemy;
      }
    }
    return closest;
  }
}
