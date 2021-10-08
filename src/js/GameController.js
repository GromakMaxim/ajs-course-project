import themes from './themes.js';
import { generateTeam } from './generators';
import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Vampire from './characters/Vampire';
import Magician from './characters/Magician';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';
import GameState from './GameState';
import { definePositionedTeams } from './utils';

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
      this.gamePlay.selectCell(index);
    }
  }

  onCellEnter(index) {
    const charactersPositions = this.gamePlay.allPositionedCharacters
      .map((item) => item.position);
    if (charactersPositions.includes(index)) this.gamePlay.setCursor('pointer');
  }

  onCellLeave(index) {
    const charactersPositions = this.gamePlay.allPositionedCharacters
      .map((item) => item.position);
    if (charactersPositions.includes(index)) this.gamePlay.setCursor('default');
  }

  turn(turn) {
    GameState.from(turn);
  }
}
