import { chess } from './app';

export const checkPosition = (x, y, side) => {
	for (let player in chess.players) {
		for (let p in chess.players[player].pieces) {
			const piece = chess.players[player].pieces[p];
			if (piece.position.x === x && piece.position.y === y) {
				if (chess.players[player].side === side) {
					// Check if there is piece from the same side
					return 'friendly';
				} else {
					// Check if there is piece from the other side (can capture)
					return 'enemy';
				}
			}
		}
	}
}