import Piece from '../Piece';
import { checkPosition } from '../../checkPosition';

export default class Queen extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'queen';
	}

	// Returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves() {
		// Call checkPosition() to determine if there is a friendly or enemy piece at that position
		const checkX = (target) => {
			return checkPosition(target, this.position.y, this.side);
		},
		checkY = (target) => {
			return checkPosition(this.position.x, target, this.side);
		};
		const check = (x, y) => {
			return checkPosition(x, y, this.side);
		};

		let positions = [],
			xUp = true,
			xDown = true,
			yUp = true,
			yDown = true,
			rightUp = true,
			rightDown = true,
			leftUp = true,
			leftDown = true;

		// Loop through all possible positions in vertical and horizontal directions;
		// stops AT position with a friendly piece,
		// or AFTER position with an enenmy piece(capture);
		// the for loop makes sure the position is in bound of the chessboard(1-8),
		// and is not the position the piece is currently standing
		for (let i = this.position.x + 1; i < 8; i += 1) {
			if (xUp === true) {
				if (checkX(i) === 'friendly' || checkX(i) === 'enemy') {
					xUp = false;
				}
				if (checkX(i) !== 'friendly') {
					positions.push([i, this.position.y]);
				}
			}
		}
		for (let i = this.position.x - 1; i >= 0; i -= 1) {
			if (xDown === true) {
				if (checkX(i) === 'friendly' || checkX(i) === 'enemy') {
					xDown = false;
				}
				if (checkX(i) !== 'friendly') {
					positions.push([i, this.position.y]);
				}
			}
		}
		for (let i = this.position.y + 1; i < 8; i += 1) {
			if (yUp === true) {
				if (checkY(i) === 'friendly' || checkY(i) === 'enemy') {
					yUp = false;
				}
				if (checkY(i) !== 'friendly') {
					positions.push([this.position.x, i]);
				}
			}
		}
		for (let i = this.position.y - 1; i >= 0; i -= 1) {
			if (yDown === true) {
				if (checkY(i) === 'friendly' || checkY(i) === 'enemy') {
					yDown = false;
				}
				if (checkY(i) !== 'friendly') {
					positions.push([this.position.x, i]);
				}
			}
		}
		// Loop through all possible positions in diagonal directions;
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