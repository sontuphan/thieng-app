import sha256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';

function getIdFromSeed(seed) {
  return sha256(String(seed)).toString(encHex);
}

function getRandId() {
  const seed = Math.random();
  return getIdFromSeed(seed);
}

export { getIdFromSeed, getRandId }