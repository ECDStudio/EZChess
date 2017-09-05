import Piece from './Piece';

export default class Player {
	constructor(side) {
		this.isTurn = false;
		this.pieces = {
			king: new Piece(side === 'white' ? 1 : 8, 4),
			queen: new Piece(side === 'white' ? 1 : 8, 5),
			rook1: new Piece(side === 'white' ? 1 : 8, 1),
			rook2: new Piece(side === 'white' ? 1 : 8, 8),
			knight1: new Piece(side === 'white' ? 1 : 8, 2),
			knight2: new Piece(side === 'white' ? 1 : 8, 7),
			bishop1: new Piece(side === 'white' ? 1 : 8, 3),
			bishop2: new Piece(side === 'white' ? 1 : 8, 6),
			pawn1: new Piece(side === 'white' ? 2 : 7, 1),
			pawn2: new Piece(side === 'white' ? 2 : 7, 2),
			pawn3: new Piece(side === 'white' ? 2 : 7, 3),
			pawn4: new Piece(side === 'white' ? 2 : 7, 4),
			pawn5: new Piece(side === 'white' ? 2 : 7, 5),
			pawn6: new Piece(side === 'white' ? 2 : 7, 6),
			pawn7: new Piece(side === 'white' ? 2 : 7, 7),
			pawn8: new Piece(side === 'white' ? 2 : 7, 8),
		}
	}
}