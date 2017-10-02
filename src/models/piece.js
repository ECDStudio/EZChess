import { chess } from '../app';

export default class Piece {
	constructor(side, pX, pY) {
		this.side = side;
		this.position = {
			x: pX,
			y: pY
		};
		this.step = 0;
	}

	toPosition(pX, pY) {
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
		return [this.position.x, this.position.y];
	}
}