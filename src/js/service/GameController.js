import ThemesCollection from './ThemesCollection.js';
import { characterGenerator, generateTeam } from '../generators';
import Swordsman from '../characters/entity/Swordsman';
import Bowman from '../characters/entity/Bowman';
import Vampire from '../characters/entity/Vampire';
import Undead from '../characters/entity/Undead';
import Daemon from '../characters/entity/Daemon';
import cursors from '../cursors';
import actions from '../actions';
import FieldNavigation from './FieldNavigation';
import GameState from './GameState';
import StrategyAnalyzer from '../strategy/StrategyAnalyzer';
import Hint from './Hint';
import VictoryConditionsChecker from './VictoryConditionsChecker';
import GameStateService from './GameStateService';
import Team from '../characters/Team';
import Magician from '../characters/entity/Magician';
import PositionedCharacter from '../characters/PositionedCharacter';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.navigation = new FieldNavigation(this.gamePlay.boardSize ** 2);
    this.theme = new ThemesCollection();
    this.strategyAnalyzer = new StrategyAnalyzer(this.gamePlay, this);
    this.isBlocked = false; // if player loose or successfully pass all levels -> become 'true';
    this.stateService = new GameStateService();
    this.VCChecker = new VictoryConditionsChecker();
    this.survivors = [];
  }

  init(parameter) {
    this.gamePlay.drawUi(this.theme.getCurrentTheme());

    if (parameter !== null && parameter !== undefined) {
      this.nextStage(parameter);
    } else {
      this.heroes = generateTeam([Swordsman, Bowman], 1, 2, this.gamePlay.boardSize ** 2, 'player');
      this.enemies = generateTeam([Undead, Daemon, Vampire], 1, 2, this.gamePlay.boardSize ** 2, 'enemy');
      this.allChars = this.heroes.members.concat(this.enemies.members);
    }

    this.refresh();
    this.gamePlay.addCellLeaveListener((index) => this.onCellLeave(index));
    this.gamePlay.addCellEnterListener((index) => this.onCellEnter(index));
    this.gamePlay.addCellClickListener((index) => this.onCellClick(index));
    this.gamePlay.addNewGameListener(() => this.init());
    this.gamePlay.addSaveGameListener(() => this.saveGame());
    this.gamePlay.addLoadGameListener(() => this.loadGame());
    this.VCChecker.setGameController(this);
  }

  nextStage(parameter) {
    console.log(`Switching to stage ${parameter}`);
    this.heroes.lvlUp();
    this.survivors = [];
    for (let i = 1; i < parameter; i++) {
      const newChar = characterGenerator([Swordsman, Bowman, Magician], parameter - 1);
      this.survivors.push(newChar);
    }

    this.heroes.members.forEach((member) => this.survivors.push(member.character));
    this.heroes = new Team(this.survivors, 'player', this.gamePlay.boardSize ** 2);
    this.enemies = generateTeam([Undead, Daemon, Vampire], 1, this.heroes.members.length, this.gamePlay.boardSize ** 2, 'enemy');
    this.enemies.randomizedLvlUp(1, parameter);
    this.allChars = this.heroes.members.concat(this.enemies.members);
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
          this.gamePlay.selectCell(char.position);
          this.turn('enemy');
        }

        // attack
        if (attackArea.includes(index) && enemiesPositions.includes(index)) {
          const attacker = this.gamePlay.selectedCharacter.character;
          const target = this.enemies.findMemberByPosition(index);
          attacker.makeDamage(target, this.gamePlay, this);
          this.turn('enemy');
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
      const hint = new Hint(found.character).getHint();
      this.gamePlay.showCellTooltip(hint, index);
    }
  }

  saveGame() {
    const state = new GameState(this);
    this.stateService.save(state);
  }

  loadGame() {
    const temp = this.stateService.load();
    const e = [];
    const h = [];

    for (const enemy of temp.enemyTeam.members) {
      e.push(this.buildCharacterFromRawData(enemy));
    }
    for (const hero of temp.heroesTeam.members) {
      h.push(this.buildCharacterFromRawData(hero));
    }
    this.gamePlay.drawUi(this.theme.getCurrentTheme());
    this.heroes = new Team(h, temp.heroesTeam.owner);
    this.enemies = new Team(e, temp.enemyTeam.owner);

    this.allChars = this.heroes.members.concat(this.enemies.members);
    this.theme.setPointer(temp.theme);
    this.refresh();
  }

  buildCharacterFromRawData(positionedCharacter) {
    if (positionedCharacter === null || positionedCharacter === undefined) throw new Error('object is null or undefined');
    let tempCharacter;
    switch (positionedCharacter.character.type) {
      case 'undead':
        tempCharacter = new Undead(1, 'undead');
        break;
      case 'vampire':
        tempCharacter = new Vampire(1, 'vampire');
        break;
      case 'daemon':
        tempCharacter = new Daemon(1, 'daemon');
        break;
      case 'swordsman':
        tempCharacter = new Swordsman(1, 'swordsman');
        break;
      case 'bowman':
        tempCharacter = new Bowman(1, 'bowman');
        break;
      case 'magician':
        tempCharacter = new Magician(1, 'magician');
        break;
      default:
        throw new Error(`cant manage this. Unsupported type: ${positionedCharacter.type}`);
    }

    tempCharacter.attack = positionedCharacter.character.attack;
    tempCharacter.defence = positionedCharacter.character.defence;
    tempCharacter.attackDistance = positionedCharacter.character.attackDistance;
    tempCharacter.level = positionedCharacter.character.level;
    tempCharacter.maxHealth = positionedCharacter.character.maxHealth;
    tempCharacter.currentHealth = positionedCharacter.character.currentHealth;

    return new PositionedCharacter(tempCharacter, positionedCharacter.position);
  }
}
