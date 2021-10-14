export default class GameStateService {
  constructor() {
    if (typeof GameStateService.instance === 'object') {
      return GameStateService.instance;
    }
    GameStateService.instance = this;
    return GameStateService.instance;
  }

  save(state) {
    localStorage.setItem('state', JSON.stringify(state));
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem('state'));
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
