import Player from './models/Player';

let chess = {
	player1: new Player('white'),
	player2: new Player('black')
};

window.chess = chess;