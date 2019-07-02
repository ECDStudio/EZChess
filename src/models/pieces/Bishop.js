import Piece from '../Piece';
import { checkPosition } from '../checkPosition';

import { BISHOP, FRIENDLY, ENEMY } from '../constants';

export default class Bishop extends Piece {
  constructor(side, x, y) {
    super(side, x, y);
    this.class = BISHOP;
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
    const { x, y } = this.position;

    // call checkPosition to determine if there is a friendly or enemy piece at that position
    const check = (checkX, checkY) => (
      checkPosition(checkX, checkY, this.side, game)
    );
    const positions = [];

    let rightUp = true,
      rightDown = true,
      leftUp = true,
      leftDown = true;

    /**
     * Loop through all possible positions in 4 directions;
     * stops AT position with a friendly piece,
     * or AFTER position with an enenmy piece(capture);
     * the for loop makes sure the position is in bound of the chessboard(0-7),
     * and is not the position the piece is currently standing
     */
    for (let i = x + 1; i < 8; i += 1) {
      const targetY = y + i - x;
      const targetCheck = check(i, targetY);

      if (!rightUp || targetY < 0 || targetY >= 8) continue;

      if (targetCheck === FRIENDLY || targetCheck === ENEMY || targetY === 7)
        rightUp = false;

      if (targetCheck !== FRIENDLY)
        positions.push({ x: i, y: targetY });
    }

    for (let i = x + 1; i < 8; i += 1) {
      const targetY = y - i + x;
      const targetCheck = check(i, targetY);

      if (!rightDown || targetY < 0 || targetY >= 8) continue;

      if (targetCheck === FRIENDLY || targetCheck === ENEMY || targetY === 0)
        rightDown = false;

      if (targetCheck !== FRIENDLY)
        positions.push({ x: i, y: targetY });
    }

    for (let i = x - 1; i >= 0; i -= 1) {
      const targetY = y + i - x;
      const targetCheck = check(i, targetY);

      if (!leftUp || targetY < 0 || targetY >= 8) continue;

      if (targetCheck === FRIENDLY || targetCheck === ENEMY || targetY === 7)
        leftUp = false;

      if (targetCheck !== FRIENDLY)
        positions.push({ x: i, y: targetY });
    }

    for (let i = x - 1; i >= 0; i -= 1) {
      const targetY = y - i + x;
      const targetCheck = check(i, targetY);

      if (!leftDown || targetY < 0 || targetY >= 8) continue;

      if (targetCheck === FRIENDLY || targetCheck === ENEMY || targetY === 0)
        leftDown = false;

      if (targetCheck !== FRIENDLY)
        positions.push({ x: i, y: targetY });
    }

    return positions;
  }
}