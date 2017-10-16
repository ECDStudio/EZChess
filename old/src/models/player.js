import King from './pieces/King';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Pawn from './pieces/Pawn';

export default class Player {
	constructor(side) {
		this.side = side;
		this.isTurn = side === 'white' ? true : false;
		this.pieces = {
			king: new King(side, side === 'white' ? 0 : 7, 3),
			queen: new Queen(side, side === 'white' ? 0 : 7, 4),
			rook1: new Rook(side, side === 'white' ? 0 : 7, 0),
			rook2: new Rook(side, side === 'white' ? 0 : 7, 7),
			knight1: new Knight(side, side === 'white' ? 0 : 7, 1),
			knight2: new Knight(side, side === 'white' ? 0 : 7, 6),
			bishop1: new Bishop(side, side === 'white' ? 0 : 7, 2),
			bishop2: new Bishop(side, side === 'white' ? 0 : 7, 5),
			pawn1: new Pawn(side, side === 'white' ? 1 : 6, 0),
			pawn2: new Pawn(side, side === 'white' ? 1 : 6, 1),
			pawn3: new Pawn(side, side === 'white' ? 1 : 6, 2),
			pawn4: new Pawn(side, side === 'white' ? 1 : 6, 3),
			pawn5: new Pawn(side, side === 'white' ? 1 : 6, 4),
			pawn6: new Pawn(side, side === 'white' ? 1 : 6, 5),
			pawn7: new Pawn(side, side === 'white' ? 1 : 6, 6),
			pawn8: new Pawn(side, side === 'white' ? 1 : 6, 7),
		}
	}
}