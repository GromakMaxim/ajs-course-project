export default class ThemesCollection {
  constructor() {
    this.themes = ['prairie', 'desert', 'arctic', 'mountain'];
    this.pointer = 0;
    this.isCycle = false; // switch this parameter for endless game
  }

  setPointer(index) {
    if (index >= 0 && index < this.themes.length) {
      this.pointer = index;
    }
  }

  next() {
    if (this.isCycle) {
      if (this.pointer + 1 < this.themes.length) {
        this.pointer++;
      } else {
        this.pointer = 0;
      }
    } else {
      if (this.pointer + 1 > this.themes.length - 1) {
        return false;
      }
      this.pointer++;
      return true;
    }
    return true;
  }

  previous() {
    if (this.isCycle) {
      if (this.pointer - 1 >= 0) {
        this.pointer--;
      } else {
        this.pointer = this.themes.length - 1;
      }
    } else {
      if (this.pointer - 1 > 0) {
        this.pointer--;
        return true;
      }
      return false;
    }
    return true;
  }

  getCurrentTheme() {
    return this.themes[this.pointer];
  }

  // eslint-disable-next-line consistent-return
  getThemeByIndex(index) {
    if (index >= 0 && index < this.themes.length) {
      return this.themes[this.pointer];
    }
  }
}
