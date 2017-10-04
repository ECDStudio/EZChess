import { chess } from './app';

export const checkPosition = (x, y, side) => {
	for (let player in chess.players) {
		for (let piece in chess.players[player].pieces) {
			if (chess.players[player].pieces[piece].position.x === x &&
				chess.players[player].pieces[piece].position.y === y) {
				if (chess.players[player].side === side) {
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