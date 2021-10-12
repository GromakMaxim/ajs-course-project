export default class ThemesCollection {
  constructor() {
    this.themes = ['prairie', 'desert', 'arctic', 'mountain'];
    this.pointer = 0;
  }

  setPointer(index) {
    if (index >= 0 && index <= this.themes.length) {
      this.pointer = index;
    }
  }

  next() {
    if (this.pointer + 1 <= this.themes.length) {
      this.pointer++;
    } else {
      this.pointer = 0;
    }
  }

  previous() {
    if (this.pointer - 1 >= 0) {
      this.pointer--;
    } else {
      this.pointer = this.themes.length;
    }
  }

  getCurrentTheme() {
    return this.themes[this.pointer];
  }

  // eslint-disable-next-line consistent-return
  getThemeByIndex(index) {
    if (index >= 0 && index <= this.themes.length) {
      return this.themes[this.pointer];
    }
  }
}
