import Piece from '../Piece';
import { checkPosition } from '../../checkPosition';

export default class King extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'king';
	}

	// Returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves(game) {
		// Call checkPosition() to determine if there is a friendly or enemy piece at that position
		const check = (x, y) => {
			return checkPosition(x, y, this.side, game);
		},
		safeCheck = () => {
			// Make sure won't end up in check
			for (let player in game.players) {
				if (game.players[player].side !== this.side) {
					let targets = [];
					for (let p in game.players[player].pieces) {
						const piece = game.players[player].pieces[p];
						if (p === 'king') {
							let kingPos = piece.position;
							targets.push([kingPos.x + 1, kingPos.y]);
							targets.push([kingPos.x - 1, kingPos.y]);
							targets.push([kingPos.x + 1, kingPos.y + 1]);
							targets.push([kingPos.x + 1, kingPos.y - 1]);
							targets.push([kingPos.x - 1, kingPos.y + 1]);
							targets.push([kingPos.x - 1, kingPos.y - 1]);
							targets.push([kingPos.x, kingPos.y + 1]);
							targets.push([kingPos.x, kingPos.y - 1]);
						} else if (piece.class === 'pawn') {
							const pawnPos = piece.position;
							if (game.players[player].side === 'white') {
								targets.push([pawnPos.x + 1, pawnPos.y + 1]);
								targets.push([pawnPos.x + 1, pawnPos.y - 1]);
							} else {
								targets.push([pawnPos.x - 1, pawnPos.y + 1]);
								targets.push([pawnPos.x - 1, pawnPos.y - 1]);
							}
						} else {
							// Make sure to detect all positions,
							// including those the King is currently blocking
							const currentX = this.position.x;
							const currenty = this.position.y;
							this.position.x = -1;
							this.position.y = -1;
							const pieceMoves = piece.availableMoves(game);
							if (pieceMoves.length !== 0) {
								for (let move of pieceMoves) {
									targets.push(move);
								}
							}
							this.position.x = currentX;
							this.position.y = currenty;
						}
					}
					return targets;
				}
			}
		},
		possiblePos = [
			[this.position.x + 1, this.position.y],
			[this.position.x - 1, this.position.y],
			[this.position.x + 1, this.position.y + 1],
			[this.position.x + 1, this.position.y - 1],
			[this.position.x - 1, this.position.y + 1],
			[this.position.x - 1, this.position.y - 1],
			[this.position.x, this.position.y + 1],
			[this.position.x, this.position.y - 1],
		];

		let finalPos = [];

		for (let pos in possiblePos) {
			if (possiblePos[pos][0] >= 0 && possiblePos[pos][0] < 8 &&
				possiblePos[pos][1] >= 0 && possiblePos[pos][1] < 8) {
				if (check(...possiblePos[pos]) !== 'friendly') {
					let inCheck = false;

					for (let safePos in safeCheck()) {
						if (safeCheck()[safePos][0] === possiblePos[pos][0] &&
							safeCheck()[safePos][1] === possiblePos[pos][1]) {
							inCheck = true;
						}
					}
					if (inCheck === false) {
						possiblePos[pos].push(null)
						finalPos.push(possiblePos[pos]);
					}
				}
			}
		};
		
		// King side castle
		for (let player in game.players) {
			if (game.players[player].side === this.side) {
				let pathEmpty = true;
				for (let pos in safeCheck()) {
					if (safeCheck()[pos][0] === this.position.x &&
						(safeCheck()[pos][1] === 1 ||
							safeCheck()[pos][1] === 2 || safeCheck()[pos][1] === 3)) {
						pathEmpty = false;
					}
				}
				for (let p in game.players[player].pieces) {
					const piece = game.players[player].pieces[p];
					if (piece.position.x === this.position.x &&
						(piece.position.y === 1 || piece.position.y === 2)) {
						pathEmpty = false;
					}
				}
				if (pathEmpty === true && game.players[player].pieces.rook1.step === 0 && this.step === 0) {
					finalPos.push([this.position.x, 1, 'king-castle']);
				}
			}
		}
		
		// Queen side castle
		for (let player in game.players) {
			if (game.players[player].side === this.side) {
				let pathEmpty = true;
				for (let pos in safeCheck()) {
					if (safeCheck()[pos][0] === this.position.x &&
						(safeCheck()[pos][1] === 3 || safeCheck()[pos][1] === 4 || safeCheck()[pos][1] === 5)) {
						pathEmpty = false;
					}
				}
				for (let p in game.players[player].pieces) {
					const piece = game.players[player].pieces[p];
					if (piece.position.x === this.position.x &&
						(piece.position.y === 4 || piece.position.y === 5 || piece.position.y === 6)) {
						pathEmpty = false;
					}
				}
				if (pathEmpty === true && game.players[player].pieces.rook2.step === 0 && this.step === 0) {
					finalPos.push([this.position.x, 5, 'queen-castle']);
				}
			}
		}

		return finalPos;
	}
	
	toPosition(pX, pY, castle, game) {
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
								piece.position = {x: -1, y: -1};
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
			for (let player in game.players) {
				if (game.players[player].side === this.side) {
					game.players[player].pieces.rook1.toPosition(this.position.x, 2, game);
				}
			}
		}
		// Queen side castle, rook2 needs to move
		if (castle === 'queen-castle') {
			for (let player in game.players) {
				if (game.players[player].side === this.side) {
					game.players[player].pieces.rook2.toPosition(this.position.x, 4, game);
				}
			}
		}
		return [this.position.x, this.position.y];
	}
}