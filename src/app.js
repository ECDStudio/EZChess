import Player from './models/Player';

export let chess = {
	player1: new Player('white'),
	player2: new Player('black')
};

window.chess = chess;