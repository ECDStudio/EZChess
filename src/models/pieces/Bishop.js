import Piece from '../Piece';
import { checkPosition } from '../../checkPosition';

export default class Bishop extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'bishop';
	}

	// Returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves(game) {
		// call checkPosition() to determine if there is a friendly or enemy piece at that position
		const check = (x, y) => {
			return checkPosition(x, y, this.side, game);
		};

		let positions = [],
			rightUp = true,
			rightDown = true,
			leftUp = true,
			leftDown = true;

		// Loop through all possible positions in 4 directions;
		// stops AT position with a friendly piece,
		// or AFTER position with an enenmy piece(capture);
		// the for loop makes sure the position is in bound of the chessboard(1-8),
		// and is not the position the piece is currently standing
		for (let i = this.position.x + 1; i < 8; i += 1) {
			let yTarget = this.position.y + i - this.position.x;
			if (rightUp === true && yTarget >= 0 && yTarget < 8) {
				if (check(i, yTarget) === 'friendly' || check(i, yTarget) === 'enemy' || yTarget === 7) {
					rightUp = false;
				}
				if (check(i, yTarget) !== 'friendly') {
					positions.push([i, yTarget]);
				}
			}
		}
		for (let i = this.position.x + 1; i < 8; i += 1) {
			let yTarget = this.position.y - i + this.position.x;
			if (rightDown === true && yTarget >= 0 && yTarget < 8) {
				if (check(i, yTarget) === 'friendly' || check(i, yTarget) === 'enemy' || yTarget === 0) {
					rightDown = false;
				}
				if (check(i, yTarget) !== 'friendly') {
					positions.push([i, yTarget]);
				}
			}
		}
		for (let i = this.position.x - 1; i >= 0; i -= 1) {
			let yTarget = this.position.y + i - this.position.x;
			if (leftUp === true && yTarget >= 0 && yTarget < 8) {
				if (check(i, yTarget) === 'friendly' || check(i, yTarget) === 'enemy' || yTarget === 7) {
					leftUp = false;
				}
				if (check(i, yTarget) !== 'friendly') {
					positions.push([i, yTarget]);
				}
			}
		}
		for (let i = this.position.x - 1; i >= 0; i -= 1) {
			let yTarget = this.position.y - i + this.position.x;
			if (leftDown === true && yTarget >= 0 && yTarget < 8) {
				if (check(i, yTarget) === 'friendly' || check(i, yTarget) === 'enemy' || yTarget === 0) {
					leftDown = false;
				}
				if (check(i, yTarget) !== 'friendly') {
					positions.push([i, yTarget]);
				}
			}
		}

		return positions;
	}
}