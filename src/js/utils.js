export function calcTileType(index, boardSize) {
  // eslint-disable-next-line no-restricted-properties
  const lastCell = Math.pow(boardSize, 2) - 1;

  // corner
  if (index === 0) return 'top-left';
  if (index === lastCell - boardSize + 1) return 'bottom-left';
  if (index === boardSize - 1) return 'top-right';
  if (index === lastCell) return 'bottom-right';

  // edge
  if (index > 0 && index < boardSize) return 'top';
  if (index > lastCell - boardSize) return 'bottom';
  if (index % boardSize === 0) return 'left';
  if ((index + 1) % boardSize === 0) return 'right';
  return 'center';
}

export function defineRndPosition(teamPlayer, teamEnemy, boardSize) {

  if (whoseTeam === 'player') {

  }
  if (whoseTeam === 'enemy') {

  }
}

export function teamPlayerPossiblePositions(boardSize) {
  let temp = 0;
  const arr = [];
  while (true) {
    arr.push(temp);
    temp++;
    arr.push(temp);
    temp += 7;
    if (temp >= boardSize) break;
  }
  return arr;
}

export function teamEnemyPossiblePositions(boardSize) {
  let temp = 6;
  const arr = [];
  while (true) {
    arr.push(temp);
    temp++;
    arr.push(temp);
    temp += 7;
    if (temp >= boardSize) break;
  }
  return arr;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
