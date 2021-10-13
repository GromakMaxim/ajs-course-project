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
}
