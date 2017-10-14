import { chess } from './app';

let container = document.createElement('div'),
	chessboard = document.createElement('div'),
	player1 = document.createElement('ul'),
	player2 = document.createElement('ul'),
	turnCounter = document.createElement('div');

container.id = 'container';
chessboard.id = 'chessboard';
document.getElementsByTagName('body')[0].append(container);
container.append(chessboard, turnCounter);
chessboard.append(player1, player2);

chess.indicateTurn = () => {
	// Indicate player of current turn in the DOM
	for (let player in chess.players) {
		if (chess.players[player].isTurn === true) {
			turnCounter.innerHTML = `Current Turn: ${chess.players[player].side}`;
		}
	}
};
chess.indicateTurn();

for (let player in chess.players) {
	for (let p in chess.players[player].pieces) {
		const piece = chess.players[player].pieces[p];

		// Bind a DOM element to each piece
		piece.ui = document.createElement('li');
		// Extend the original toPosition() method to include DOM stuff
		piece.moveTo = (pX, pY, specialMove) => {
			piece.toPosition(pX, pY, specialMove);
			piece.ui.style.zIndex = '20';
			piece.ui.style.left = `${piece.position.x * 12.5}%`;
			piece.ui.style.bottom = `${piece.position.y * 12.5}%`;
			setTimeout(function() {
				piece.ui.style.zIndex = '1';
			}, 1000);
		}
		piece.moveTo(...piece.position);

		piece.watchCapture = () => {
			// Detect if a piece is captured, hide the DOM element
			if (piece.position.x === -1 &&
				piece.position.y === -1) {
				setTimeout(function() {
					piece.ui.style.display = 'none';
				}, 500)
			}
		}
		// Add classes to DOM element for proper CSS
		piece.ui.classList.add('chess-piece', chess.players[player].side, piece.class);
		piece.ui.addEventListener('click', () => {
			// Select a piece and move if it's its player's turn
			if (chess.players[player].isTurn === true) {
				pieceClicked(piece);
			}
		})
		
		if (player === 'player1') {
			player1.append(piece.ui);
		} else {
			player2.append(piece.ui);
		}
	}
}

const pieceClicked = (piece) => {
	// First clear all targets if there is any
	clearTargets();
	// Create selectable targets in the DOM
	for (let position of piece.availableMoves()) {
		let target = document.createElement('a');

		chessboard.append(target);
		target.classList.add('target-position');
		target.style.left = `${position[0] * 12.5}%`;
		target.style.bottom = `${position[1] * 12.5}%`;
		target.addEventListener('click', () => targetClicked(piece, position))
	}
}

const targetClicked = (piece, position) => {
	piece.moveTo(...position);
	clearTargets();
	// Make sure captured pieces are hidden in the DOM
	for (let player in chess.players) {
		for (let p in chess.players[player].pieces) {
			let pieces = chess.players[player].pieces[p];
			pieces.watchCapture();
			setTimeout(function() {
				pieces.moveTo(pieces.position.x, pieces,position.y);
			}, 500)
		}
	}
	// Pass the turn to the other player
	chess.switchTurn();
	chess.indicateTurn();
}

const clearTargets = () => {
	// Remove all pieces' selectable targets in the DOM
	for (let i of document.getElementsByClassName('target-position')) {
		setTimeout(function() {
			i.parentElement.removeChild(i);
		})
	}
}