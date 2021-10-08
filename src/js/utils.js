import PositionedCharacter from './PositionedCharacter';

export function calcTileType(index, boardSize) {
  const lastCell = boardSize * boardSize - 1;

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

export function definePositionedTeams(teamPlayer, teamEnemy, boardSize) {
  boardSize *= boardSize;
  const possiblePlayerPositions = definePlayerPossiblePositions(boardSize);
  const rndPositionsPlayer = selectRndPositionFromArray(possiblePlayerPositions, teamPlayer.length);

  const possibleEnemyPositions = defineEnemyPossiblePositions(boardSize);
  const rndPositionsEnemy = selectRndPositionFromArray(possibleEnemyPositions, teamEnemy.length);

  const positionedTeamA = definePositionedCharacter(teamPlayer, rndPositionsPlayer);
  const positionedTeamB = definePositionedCharacter(teamEnemy, rndPositionsEnemy);

  return positionedTeamA.concat(positionedTeamB);
}

export function definePositionedCharacter(team, positions) {
  // its okay, when team <= positions number. but the reverse situation is impossible
  if (team.size > positions.size) throw new Error('the size of the team is not equal to the number of available positions');
  const arr = [];

  for (let i = 0; i < team.length; i++) {
    arr.push(new PositionedCharacter(team[i], positions[i]));
  }
  return arr;
}

export function selectRndPositionFromArray(positions, posTotalNumber) {
  const set = new Set();
  while (true) {
    const random = positions[Math.floor(Math.random() * positions.length)];
    if (!set.has(random)) set.add(random);
    if (set.size === posTotalNumber) break;
  }
  return Array.from(set);
}

export function definePlayerPossiblePositions(boardSize) {
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

export function defineEnemyPossiblePositions(boardSize) {
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

export function defineMovementArea(positionedCharacter, boardSize) {
  const arr = [];

  const currentPosition = positionedCharacter.position;
  const steps = positionedCharacter.character.movementDistance;
  const lineLength = Math.sqrt(boardSize);

  // go down
  let candidate = 0;
  for (let step = 1; step <= steps; step++) {
    candidate = currentPosition - (step * lineLength);
    if (candidate > 0) {
      let left = candidate - steps;
      const right = candidate + steps;
      while (left <= right) {
        arr.push(left);
        left++;
      }
    }
  }

  // center line
  let left = currentPosition - steps;
  let right = currentPosition + steps;
  while (left <= right) {
    arr.push(left);
    left++;
  }

  // go up
  candidate = 0;
  for (let step = 1; step <= steps; step++) {
    candidate = currentPosition + (step * lineLength);
    if (candidate >= 0 && candidate <= boardSize) {
      left = candidate - steps;
      right = candidate + steps;
      while (left <= right) {
        arr.push(left);
        left++;
      }
    }
  }
  arr.sort((a, b) => a - b);
  return arr;
}
