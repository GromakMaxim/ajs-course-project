import {
  defineEnemyPossiblePositions,
  definePlayerPossiblePositions,
  definePositionedCharacter,
  selectRndPositionFromArray
} from './utils';

export default class Team {
  constructor(positionedCharacters, owner, boardSize) {
    this.members = positionedCharacters;
    this.owner = owner;
    this.boardSize = boardSize;
    this.setPositions();
  }

  setPositions() {
    let possiblePositions;

    if (this.owner === 'player') {
      possiblePositions = definePlayerPossiblePositions(this.boardSize);
    } else {
      possiblePositions = defineEnemyPossiblePositions(this.boardSize);
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
