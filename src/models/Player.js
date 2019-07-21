import King from './pieces/King';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Pawn from './pieces/Pawn';

import { WHITE, QUEEN, PAWN } from './constants';

export default class Player {
  constructor(side) {
    this.side = side;
    this.isTurn = side === WHITE ? true : false;
    this.pieces = {
      king: new King(side, side === WHITE ? 0 : 7, 3),
      queen: new Queen(side, side === WHITE ? 0 : 7, 4),
      rook1: new Rook(side, side === WHITE ? 0 : 7, 0),
      rook2: new Rook(side, side === WHITE ? 0 : 7, 7),
      knight1: new Knight(side, side === WHITE ? 0 : 7, 1),
      knight2: new Knight(side, side === WHITE ? 0 : 7, 6),
      bishop1: new Bishop(side, side === WHITE ? 0 : 7, 2),
      bishop2: new Bishop(side, side === WHITE ? 0 : 7, 5),
      pawn1: this.setupPawn(side, 0),
      pawn2: this.setupPawn(side, 1),
      pawn3: this.setupPawn(side, 2),
      pawn4: this.setupPawn(side, 3),
      pawn5: this.setupPawn(side, 4),
      pawn6: this.setupPawn(side, 5),
      pawn7: this.setupPawn(side, 6),
      pawn8: this.setupPawn(side, 7),
    }
  }

  setupPawn = (side, y) => {
    return new Pawn(side, side === WHITE ? 1 : 6, y);
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