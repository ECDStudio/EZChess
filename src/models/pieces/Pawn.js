import Piece from '../Piece';
import { checkPosition } from '../checkPosition';

import { PAWN, WHITE, BLACK } from '../constants';

export default class Pawn extends Piece {
  constructor(side, x, y, uid) {
    super(side, x, y, uid);
    this.type = PAWN;
    this.enPassant = false;
    this.enPassTurn = 0;
    this.promotion = false;
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

    // Call checkPosition to determine if there is a friendly or enemy piece at that position
    const check = (checkX, checkY) => (
      checkPosition(checkX, checkY, this.side, game)
    );

    // Dynamic direction of X target
    const dynamicX = targetX => (
      this.side === WHITE ? x + targetX : x - targetX
    );

    const positions = [];
    
    // First step can take 2 steps
    if (this.step === 0 &&
      check(dynamicX(1), y) !== 'friendly' &&
      check(dynamicX(1), y) !== 'enemy' &&
      check(dynamicX(2), y) !== 'friendly' &&
      check(dynamicX(2), y) !== 'enemy')
      positions.push({ x: dynamicX(2), y: y });

    // otherwise 1 step only
    if (check(dynamicX(1), y) !== 'friendly' &&
      check(dynamicX(1), y) !== 'enemy')
      positions.push({ x: dynamicX(1), y: y });

    // Capture diagonally
    if (check(dynamicX(1), y + 1) === 'enemy')
      positions.push({ x: dynamicX(1), y: y + 1 });
    if (check(dynamicX(1), y - 1) === 'enemy')
      positions.push({ x: dynamicX(1), y: y - 1 });

    // Move diagonally if a pawn besides has a 'enPassant' property from the previous turn
    for (let player of Object.values(game.players)) {
      for (let piece of Object.values(player.pieces)) {
        const pp = piece.position;

        if (!piece.enPassant) continue;
        if (piece.enPassTurn !== game.turn) continue;
        if (pp.x !== x) continue;
        if (pp.y !== y + 1 && pp.y !== y - 1) continue;

        positions.push({
          x: dynamicX(1),
          y: pp.y,
          enPassMove: true,
        });
      }
    }

    return positions;
  }

  toPosition = (game, position) => {
    const { x, y, enPassMove } = position;

    if (typeof x !== 'number' || typeof y !== 'number')
      return this.position;

    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      this.position = { x, y, enPassMove };
      this.step += 1;
      
      // Capture enemy piece in target Position
      for (let player of Object.values(game.players)) {
        if (player.side === this.side) continue; // not enemy

        for (let piece of Object.values(player.pieces)) {
          if (piece.position.x !== x || piece.position.y !== y) continue;

          piece.position = { x: -1, y: -1 };
        }
      }
    }
    
    // [-1, -1] position is being captured
    if (x === -1 && y === -1)
      this.position = { x, y };

    // Indicate this move makes it able to be captured by en passant the next turn
    if (
      (this.step === 1 && x === 3 && this.side === WHITE) ||
      (this.step === 1 && x === 4 && this.side === BLACK)
    ) {
      for (let player of Object.values(game.players)) {
        if (player.side === this.side) continue; // not enemy

        for (let piece of Object.values(player.pieces)) {
          if (piece.type !== PAWN) continue; // not pawn
          if (piece.position.x !== x) continue; // x-position not matched
          if (piece.position.y !== y + 1 && piece.position.y !== y - 1) continue; // y-position not matched

          this.enPassant = true;
          this.enPassTurn = game.turn + 1;
        }
      }
    }

    // This is for an offensive en passant move that captures an enemy pawn
    if (enPassMove) {
      for (let player of Object.values(game.players)) {
        if (player.side === this.side) continue; // not enemy

        for (let piece of Object.values(player.pieces)) {
          if (!piece.enPassant || piece.enPassTurn !== game.turn) continue; // not an en passant turn
          if (piece.position.y !== y) continue; // y-position not matched
          if (piece.position.x !== x + 1 && piece.position.x !== x - 1) continue; // y-position not matched

          piece.position = { x: -1, y: -1 };
        }
      }
    }

    if (
      (x === 7 && this.side === WHITE) ||
      (x === 0 && this.side === BLACK)
    ) this.promotion = true;

    return this.position;
  }
}