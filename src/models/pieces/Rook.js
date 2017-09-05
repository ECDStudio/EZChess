import Piece from '../Piece';
import { chess } from '../../app';

export default class Rook extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
	}

	availableMoves() {
		const checkX = (target) => {
			for (let player in chess) {
				for (let piece in chess[player].pieces) {
					if (chess[player].pieces[piece].position.x === target &&
						chess[player].pieces[piece].position.y === this.position.y) {
						if (chess[player].side === this.side) {
							// check if there is piece from the same side
							return 'has friendly';
						} else {
							// check if there is piece from the other side (can capture)
							return 'has enemy';
						}
					}
				}
			}
		}

		const checkY = (target) => {
			for (let player in chess) {
				for (let piece in chess[player].pieces) {
					if (chess[player].pieces[piece].position.x ===this.position.x &&
						chess[player].pieces[piece].position.y === target) {
						if (chess[player].side === this.side) {
							// check if there is piece from the same side
							return 'has friendly';
						} else {
							// check if there is piece from the other side (can capture)
							return 'has enemy';
						}
					}
				}
			}
		}

		let positions = [],
			xUp = true,
			xDown = true,
			yUp = true,
			yDown = true;

		for (let i = this.position.x + 1; i <= 8; i += 1) {
			if (xUp === true) {
				if (checkX(i) === 'has friendly' || checkX(i) === 'has enemy') {
					xUp = false;
				}
				if (checkX(i) !== 'has friendly') {
					positions.push([i, this.position.y]);
				}
			}
		}
		for (let i = this.position.x - 1; i > 0; i -= 1) {
			if (xDown === true) {
				if (checkX(i) === 'has friendly' || checkX(i) === 'has enemy') {
					xDown = false;
				}
				if (checkX(i) !== 'has friendly') {
					positions.push([i, this.position.y]);
				}
			}
		}
		for (let i = this.position.y + 1; i <= 8; i += 1) {
			if (yUp === true) {
				if (checkY(i) === 'has friendly' || checkY(i) === 'has enemy') {
					yUp = false;
				}
				if (checkY(i) !== 'has friendly') {
					positions.push([this.position.x, i]);
				}
			}
		}
		for (let i = this.position.y - 1; i > 0; i -= 1) {
			if (yDown === true) {
				if (checkY(i) === 'has friendly' || checkY(i) === 'has enemy') {
					yDown = false;
				}
				if (checkY(i) !== 'has friendly') {
					positions.push([this.position.x, i]);
				}
			}
		}

		return positions;
	}
}