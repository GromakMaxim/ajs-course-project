import themes from './themes.js';
import { generateTeam } from './generators';
import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Vampire from './characters/Vampire';
import Magician from './characters/Magician';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';
import cursors from './cursors';
import actions from './actions';
import FieldNavigation from './FieldNavigation';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    this.heroes = generateTeam([Swordsman, Bowman, Magician], 1, 2, this.gamePlay.boardSize ** 2, 'player');
    this.enemies = generateTeam([Undead, Daemon, Vampire], 1, 2, this.gamePlay.boardSize ** 2, 'enemy');
    this.allChars = this.heroes.members.concat(this.enemies.members);

    this.refresh();
    this.gamePlay.addCellLeaveListener((index) => this.onCellLeave(index));
    this.gamePlay.addCellEnterListener((index) => this.onCellEnter(index));
    this.gamePlay.addCellClickListener((index) => this.onCellClick(index));

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    const found = this.heroes.members
      .filter((item) => item.position === index);

    if (found !== null && found.length !== 0) {
      this.heroes.members.forEach((item) => this.gamePlay.deselectCell(item.position));

      this.gamePlay.selectedCharacter = this.heroes.members
        .find((item) => item.position === index);
      this.gamePlay.selectCell(index);
      this.gamePlay.showCellTooltip(found[0].character.type, index);
    }

    if (this.gamePlay.selectedCharacter !== null) {
      const movementArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.move);
      if (movementArea.includes(index)) {
        const char = this.heroes.findMemberByPosition(this.gamePlay.selectedCharacter.position);
        char.position = index;
        this.refresh();
        this.deselectAll();
      }
    }
  }

  onCellEnter(index) {
    const heroesPositions = this.heroes.getPositions();
    const enemiesPositions = this.enemies.getPositions();
    const allPositions = heroesPositions.concat(enemiesPositions);

    if (allPositions.includes(index)) this.gamePlay.setCursor(cursors.pointer);

    if (this.gamePlay.selectedCharacter !== null && this.gamePlay.selectedCharacter.position !== index) {
      const movementArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.move);
      const attackArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.attack);

      if (movementArea.includes(index)) {
        this.gamePlay.setCursor(cursors.pointer);
        this.gamePlay.selectCell(index, 'green');
      } else if (enemiesPositions.includes(index) && (attackArea.includes(index))) {
        this.gamePlay.setCursor(cursors.crosshair);
        this.gamePlay.selectCell(index, 'red');
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }
  }

  onCellLeave(index) {
    const heroesPositions = this.heroes.getPositions();
    const enemiesPositions = this.enemies.getPositions();
    const allPositions = heroesPositions.concat(enemiesPositions);

    if (allPositions.includes(index)) this.gamePlay.setCursor(cursors.auto);

    if (this.gamePlay.selectedCharacter !== null && this.gamePlay.selectedCharacter.position !== index) {
      this.gamePlay.deselectCell(index);
    }
  }

  refresh() {
    this.gamePlay.redrawPositions(this.allChars);
    // if (this.gamePlay.selectedCharacter != null) {
    //   this.gamePlay.deselectCell(this.gamePlay.selectedCharacter.position);
    //   this.gamePlay.selectedCharacter = null;
    // }
  }

  deselectAll() {
    for (let i = 0; i < this.gamePlay.boardSize ** 2; i++) {
      if (this.gamePlay.selectedCharacter.position !== i) {
        this.gamePlay.deselectCell(i);
      }
    }
  }
}
