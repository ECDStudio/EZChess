import Piece from '../Piece';
import { checkPosition } from '../../checkPosition';

export default class Rook extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves() {
		const checkX = (target) => {
			return checkPosition(target, this.position.y, this.side);
		},
		checkY = (target) => {
			return checkPosition(this.position.x, target, this.side);
		};

		let positions = [],
			xUp = true,
			xDown = true,
			yUp = true,
			yDown = true;

		for (let i = this.position.x + 1; i <= 8; i += 1) {
			if (xUp === true) {
				if (checkX(i) === 'friendly' || checkX(i) === 'enemy') {
					xUp = false;
				}
				if (checkX(i) !== 'friendly') {
					positions.push([i, this.position.y]);
				}
			}
		}
		for (let i = this.position.x - 1; i > 0; i -= 1) {
			if (xDown === true) {
				if (checkX(i) === 'friendly' || checkX(i) === 'enemy') {
					xDown = false;
				}
				if (checkX(i) !== 'friendly') {
					positions.push([i, this.position.y]);
				}
			}
		}
		for (let i = this.position.y + 1; i <= 8; i += 1) {
			if (yUp === true) {
				if (checkY(i) === 'friendly' || checkY(i) === 'enemy') {
					yUp = false;
				}
				if (checkY(i) !== 'friendly') {
					positions.push([this.position.x, i]);
				}
			}
		}
		for (let i = this.position.y - 1; i > 0; i -= 1) {
			if (yDown === true) {
				if (checkY(i) === 'friendly' || checkY(i) === 'enemy') {
					yDown = false;
				}
				if (checkY(i) !== 'friendly') {
					positions.push([this.position.x, i]);
				}
			}
		}

		return positions;
	}
}