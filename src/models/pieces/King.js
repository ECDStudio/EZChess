import Piece from '../Piece';
import { checkPosition } from '../checkPosition';

import { WHITE, KING, PAWN, KING_CASTLE, QUEEN_CASTLE, FRIENDLY } from '../constants';

export default class King extends Piece {
  constructor(side, x, y, uid) {
    super(side, x, y, uid);
    this.type = KING;
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
    // call checkPosition to determine if there is a friendly or enemy piece at that position
    const check = position => (
      checkPosition(position.x, position.y, this.side, game)
    ),
    safeCheck = () => {
      // Make sure won't end up in check
      for (let player of Object.values(game.players)) {
        if (player.side === this.side) continue;

        let targets = [];

        for (let piece of Object.values(player.pieces)) {
          const { x, y } = piece.position;

          switch (piece.type) {
            case KING:
            targets.push(
              { x: x + 1, y: y },
              { x: x - 1, y: y },
              { x: x + 1, y: y + 1 },
              { x: x + 1, y: y - 1 },
              { x: x - 1, y: y + 1 },
              { x: x - 1, y: y - 1 },
              { x: x, y: y + 1 },
              { x: x, y: y - 1 }
            );
            break;

            case PAWN:
            const dynamicX = player.side === WHITE ? x + 1 : x - 1;
            targets.push(
              { x: dynamicX, y: y + 1 },
              { x: dynamicX, y: y - 1 }
            );
            break;

            default:
            // Make sure to detect all positions,
            // including those the King is currently blocking
            const currentX = this.position.x;
            const currenty = this.position.y;

            this.position = { x: -1, y: -1 };
            const pieceMoves = piece.availableMoves(game);
            for (let move of pieceMoves)
              if (move) targets.push(move);

            this.position = { x: currentX, y: currenty };
            break;
          }
        }

        return targets;
      }
    },
    { x, y } = this.position,
    possiblePositions = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x: x + 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y - 1 },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ],
    finalPositions = [];

    for (let position of possiblePositions) {
      if (position.x < 0 || position.x >= 8) continue;
      if (position.y < 0 || position.y >= 8) continue;
      if (check(position) === FRIENDLY) continue;

      let inCheck = false;

      for (let safePos of safeCheck()) {
        if (safePos.x === position.x &&
          safePos.y === position.y)
          inCheck = true;
      }

      if (inCheck) continue;
      else finalPositions.push(position);
    }
    
    // King side castle
    for (let player of Object.values(game.players)) {
      if (player.side !== this.side) continue;

      let pathEmpty = true;
      for (let position of safeCheck()) {
        if (position.x === this.position.x &&
          (position.y === 1 || position.y === 2 || position.y === 3))
          pathEmpty = false;
      }
      for (let piece of Object.values(player.pieces)) {
        if (piece.position.x === this.position.x &&
          (piece.position.y === 1 || piece.position.y === 2))
          pathEmpty = false;
      }

      if (pathEmpty && player.pieces.rook1.step === 0 && this.step === 0)
        finalPositions.push({ x: this.position.x, y: 1, castle: KING_CASTLE });
    }
    
    // Queen side castle
    for (let player of Object.values(game.players)) {
      if (player.side !== this.side) continue;

      let pathEmpty = true;
      for (let position of safeCheck()) {
        if (position.x === this.position.x &&
          (position.y === 3 || position.y === 4 || position.y === 5))
          pathEmpty = false;
      }
      for (let piece of Object.values(player.pieces)) {
        if (piece.position.x === this.position.x &&
          (piece.position.y === 4 || piece.position.y === 5 || piece.position.y === 6))
          pathEmpty = false;
      }

      if (pathEmpty && player.pieces.rook2.step === 0 && this.step === 0)
        finalPositions.push({ x: this.position.x, y: 5, castle: QUEEN_CASTLE });
    }

    return finalPositions;
  }
  
  toPosition = (game, position) => {
    const { x, y, castle } = position;

    if (typeof x !== 'number' || typeof y !== 'number')
      return this.position;

    // validate target position
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      this.position = { x, y };
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
  
    // King side castle, rook1 needs to move
    if (castle && castle === KING_CASTLE) {
      for (let player of Object.values(game.players)) {
        if (player.side !== this.side) continue;
        player.pieces.rook1.toPosition(game, { x: this.position.x, y: 2 });
      }
    }

    // Queen side castle, rook2 needs to move
    if (castle && castle === QUEEN_CASTLE) {
      for (let player of Object.values(game.players)) {
        if (player.side !== this.side) continue;
        player.pieces.rook2.toPosition(game, { x: this.position.x, y: 4 });
      }
    }

    return this.position;
  }
}