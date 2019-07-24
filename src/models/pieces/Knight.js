import Piece from '../Piece';
import { checkPosition } from '../checkPosition';

import { KNIGHT, FRIENDLY } from '../constants';

export default class Knight extends Piece {
  constructor(side, x, y, uid) {
    super(side, x, y, uid);
    this.type = KNIGHT;
  }

  /**
   * Returns an array of available positions to move to,
   * including possible captures;
   * empty if there is none
   * 
   * @param {object} game The current game state.
   * @return {array} available positions to move to.
   */
  availableMoves(game) {
    const positions = [],
    { x, y } = this.position,
    targets = [
      { x: x + 1, y: y + 2 },
      { x: x + 2, y: y + 1 },
      { x: x + 1, y: y - 2 },
      { x: x + 2, y: y - 1 },
      { x: x - 1, y: y + 2 },
      { x: x - 2, y: y + 1 },
      { x: x - 1, y: y - 2 },
      { x: x - 2, y: y - 1 },
    ]

    targets.forEach(target => {
      // make sure target position's in bound (0 - 7)
      if (target.x < 0 || target.x >= 8 || target.y < 0 || target.y >= 8) return;
      // make sure no friendly piece in target position
      if (checkPosition(target.x, target.y, this.side, game) === FRIENDLY) return;
      positions.push(target);
    })

    return positions;
  }
}