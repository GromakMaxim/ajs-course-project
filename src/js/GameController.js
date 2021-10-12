import ThemesCollection from './ThemesCollection.js';
import { generateTeam } from './generators';
import Swordsman from './characters/entity/Swordsman';
import Bowman from './characters/entity/Bowman';
import Vampire from './characters/entity/Vampire';
import Magician from './characters/entity/Magician';
import Undead from './characters/entity/Undead';
import Daemon from './characters/entity/Daemon';
import cursors from './cursors';
import actions from './actions';
import FieldNavigation from './FieldNavigation';
import GameState from './GameState';
import StrategyAnalyzer from './strategy/StrategyAnalyzer';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
    this.theme = new ThemesCollection();
    this.strategyAnalyzer = new StrategyAnalyzer(this.gamePlay, this);
  }

  init() {
    this.gamePlay.drawUi(this.theme.getCurrentTheme());
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
    const heroesPositions = this.heroes.getPositions();
    const enemiesPositions = this.enemies.getPositions();

    if (heroesPositions.includes(index)) {
      this.heroes.members.forEach((item) => this.gamePlay.deselectCell(item.position));

      this.gamePlay.selectedCharacter = this.heroes.members
        .find((item) => item.position === index);
      this.gamePlay.selectCell(index);
      // this.gamePlay.showCellTooltip(found[0].character.type, index);
    }

    if (this.gamePlay.selectedCharacter !== null) {
      const movementArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.move);
      const attackArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.attack);

      // move
      if (movementArea.includes(index) && !enemiesPositions.includes(index)) {
        const char = this.heroes.findMemberByPosition(this.gamePlay.selectedCharacter.position);
        char.position = index;
        console.log(`Игрок: переход на клетку ${index}`);
        this.refresh();
        this.deselectAll();
        this.turn('enemy');
      }

      // attack
      if (attackArea.includes(index) && enemiesPositions.includes(index)) {
        const enemyTarget = this.enemies.findMemberByPosition(index).character;
        this.gamePlay.showDamage(index, this.gamePlay.selectedCharacter.attack)
          .then(() => {
            const damage = Math.max(this.gamePlay.selectedCharacter.character.attack - enemyTarget.defence, this.gamePlay.selectedCharacter.character.attack * 0.1);
            enemyTarget.health -= damage;
            console.log(`Игрок нанёс урон: ${damage}`);
            if (enemyTarget.health <= 0) {
              this.enemies.deleteMemberByPosition(index);
              this.allChars = this.heroes.members.concat(this.enemies.members);
            }
            this.refresh();
            this.checkWinningCondition();
            this.turn('enemy');
          });
      }
    }
  }

  onCellEnter(index) {
    const heroesPositions = this.heroes.getPositions();
    const enemiesPositions = this.enemies.getPositions();

    if (this.gamePlay.selectedCharacter !== null && this.gamePlay.selectedCharacter.position !== index) {
      const movementArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.move);
      const attackArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.attack);

      if (attackArea.includes(index) && enemiesPositions.includes(index)) {
        this.gamePlay.setCursor(cursors.crosshair);
      } else if (movementArea.includes(index) && !enemiesPositions.includes(index)) {
        this.gamePlay.setCursor(cursors.pointer);
        this.gamePlay.selectCell(index, 'green');
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }

    if (heroesPositions.includes(index)) this.gamePlay.setCursor(cursors.pointer);
  }

  onCellLeave(index) {
    this.gamePlay.setCursor(cursors.auto);
    if (this.gamePlay.selectedCharacter !== null && this.gamePlay.selectedCharacter.position !== index) {
      this.gamePlay.deselectCell(index);
    }
  }

  refresh() {
    this.gamePlay.redrawPositions(this.allChars);
  }

  deselectAll() {
    for (let i = 0; i < this.gamePlay.boardSize ** 2; i++) {
      if (this.gamePlay.selectedCharacter.position !== i) {
        this.gamePlay.deselectCell(i);
      }
    }
  }

  turn(turn) {
    GameState.turn = turn;
    this.strategyAnalyzer.analyze();
  }

  selectedPosition(index) {
    GameState.selected = index;
  }

  playerScore(integer) {
    GameState.score = integer;
  }

  posCharacter(chars) {
    GameState.chars = chars;
  }

  checkWinningCondition() {
    if (this.enemies.members.length === 0) {
      console.log('Игрок победил!');
      this.theme.next();
      this.init();
    }
  }
}
