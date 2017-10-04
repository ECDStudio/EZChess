import Piece from '../Piece';
import { chess } from '../../app';
import { checkPosition } from '../../checkPosition';

export default class King extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'king';
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves() {
		// call checkPosition() to determine if there is a friendly or enemy piece at that position
		const check = (x, y) => {
			return checkPosition(x, y, this.side);
		},
		toBeChecked = [
			[this.position.x + 1, this.position.y],
			[this.position.x - 1, this.position.y],
			[this.position.x + 1, this.position.y + 1],
			[this.position.x + 1, this.position.y - 1],
			[this.position.x - 1, this.position.y + 1],
			[this.position.x - 1, this.position.y - 1],
			[this.position.x, this.position.y + 1],
			[this.position.x, this.position.y - 1],
		];
		
		let positions = [];
		
		for (let pos in toBeChecked) {
			if (toBeChecked[pos][0] >= 0 && toBeChecked[pos][0] < 8 &&
				toBeChecked[pos][1] >= 0 && toBeChecked[pos][1] < 8) {
				if (check(...toBeChecked[pos]) !== 'friendly') {
					positions.push(toBeChecked[pos]);
				}
			}
		};
		
		// King side castle
		for (let player in chess.players) {
			let pathEmpty = true;
			if (chess.players[player].side !== this.side) {
				for (let pos in chess.players[player].pieces.queen.availableMoves()) {
					let match = chess.players[player].pieces.queen.availableMoves()[pos];
					if (match[0] === this.position.x &&
						(match[1] === 1 || match[1] === 2 || match[1] === 3)) {
						return;
					}
				}
			}
			if (chess.players[player].side === this.side) {
				for (let piece in chess.players[player].pieces) {
					let blockingPiece = chess.players[player].pieces[piece];
					if (blockingPiece.position.x === this.position.x &&
						(blockingPiece.position.y === 1 || blockingPiece.position.y === 2)) {
						pathEmpty = false;
					}
				}
				if (pathEmpty === true && chess.players[player].pieces.rook1.step === 0 && this.step === 0) {
					positions.push([this.position.x, 1, 'king-castle']);
				}
			}
		}
		
		// Queen side castle
		for (let player in chess.players) {
			let pathEmpty = true;
			if (chess.players[player].side === this.side) {
				for (let piece in chess.players[player].pieces) {
					let blockingPiece = chess.players[player].pieces[piece];
					if (blockingPiece.position.x === this.position.x &&
						(blockingPiece.position.y === 4 ||
						blockingPiece.position.y === 5 ||
						blockingPiece.position.y === 6)) {
						pathEmpty = false;
					}
				}
				if (pathEmpty === true && chess.players[player].pieces.rook2.step === 0 && this.step === 0) {
					positions.push([this.position.x, 5, 'queen-castle']);
				}
			}
		}

		return positions;
	}
	
	toPosition(pX, pY, castle) {
		if (typeof pX === 'number' && typeof pY === 'number') {
			if (pX >= 0 && pX < 8 && pY >= 0 && pY < 8) {
				this.position.x = pX;
				this.position.y = pY;
				this.step += 1;
				
				// capture enemy piece in target Position
				for (let player in chess.players) {
					if (chess.players[player].side !== this.side) {
						for (let piece in chess.players[player].pieces) {
							if (chess.players[player].pieces[piece].position.x === pX &&
								chess.players[player].pieces[piece].position.y === pY) {
								chess.players[player].pieces[piece].position = {x: -1, y: -1};
							}
						}
					}
				}
			} else if (pX === -1 && pY === -1) {
				// [-1, -1] position is being captured
				this.position.x = pX;
				this.position.y = pY;
			}
		}
		// King side castle, rook1 needs to move
		if (castle === 'king-castle') {
			for (let player in chess.players) {
				if (chess.players[player].side === this.side) {
					chess.players[player].pieces.rook1.toPosition(this.position.x, 2);
				}
			}
		}
		// Queen side castle, rook2 needs to move
		if (castle === 'queen-castle') {
			for (let player in chess.players) {
				if (chess.players[player].side === this.side) {
					chess.players[player].pieces.rook2.toPosition(this.position.x, 4);
				}
			}
		}
		return [this.position.x, this.position.y];
	}
}