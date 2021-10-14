import ThemesCollection from './ThemesCollection.js';
import { generateTeam } from '../generators';
import Swordsman from '../characters/entity/Swordsman';
import Bowman from '../characters/entity/Bowman';
import Vampire from '../characters/entity/Vampire';
import Magician from '../characters/entity/Magician';
import Undead from '../characters/entity/Undead';
import Daemon from '../characters/entity/Daemon';
import cursors from '../cursors';
import actions from '../actions';
import FieldNavigation from './FieldNavigation';
import GameState from './GameState';
import StrategyAnalyzer from '../strategy/StrategyAnalyzer';
import Hint from './Tip';
import VictoryConditionsChecker from './VictoryConditionsChecker';
import GameStateService from './GameStateService';
import Team from '../characters/Team';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
    this.theme = new ThemesCollection();
    this.strategyAnalyzer = new StrategyAnalyzer(this.gamePlay, this);
    this.VCChecker = new VictoryConditionsChecker();
    this.isBlocked = false; // if player loose or successfully pass all levels -> become 'true';
    this.stateService = new GameStateService();
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
    this.gamePlay.addNewGameListener(() => this.init());
    this.gamePlay.addSaveGameListener(() => this.saveGame());
    this.gamePlay.addLoadGameListener(() => this.loadGame());
    this.VCChecker.setGameController(this);

    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    if (!this.isBlocked) {
      const heroesPositions = this.heroes.getPositions();
      const enemiesPositions = this.enemies.getPositions();

      if (heroesPositions.includes(index)) {
        this.heroes.members.forEach((item) => this.gamePlay.deselectCell(item.position));

        this.gamePlay.selectedCharacter = this.heroes.members
          .find((item) => item.position === index);
        this.gamePlay.selectCell(index);
      }

      if (this.gamePlay.selectedCharacter !== null) {
        const movementArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.move);
        const attackArea = this.navigation.defineActionArea(this.gamePlay.selectedCharacter, this.gamePlay.boardSize ** 2, actions.attack);

        // move
        if (movementArea.includes(index) && !enemiesPositions.includes(index)) {
          const char = this.heroes.findMemberByPosition(this.gamePlay.selectedCharacter.position);
          char.position = index;
          console.log(`Игрок: переход ${char.character.type} на клетку ${index}`);
          this.refresh();
          this.deselectAll();
          this.turn('enemy');
        }

        // attack
        if (attackArea.includes(index) && enemiesPositions.includes(index)) {
          const attacker = this.gamePlay.selectedCharacter.character;
          const target = this.enemies.findMemberByPosition(index).character;
          const damage = Math.max(attacker.attack - target.defence, attacker.attack * 0.1);
          target.health -= damage;
          this.gamePlay.showDamage(index, damage)
            .then(() => {
              console.log(`Игрок нанёс урон персонажу ${target.type}: ${damage}`);
              if (target.health <= 0) {
                this.enemies.deleteMemberByPosition(index);
                this.allChars = this.heroes.members.concat(this.enemies.members);
              }
              this.refresh();
              this.VCChecker.checkWinningCondition();
              this.turn('enemy');
            });
        }
      }
    }
  }

  onCellEnter(index) {
    if (!this.isBlocked) {
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
      this.getTip(index);
      if (heroesPositions.includes(index)) this.gamePlay.setCursor(cursors.pointer);
    }
  }

  onCellLeave(index) {
    if (!this.isBlocked) {
      this.gamePlay.setCursor(cursors.auto);
      if (this.gamePlay.selectedCharacter !== null && this.gamePlay.selectedCharacter.position !== index) {
        this.gamePlay.deselectCell(index);
      }
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

  getTip(index) {
    let found = null;
    if (this.heroes.getPositions()
      .includes(index)) {
      found = this.heroes.findMemberByPosition(index);
    } else if (this.enemies.getPositions()
      .includes(index)) {
      found = this.enemies.findMemberByPosition(index);
    }
    if (found !== null && found !== undefined) {
      found = found.character;
      const hint = new Hint(found.level, found.attack, found.defence, found.health).getHint();
      this.gamePlay.showCellTooltip(hint, index);
    }
  }

  saveGame() {
    const state = new GameState(this);
    this.stateService.save(state);
  }

  loadGame() {
    const temp = this.stateService.load();
    this.heroes = new Team(temp.heroesTeam.members, temp.heroesTeam.owner);
    this.enemies = new Team(temp.enemyTeam.members, temp.enemyTeam.owner);

    this.allChars = temp.heroesTeam.members.concat(temp.enemyTeam.members);
    this.theme.setPointer(temp.theme);
    this.refresh();
  }
}
