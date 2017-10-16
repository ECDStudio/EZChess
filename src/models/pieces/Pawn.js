import Piece from '../Piece';
import { checkPosition } from '../checkPosition';

export default class Pawn extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'pawn';
		this.enPassant = false;
		this.enPassTurn = 0;
	}

	// Returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves(game) {
		// Call checkPosition() to determine if there is a friendly or enemy piece at that position
		const check = (x, y) => {
			return checkPosition(x, y, this.side, game);
		};

		// Dynamic x direction
		const xDir = (x) => {
			return this.side === 'white' ? this.position.x + x : this.position.x - x;
		}

		let positions = [];
		
		// First step can take 2 steps, otherwise 1
		if (this.step === 0) {
			if (check(xDir(1), this.position.y) !== 'friendly' &&
				check(xDir(1), this.position.y) !== 'enemy' &&
				check(xDir(2), this.position.y) !== 'friendly' &&
				check(xDir(2), this.position.y) !== 'enemy') {
				positions.push([xDir(2), this.position.y, false]);
			}
		}
		if (check(xDir(1), this.position.y) !== 'friendly' &&
			check(xDir(1), this.position.y) !== 'enemy') {
			positions.push([xDir(1), this.position.y, false]);
		}
		// Capture diagonally
		if (check(xDir(1), this.position.y + 1) === 'enemy') {
			positions.push([xDir(1), this.position.y + 1, false]);
		}
		if (check(xDir(1), this.position.y - 1) === 'enemy') {
			positions.push([xDir(1), this.position.y - 1, false]);
		}
		// If a pawn besides has a true 'enPassant' property from the turn before, move diagonally
		for (let player in game.players) {
			for (let p in game.players[player].pieces) {
				const piece = game.players[player].pieces[p];
				if (piece.enPassant === true && piece.enPassTurn === game.turn &&
					piece.position.x === this.position.x) {
					if (piece.position.y === this.position.y + 1) {
						positions.push([xDir(1), this.position.y + 1, true]);
					}
					if (piece.position.y === this.position.y - 1) {
						positions.push([xDir(1), this.position.y - 1, true]);
					}
				}
			}
		}

		return positions;
	}

	// 4th boolean parameter indicates if this is an en passant move
	toPosition(game, pX, pY, enPassMove) {
		if (typeof pX === 'number' && typeof pY === 'number') {
			if (pX >= 0 && pX < 8 && pY >= 0 && pY < 8) {
				this.position.x = pX;
				this.position.y = pY;
				this.step += 1;
				
				// Capture enemy piece in target Position
				for (let player in game.players) {
					if (game.players[player].side !== this.side) {
						for (let p in game.players[player].pieces) {
							const piece = game.players[player].pieces[p];
							if (piece.position.x === pX && piece.position.y === pY) {
								piece.position.x = -1;
								piece.position.y = -1;
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
			// Indicate this move makes it able to be captured by en passant the next turn
			if ((this.step === 1 && pX === 3 && this.side === 'white') ||
				(this.step === 1 && pX === 4 && this.side === 'black')) {
				for (let player in game.players) {
					if (game.players[player].side !== this.side) {
						for (let p in game.players[player].pieces) {
							const piece = game.players[player].pieces[p];
							if (piece.class === 'pawn') {
								if (piece.position.x === pX &&
									(piece.position.y === pY + 1 || piece.position.y === pY - 1)) {
									this.enPassant = true;
									this.enPassTurn = game.turn;
								}
							}
						}
					}
				}
			}
		}, 1)
		// This is for an offensive en passant move that captures an enemy pawn
		if (enPassMove === true) {
			for (let player in game.players) {
				if (game.players[player].side !== this.side) {
					for (let p in game.players[player].pieces) {
						const piece = game.players[player].pieces[p];
						if (piece.enPassant === true && piece.enPassTurn === game.turn &&
							piece.position.y === pY &&
							(piece.position.x === pX + 1 || piece.position.x === pX - 1)) {
							piece.position.x = -1;
							piece.position.y = -1;
						}
					}
				}
			}
		}
		
		let promotion = false;
		if ((pX === 7 && this.side === 'white') || (pX === 0 && this.side === 'black')) {
			promotion = true;
		}
		return [this.position.x, this.position.y, promotion];
	}
}