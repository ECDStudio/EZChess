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
		
		// king side castle
		for (let player in chess) {
			if (chess[player].side === this.side) {
				let pathEmpty = true;
				for (let piece in chess[player].pieces) {
					let blockingPiece = chess[player].pieces[piece];
					if (blockingPiece.position.x === this.position.x &&
						(blockingPiece.position.y === 1 || blockingPiece.position.y === 2)) {
						pathEmpty = false;
					}
				}
				if (pathEmpty === true && chess[player].pieces.rook1.step === 0 && this.step === 0) {
					positions.push([this.position.x, 1, 'king-castle']);
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
				for (let player in chess) {
					if (chess[player].side !== this.side) {
						for (let piece in chess[player].pieces) {
							if (chess[player].pieces[piece].position.x === pX &&
								chess[player].pieces[piece].position.y === pY) {
								chess[player].pieces[piece].position = {x: -1, y: -1};
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
			for (let player in chess) {
				if (chess[player].side === this.side) {
					chess[player].pieces.rook1.toPosition(this.position.x, 2);
				}
			}
		}
		return [this.position.x, this.position.y];
	}
}