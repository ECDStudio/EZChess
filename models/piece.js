class Piece {
	constructor(pX, pY) {
		this.position = {
			x: pX,
			y: pY
		};
		this.step = 0;
	}
	
	toPosition(pX, pY) {
		this.position.x = pX;
		this.position.y = pY;
		this.step += 1;
	}
}

class Player {
	constructor(side) {
		this.king = new Piece(side === 'white' ? 1 : 8, 4);
		this.queen = new Piece(side === 'white' ? 1 : 8, 5);
		this.rook1 = new Piece(side === 'white' ? 1 : 8, 1);
		this.rook2 = new Piece(side === 'white' ? 1 : 8, 8);
		this.knight1 = new Piece(side === 'white' ? 1 : 8, 2);
		this.knight2 = new Piece(side === 'white' ? 1 : 8, 7);
		this.bishop1 = new Piece(side === 'white' ? 1 : 8, 3);
		this.bishop2 = new Piece(side === 'white' ? 1 : 8, 6);
		this.pawn1 = new Piece(side === 'white' ? 2 : 7, 1);
		this.pawn2 = new Piece(side === 'white' ? 2 : 7, 2);
		this.pawn3 = new Piece(side === 'white' ? 2 : 7, 3);
		this.pawn4 = new Piece(side === 'white' ? 2 : 7, 4);
		this.pawn5 = new Piece(side === 'white' ? 2 : 7, 5);
		this.pawn6 = new Piece(side === 'white' ? 2 : 7, 6);
		this.pawn7 = new Piece(side === 'white' ? 2 : 7, 7);
		this.pawn8 = new Piece(side === 'white' ? 2 : 7, 8);
	}
}

let player1 = new Player('white');
let player2 = new Player('black');