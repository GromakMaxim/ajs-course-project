import themes from './themes.js';
import { generateTeam, getTeamWithPosition } from './generators';
import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Vampire from './characters/Vampire';
import Magician from './characters/Magician';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';
import GameState from './GameState';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    const playerTeam = generateTeam([Swordsman, Bowman, Magician], 1, 2);
    const npcTeam = generateTeam([Undead, Daemon, Vampire], 1, 2);
    this.turn('player');

    this.gamePlay.positionedPlayersTeam = getTeamWithPosition(playerTeam, npcTeam);
    this.gamePlay.redrawPositions(this.gamePlay.positionedPlayersTeam);
    this.gamePlay.addCellLeaveListener((index) => this.onCellLeave(index));
    this.gamePlay.addCellEnterListener((index) => this.onCellEnter(index));
    this.gamePlay.addCellClickListener((index) => this.onCellClick(index));

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }

  turn(turn) {
    GameState.from(turn);
  }
}
