import Piece from './Piece';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';

export default class Player {
	constructor(side) {
		this.side = side;
		this.isTurn = false;
		this.pieces = {
			king: new Piece(side, side === 'white' ? 0 : 7, 3),
			queen: new Piece(side, side === 'white' ? 0 : 7, 4),
			rook1: new Rook(side, side === 'white' ? 0 : 7, 0),
			rook2: new Rook(side, side === 'white' ? 0 : 7, 7),
			knight1: new Knight(side, side === 'white' ? 0 : 7, 1),
			knight2: new Knight(side, side === 'white' ? 0 : 7, 6),
			bishop1: new Bishop(side, side === 'white' ? 0 : 7, 2),
			bishop2: new Bishop(side, side === 'white' ? 0 : 7, 5),
			pawn1: new Piece(side, side === 'white' ? 1 : 6, 0),
			pawn2: new Piece(side, side === 'white' ? 1 : 6, 1),
			pawn3: new Piece(side, side === 'white' ? 1 : 6, 2),
			pawn4: new Piece(side, side === 'white' ? 1 : 6, 3),
			pawn5: new Piece(side, side === 'white' ? 1 : 6, 4),
			pawn6: new Piece(side, side === 'white' ? 1 : 6, 5),
			pawn7: new Piece(side, side === 'white' ? 1 : 6, 6),
			pawn8: new Piece(side, side === 'white' ? 1 : 6, 7),
		}
	}
}