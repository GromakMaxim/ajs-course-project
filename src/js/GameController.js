import themes from './themes.js';
import { generateTeam } from './generators';
import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Vampire from './characters/Vampire';
import Magician from './characters/Magician';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';
import GameState from './GameState';
import { defineMovementArea, definePositionedTeams } from './utils';
import cursors from './cursors';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    const playerTeam = generateTeam([Swordsman, Bowman, Magician], 1, 2);
    const enemyTeam = generateTeam([Undead, Daemon, Vampire], 1, 2);
    this.turn('player');

    // eslint-disable-next-line max-len
    this.gamePlay.allPositionedCharacters = definePositionedTeams(playerTeam, enemyTeam, this.gamePlay.boardSize);
    this.gamePlay.redrawPositions(this.gamePlay.allPositionedCharacters);
    this.gamePlay.addCellLeaveListener((index) => this.onCellLeave(index));
    this.gamePlay.addCellEnterListener((index) => this.onCellEnter(index));
    this.gamePlay.addCellClickListener((index) => this.onCellClick(index));

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    const found = this.gamePlay.allPositionedCharacters
      .filter((item) => item.character.type === 'swordsman' || item.character.type === 'bowman' || item.character.type === 'magician')
      .filter((item) => item.position === index);

    if (found.length !== 0) {
      this.gamePlay.allPositionedCharacters
        .filter((item) => item.character.type === 'swordsman' || item.character.type === 'bowman' || item.character.type === 'magician')
        .forEach((item) => this.gamePlay.deselectCell(item.position));
      // eslint-disable-next-line prefer-destructuring
      this.gamePlay.selectedCharacter = found[0];
      this.gamePlay.selectCell(index);
      this.gamePlay.showCellTooltip(found[0].character.type, index);
    }
  }

  onCellEnter(index) {
    const charactersPositions = this.gamePlay.allPositionedCharacters
      .map((item) => item.position);

    if (charactersPositions.includes(index)) this.gamePlay.setCursor(cursors.pointer);

    if (this.gamePlay.selectedCharacter !== null && this.gamePlay.selectedCharacter.position !== index) {
      const area = defineMovementArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2);
      if (area.includes(index)) {
        this.gamePlay.selectCell(index, 'green');
      }
    }
  }

  onCellLeave(index) {
    const charactersPositions = this.gamePlay.allPositionedCharacters
      .map((item) => item.position);
    if (charactersPositions.includes(index)) this.gamePlay.setCursor(cursors.auto);

    if (this.gamePlay.selectedCharacter !== null && this.gamePlay.selectedCharacter.position !== index) {
      this.gamePlay.deselectCell(index);
    }
  }

  turn(turn) {
    GameState.from(turn);
  }
}
