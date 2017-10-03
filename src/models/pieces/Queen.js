import Piece from '../Piece';
import { checkPosition } from '../../checkPosition';

export default class Queen extends Piece {
	constructor(side, pX, pY) {
		super(side, pX, pY);
		this.class = 'queen';
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none
	availableMoves() {
	}
}