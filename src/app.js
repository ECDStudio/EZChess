import Player from './models/Player';

class Chess {
	constructor() {
		this.player1 = new Player('white'),
		this.player2 = new Player('black')
	}

	reset() {
		this.player1 = new Player('white'),
		this.player2 = new Player('black')
	}
	
	switchTurn() {
		this.player1.isTurn = !this.player1.isTurn;
		this.player2.isTurn = !this.player2.isTurn;
	}
};

export let chess = new Chess();

// window.chess = chess;
require('./view.js');