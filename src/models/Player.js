import King from './pieces/King';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Pawn from './pieces/Pawn';

import { WHITE, KING, QUEEN, ROOK, KNIGHT, BISHOP, PAWN } from './constants';

export default class Player {
  constructor(side) {
    this.side = side;
    this.isTurn = side === WHITE ? true : false;
    this.pieces = {
      king: new King(side, side === WHITE ? 0 : 7, 3, `${side}-${KING}`),
      queen: new Queen(side, side === WHITE ? 0 : 7, 4, `${side}-${QUEEN}`),
      rook1: new Rook(side, side === WHITE ? 0 : 7, 0, `${side}-${ROOK}-1`),
      rook2: new Rook(side, side === WHITE ? 0 : 7, 7, `${side}-${ROOK}-2`),
      knight1: new Knight(side, side === WHITE ? 0 : 7, 1, `${side}-${KNIGHT}-1`),
      knight2: new Knight(side, side === WHITE ? 0 : 7, 6, `${side}-${KNIGHT}-2`),
      bishop1: new Bishop(side, side === WHITE ? 0 : 7, 2, `${side}-${BISHOP}-1`),
      bishop2: new Bishop(side, side === WHITE ? 0 : 7, 5, `${side}-${BISHOP}-2`),
      pawn1: this.setupPawn(side, 0, `${side}-${PAWN}-1`),
      pawn2: this.setupPawn(side, 1, `${side}-${PAWN}-2`),
      pawn3: this.setupPawn(side, 2, `${side}-${PAWN}-3`),
      pawn4: this.setupPawn(side, 3, `${side}-${PAWN}-4`),
      pawn5: this.setupPawn(side, 4, `${side}-${PAWN}-5`),
      pawn6: this.setupPawn(side, 5, `${side}-${PAWN}-6`),
      pawn7: this.setupPawn(side, 6, `${side}-${PAWN}-7`),
      pawn8: this.setupPawn(side, 7, `${side}-${PAWN}-8`),
    }
  }

  setupPawn = (side, y, uid) => {
    return new Pawn(side, side === WHITE ? 1 : 6, y, uid);
  }

  update = data => {
    this.isTurn = data.isTurn;

    for (let q in this.pieces) {
      const target = data.pieces[q];

      this.pieces[q].update(data.pieces[q]);

      // Watch for pawn promotion
      if ((this.pieces[q] instanceof Pawn || this.pieces[q].type === PAWN) &&
      (target.promotion || target.type === QUEEN ))
        this.pieces[q] = new Queen(this.side, target.position.x, target.position.y);
    }
  }
}