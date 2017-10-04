import Piece from '../Piece';
import { chess } from '../../app';
import { checkPosition } from '../../checkPosition';

export default class Pawn extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'pawn';
		this.enPassant = false;
		this.enPassTurn = 0;
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves() {
		// call checkPosition() to determine if there is a friendly or enemy piece at that position
		const check = (x, y) => {
			return checkPosition(x, y, this.side);
		};

		// dynamic x direction
		const xDir = (x) => {
			return this.side === 'white' ? this.position.x + x : this.position.x - x;
		}

		let positions = [];
		
		// first step can take 2 steps, otherwise 1
		if (this.step === 0) {
			if (check(xDir(2), this.position.y) !== 'friendly' &&
				check(xDir(2), this.position.y) !== 'enemy') {
				positions.push([xDir(2), this.position.y, false]);
			}
		}
		if (check(xDir(1), this.position.y) !== 'friendly' &&
			check(xDir(1), this.position.y) !== 'enemy') {
			positions.push([xDir(1), this.position.y, false]);
		}
		// capture diagonally
		if (check(xDir(1), this.position.y + 1) === 'enemy') {
			positions.push([xDir(1), this.position.y + 1, false]);
		}
		if (check(xDir(1), this.position.y - 1) === 'enemy') {
			positions.push([xDir(1), this.position.y - 1, false]);
		}
		// if a pawn besides has a true 'enPassant' property from the turn before, move diagonally
		for (let player in chess) {
			for (let piece in chess[player].pieces) {
				let enemyPawn = chess[player].pieces[piece];
				if (enemyPawn.enPassant === true && enemyPawn.enPassTurn === chess.turn &&
					enemyPawn.position.x === this.position.x) {
					if (enemyPawn.position.y === this.position.y + 1) {
						positions.push([xDir(1), this.position.y + 1, true]);
					}
					if (enemyPawn.position.y === this.position.y - 1) {
						positions.push([xDir(1), this.position.y - 1, true]);
					}
				}
			}
		}

		return positions;
	}

	// 3rd boolean parameter indicates if this is an en passant move
	toPosition(pX, pY, enPassMove) {
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
		setTimeout(() => {
			// indicate this move makes it able to be captured by en passant the next turn
			if (this.step === 1 && pX === 3 && this.side === 'white' ||
				this.step === 1 && pX === 4 && this.side === 'black') {
				for (let player in chess) {
					if (chess[player].side !== this.side) {
						for (let piece in chess[player].pieces) {
							if (chess[player].pieces[piece].class === 'pawn') {
								let enemyPawn = chess[player].pieces[piece];
								if (enemyPawn.position.x === pX &&
									(enemyPawn.position.y === pY + 1 || enemyPawn.position.y === pY - 1)) {
									this.enPassant = true;
									this.enPassTurn = chess.turn;
								}
							}
						}
					}
				}
			}
		}, 1)
		// This is for an offensive en passant move that captures an enemy pawn
		if (enPassMove === true) {
			for (let player in chess) {
				if (chess[player].side !== this.side) {
					for (let piece in chess[player].pieces) {
						let enemyPawn = chess[player].pieces[piece];
						if (enemyPawn.enPassant === true && enemyPawn.enPassTurn === chess.turn &&
							enemyPawn.position.y === pY &&
							(enemyPawn.position.x === pX + 1 || enemyPawn.position.x === pX - 1)) {
							enemyPawn.position = { x: -1, y: -1 };
						}
					}
				}
			}
		}
		return [this.position.x, this.position.y];
	}
}