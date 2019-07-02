import { FRIENDLY, ENEMY } from './constants';

/**
 * Return either 'friendly' or 'enemy' base on if there is a piece currently
 * exists on target location
 * 
 * @param {number} x The x coordinate of target location.
 * @param {number} y The y coordinate of target location.
 * @param {string} side The side from which this function is invoked.
 * @param {object} game The current game state.
 * @return {string} The side of the piece on target location if there's one.
 */

export const checkPosition = (x, y, side, game) => {
  for (let player of Object.values(game.players)) {
    for (let piece of Object.values(player.pieces)) {
      if (piece.position.x !== x || piece.position.y !== y) continue;

      if (player.side === side)
        return FRIENDLY; // if there is piece from the same side
      else return ENEMY; // if there is piece from the other side
    }
  }
}