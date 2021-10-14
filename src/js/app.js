/**
 * Entry point of app: don't change this
 */
import GamePlay from './service/GamePlay';
import GameController from './service/GameController';
import GameStateService from './service/GameStateService';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here
