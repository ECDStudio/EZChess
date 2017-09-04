class Piece {
	constructor(pX, pY) {
		this.position = {
			x: pX,
			y: pY
		};
		this.step = 0;
		this.self = this;
	}
	
	toPosition(pX, pY) {
		if (typeof pX === 'number' && typeof pY === 'number') {
			if (pX > 0 && pX <= 8 && pY > 0 && pY <= 8) {
				this.position.x = pX;
				this.position.y = pY;
				this.step += 1;
			} else if (pX === 0 && pY === 0) {
				// [0, 0] position is being captured
				this.position.x = pX;
				this.position.y = pY;
			}
		}
		return [this.position.x, this.position.y];
	}
}