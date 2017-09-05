import { chess } from './app';

export const checkPosition = (x, y, side) => {
	for (let player in chess) {
		for (let piece in chess[player].pieces) {
			if (chess[player].pieces[piece].position.x === x &&
				chess[player].pieces[piece].position.y === y) {
				if (chess[player].side === side) {
					// check if there is piece from the same side
					return 'friendly';
				} else {
					// check if there is piece from the other side (can capture)
					return 'enemy';
				}
			}
		}
	}
}