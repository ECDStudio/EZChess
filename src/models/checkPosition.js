export const checkPosition = (x, y, side, game) => {
	for (let player in game.players) {
		for (let p in game.players[player].pieces) {
			const piece = game.players[player].pieces[p];
			if (piece.position.x === x && piece.position.y === y) {
				if (game.players[player].side === side) {
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