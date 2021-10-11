// quite simple navigation by tiles

export default class FieldNavigation {
  constructor(size) {
    this.size = size;
    this.lineLength = Math.sqrt(size);
    this.field = [];
    this.createField();
    this.column = 0;
    this.row = 0;
    this.value = this.field[this.row][this.column];
  }

  createField() {
    let counter = 0;
    const limit = Math.sqrt(this.size) - 1;
    for (let i = 0; i <= limit; i++) {
      const tempArr = [];
      for (let j = 0; j <= limit; j++) {
        tempArr.push(counter);
        counter++;
      }
      this.field.push(tempArr);
    }
  }

  getValue() {
    return this.field[this.row][this.column];
  }

  getCoordinates(index) {
    // todo simplify this
    for (let rowIndex = 0; rowIndex < this.lineLength; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.lineLength; columnIndex++) {
        if (this.field[rowIndex][columnIndex] === index) return [rowIndex, columnIndex];
      }
    }
    return null;
  }

  setPointerByArrayArgs(arrCoordinates) {
    return this.setPointer(arrCoordinates[0], arrCoordinates[1]);
  }

  setPointer(row, column) {
    if (row >= 0 && row <= this.lineLength - 1 && column >= 0 && column <= this.lineLength - 1) {
      this.row = row;
      this.column = column;
      return true;
    }
    return false;
  }

  setPointerByDefault() {
    this.row = 0;
    this.column = 0;
  }

  goLeft() {
    if (this.column - 1 >= 0) {
      this.column--;
      return true;
    }
    return false;
  }

  goRight() {
    if (this.column + 1 <= this.lineLength - 1) {
      this.column++;
      return true;
    }
    return false;
  }

  goUp() {
    if (this.row - 1 >= 0) {
      this.row--;
      return true;
    }
    return false;
  }

  goDown() {
    if (this.row + 1 <= this.lineLength - 1) {
      this.row++;
      return true;
    }
    return false;
  }

  goUpLeft() {
    if (this.row - 1 >= 0 && this.column - 1 >= 0) {
      this.goUp();
      this.goLeft();
      return true;
    }
    return false;
  }

  goDownLeft() {
    if (this.row + 1 <= this.lineLength - 1 && this.column - 1 >= 0) {
      this.goDown();
      this.goLeft();
      return true;
    }
    return false;
  }

  goUpRight() {
    if (this.row - 1 >= 0 && this.column + 1 <= this.lineLength - 1) {
      this.goUp();
      this.goRight();
      return true;
    }
    return false;
  }

  goDownRight() {
    if (this.row + 1 <= this.lineLength - 1 && this.column + 1 <= this.lineLength - 1) {
      this.goDown();
      this.goRight();
      return true;
    }
    return false;
  }

  defineActionArea(positionedCharacter, boardSize, action) {
    const arr = [];

    const currentPosition = positionedCharacter.position;
    if (currentPosition > boardSize - 1 || currentPosition < 0) throw new Error(`wrong position parameter: ${positionedCharacter}`);
    const coords = this.getCoordinates(currentPosition);
    const isSet = this.setPointerByArrayArgs(coords);
    if (!isSet) throw new Error(`cant define such coordinates in character ${positionedCharacter}`);

    const distance = (action === 'move') ? positionedCharacter.character.movementDistance : positionedCharacter.character.attackDistance;

    // diagonal up-left
    let step = 1;
    while (step <= distance) {
      const b = this.goUpLeft();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // diagonal up-right
    this.setPointerByArrayArgs(coords);
    step = 1;
    while (step <= distance) {
      const b = this.goUpRight();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // diagonal down-left
    this.setPointerByArrayArgs(coords);
    step = 1;
    while (step <= distance) {
      const b = this.goDownLeft();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // diagonal down-right
    this.setPointerByArrayArgs(coords);
    step = 1;
    while (step <= distance) {
      const b = this.goDownRight();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // diagonal left
    this.setPointerByArrayArgs(coords);
    step = 1;
    while (step <= distance) {
      const b = this.goLeft();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // diagonal right
    this.setPointerByArrayArgs(coords);
    step = 1;
    while (step <= distance) {
      const b = this.goRight();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // diagonal up
    this.setPointerByArrayArgs(coords);
    step = 1;
    while (step <= distance) {
      const b = this.goUp();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // diagonal down
    this.setPointerByArrayArgs(coords);
    step = 1;
    while (step <= distance) {
      const b = this.goDown();
      if (!b) break;
      arr.push(this.getValue());
      step++;
    }

    // arr.push(currentPosition);
    arr.sort((i1, i2) => i1 - i2);
    return arr;
  }
}
