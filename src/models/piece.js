export default class Piece {
	constructor(side, pX, pY) {
		this.side = side;
		this.position = {
			x: pX,
			y: pY
		};
		this.step = 0;
	}

	toPosition(pX, pY, game) {
		if (typeof pX === 'number' && typeof pY === 'number') {
			if (pX >= 0 && pX < 8 && pY >= 0 && pY < 8) {
				this.position.x = pX;
				this.position.y = pY;
				this.step += 1;
				
				// Capture enemy piece in target Position
				for (let player in game.players) {
					if (game.players[player].side !== this.side) {
						for (let p in game.players[player].pieces) {
							const piece = game.players[player].pieces[p];
							if (piece.position.x === pX && piece.position.y === pY) {
								piece.position.x = -1;
								piece.position.y = -1;
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