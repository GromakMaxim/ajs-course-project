import {
  defineEnemyPossiblePositions,
  definePlayerPossiblePositions,
  definePositionedCharacter,
  selectRndPositionFromArray,
} from '../utils';

export default class Team {
  constructor(characters, owner, boardSize) {
    this.members = characters;
    this.owner = owner;
    if (boardSize !== null && boardSize !== undefined) {
      this.setPositions(boardSize);
    }
  }

  setPositions(boardSize) {
    let possiblePositions;

    if (this.owner === 'player') {
      possiblePositions = definePlayerPossiblePositions(boardSize);
    } else {
      possiblePositions = defineEnemyPossiblePositions(boardSize);
    }
    const rndPositions = selectRndPositionFromArray(possiblePositions, this.members.length);
    this.members = definePositionedCharacter(this.members, rndPositions);
  }

  getPositions() {
    return this.members.map((item) => item.position);
  }

  findMemberByPosition(index) {
    return this.members.find((item) => item.position === index);
  }

  deleteMemberByPosition(index) {
    this.members.splice(this.members.findIndex((item) => item.position === index), 1);
  }

  lvlUp() {
    for (const member of this.members) {
      member.character.lvlUp();
    }
  }

  randomizedLvlUp(minLevel, maxLevel) {
    for (const member of this.members) {
      const needToUpgrade = Math.floor(Math.random() * 2);
      if (needToUpgrade) {
        const rnd = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
        for (let i = minLevel; i < rnd; i++) {
          member.character.lvlUp();
        }
      }
    }
  }

  addMember(positionedCharacter) {
    if (!this.getPositions()
      .includes(positionedCharacter.position)) {
      this.members.push(positionedCharacter);
    } else {
      throw new Error(`position ${positionedCharacter.position}is busy!`);
    }
  }

  countRemainingLives() {
    return this.members.reduce((sum, member) => sum + member.character.currentHealth, 0);
  }
}
