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
    let distance = 0;

    if (action === 'move') {
      distance = positionedCharacter.character.movementDistance;

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
    }

    // we climb to the top, then descending we add line by line coordinates within the attack range
    if (action === 'attack') {
      distance = positionedCharacter.character.attackDistance;
      let rows = distance * 2 + 1;

      let step = 1;
      let startPos;
      let isExist;
      while (step <= distance) {
        isExist = this.goUp();
        if (!isExist) break;
        step++;
      }
      if (step === 1) rows = distance + 1;

      let currentRow = 1;
      while (currentRow <= rows) {
        startPos = this.getValue();
        arr.push(startPos);
        // left
        let currentCol = 1;
        while (currentCol <= distance) {
          isExist = this.goLeft();
          if (!isExist) break;
          arr.push(this.getValue());
          currentCol++;
        }
        this.setPointerByArrayArgs(this.getCoordinates(startPos));

        // right
        currentCol = 1;
        while (currentCol <= distance) {
          isExist = this.goRight();
          if (!isExist) break;
          arr.push(this.getValue());
          currentCol++;
        }

        this.setPointerByArrayArgs(this.getCoordinates(startPos));
        isExist = this.goDown();
        if (!isExist) break;
        currentRow++;
      }

      arr.splice(arr.findIndex((item) => item === currentPosition), 1);
    }
    arr.sort((i1, i2) => i1 - i2);
    return arr;
  }

  findDistanceBetween(pos1, pos2) {
    const coord1 = this.getCoordinates(pos1);
    const coord2 = this.getCoordinates(pos2);

    const diffRow = Math.abs(coord1[0] - coord2[0]);
    const diffCol = Math.abs(coord1[1] - coord2[1]);
    return diffRow + diffCol;
  }

  findNearestPositionToTarget(attacker, target, gameController) {
    if (Math.abs(attacker.position - target.position) === 1) return attacker.position;
    const movementArea = this.defineActionArea(attacker, this.size, 'move');
    let distance = 99999;
    let result;
    for (const pos of movementArea) {
      if (pos !== target.position) {
        const enemiesPositions = gameController.enemies.getPositions();
        const heroesPositions = gameController.heroes.getPositions();
        if (!enemiesPositions.includes(pos) && !heroesPositions.includes(pos)) {
          const currentDistanceBetween = this.findDistanceBetween(pos, target.position);
          if (currentDistanceBetween < distance) {
            distance = currentDistanceBetween;
            result = pos;
          }
        }
      }
    }
    return result;
  }
}
