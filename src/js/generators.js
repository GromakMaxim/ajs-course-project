/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

import Team from './characters/Team';

export function characterGenerator(allowedTypes, maxLevel) {
  if (allowedTypes.length === 0) throw new Error('types array is missing');
  const rndType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const rndTypeViaString = rndType.name.toString()
    .toLowerCase();
  const rndLevel = Math.floor((Math.random() * maxLevel) + 1);
  // eslint-disable-next-line new-cap
  return new rndType(rndLevel, rndTypeViaString);
}

export function generateTeam(allowedTypes, maxLevel, characterCount, boardSize, owner) {
  const rndTeamMembers = [];
  for (let i = 0; i < characterCount; i++) {
    const generator = characterGenerator(allowedTypes, maxLevel);
    rndTeamMembers.push(generator);
  }
  return new Team(rndTeamMembers, owner, boardSize);
}
