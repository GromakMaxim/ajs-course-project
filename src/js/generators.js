/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
import PositionedCharacter from './PositionedCharacter';

export function characterGenerator(allowedTypes, maxLevel) {
  if (allowedTypes.length === 0) throw new Error('types array is missing');
  const rndType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const rndTypeViaString = rndType.name.toString()
    .toLowerCase();
  const rndLevel = Math.floor((Math.random() * maxLevel) + 1);
  // eslint-disable-next-line new-cap
  return new rndType(rndLevel, rndTypeViaString);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const rndTeamMembers = [];
  for (let i = 0; i < characterCount; i++) {
    const generator = characterGenerator(allowedTypes, maxLevel);
    rndTeamMembers.push(generator.next().value);
  }
  return rndTeamMembers;
}

export function getTeamWithPosition(playerTeam, npcTeam) {
  const charAtPos = [];
  const possiblePositionPlayer = [];
  let board = 56;
  for (let i = 0; i <= board; i++) {
    possiblePositionPlayer.push(i);
    i += 7;
  }
  board = 57;
  for (let i = 1; i <= board; i++) {
    possiblePositionPlayer.push(i);
    i += 7;
  }
  board = 62;
  const possiblePositionNPC = [];
  for (let i = 6; i <= board; i++) {
    possiblePositionNPC.push(i);
    i += 7;
  }
  board = 63;
  for (let i = 7; i <= board; i++) {
    possiblePositionNPC.push(i);
    i += 7;
  }

  for (const char of playerTeam) {
    charAtPos.push(new PositionedCharacter(char, possiblePositionPlayer[Math.floor(Math.random() * possiblePositionPlayer.length)]));
  }
  for (const char of npcTeam) {
    charAtPos.push(new PositionedCharacter(char, possiblePositionNPC[Math.floor(Math.random() * possiblePositionPlayer.length)]));
  }
  return charAtPos;
}
