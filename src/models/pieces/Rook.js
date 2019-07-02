import Piece from '../Piece';
import { checkPosition } from '../checkPosition';

import { ROOK, FRIENDLY, ENEMY } from '../constants';

export default class Rook extends Piece {
  constructor(side, x, y) {
    super(side, x, y);
    this.class = ROOK;
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
    // dynamic-static x-y positions to call checkPosition(),
    // used to determine if there is a friendly or enemy piece at that position
    const checkX = target => (
      checkPosition(target, y, this.side, game)
    );
    const checkY = target => (
      checkPosition(x, target, this.side, game)
    );
    const positions = [];

    let xUp = true,
      xDown = true,
      yUp = true,
      yDown = true;

    /**
     * Loop through all possible positions in 4 directions;
     * stops AT position with a friendly piece,
     * or AFTER position with an enenmy piece(capture);
     * the for loop makes sure the position is in bound of the chessboard(0-7),
     * and is not the position the piece is currently standing
     */
    for (let i = x + 1; i < 8; i += 1) {
      if (!xUp) continue;

      if (checkX(i) === FRIENDLY || checkX(i) === ENEMY)
        xUp = false;

      if (checkX(i) !== FRIENDLY)
      positions.push({ x: i, y });
    }

    for (let i = x - 1; i >= 0; i -= 1) {
      if (!xDown) continue;

      if (checkX(i) === FRIENDLY || checkX(i) === ENEMY)
        xDown = false;

      if (checkX(i) !== FRIENDLY)
        positions.push({ x: i, y });
    }

    for (let i = y + 1; i < 8; i += 1) {
      if (!yUp) continue;

      if (checkY(i) === FRIENDLY || checkY(i) === ENEMY)
        yUp = false;

      if (checkY(i) !== FRIENDLY)
        positions.push({ x, y: i });
    }

    for (let i = y - 1; i >= 0; i -= 1) {
      if (!yDown) continue;

      if (checkY(i) === FRIENDLY || checkY(i) === ENEMY)
        yDown = false;

      if (checkY(i) !== FRIENDLY)
        positions.push({ x, y: i });
    }

    return positions;
  }
}