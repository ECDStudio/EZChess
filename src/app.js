import Player from './models/Player';

class Chess {
	constructor() {
		this.turn = 0;
		this.players = {
			player1: new Player('white'),
			player2: new Player('black')
		}
	}

	reset() {
		this.turn = 0;
		this.players = {
			player1: new Player('white'),
			player2: new Player('black')
		}
	}
	
	switchTurn() {
		this.turn += 1;
		this.players.player1.isTurn = !this.players.player1.isTurn;
		this.players.player2.isTurn = !this.players.player2.isTurn;
	}
};

export let chess = new Chess();

// window.chess = chess;
require('./view.js');