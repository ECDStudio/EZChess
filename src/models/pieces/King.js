import Piece from '../Piece';
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

		return positions;
	}
}