import Piece from '../Piece';
import { checkPosition } from '../../checkPosition';

export default class Knight extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'knight';
	}

	// Returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves() {
		let positions = [],
		targets = [
			[this.position.x + 1, this.position.y + 2],
			[this.position.x + 2, this.position.y + 1],
			[this.position.x + 1, this.position.y - 2],
			[this.position.x + 2, this.position.y - 1],
			[this.position.x - 1, this.position.y + 2],
			[this.position.x - 2, this.position.y + 1],
			[this.position.x - 1, this.position.y - 2],
			[this.position.x - 2, this.position.y - 1]
		]

		for (let i = 0; i < targets.length; i += 1) {
			// First loop makes sure target position's in bound (0 - 7)
			if (targets[i][0] >= 0 && targets[i][0] < 8 &&
				targets[i][1] >= 0 && targets[i][1] < 8) {
				// Second loop makes sure no friendly piece in target position
				if (checkPosition(targets[i][0], targets[i][1], this.side) !== 'friendly') {
					positions.push([targets[i][0], targets[i][1]]);
				}
			}
		}

		return positions;
	}
}