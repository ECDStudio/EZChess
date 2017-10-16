import Chess from './models/Chess';

Chess.prototype.initChess = function(container) {
	let chessboard = document.createElement('div'),
		player1 = document.createElement('ul'),
		player2 = document.createElement('ul'),
		turnCounter = document.createElement('div');

	container.append(chessboard, turnCounter);
	chessboard.append(player1, player2);
	chessboard.classList.add('chessboard');

	this.indicateTurn = () => {
		// Indicate player of current turn in the DOM
		for (let player in this.players) {
			if (this.players[player].isTurn === true) {
				turnCounter.innerHTML = `Current Turn: ${this.players[player].side}`;
			}
		}
	};
	this.indicateTurn();

	for (let player in this.players) {
		for (let p in this.players[player].pieces) {
			const piece = this.players[player].pieces[p];

			// Bind a DOM element to each piece
			piece.ui = document.createElement('li');
			// Extend the original toPosition() method to include DOM stuff
			piece.moveTo = (game, pX, pY, specialMove) => {
				piece.toPosition(game, pX, pY, specialMove);
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
			piece.ui.classList.add('chess-piece', this.players[player].side, piece.class);
			piece.ui.addEventListener('click', () => {
				// Select a piece and move if it's its player's turn
				if (this.players[player].isTurn === true) {
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
		for (let position of piece.availableMoves(this)) {
			let target = document.createElement('a');

			chessboard.append(target);
			target.classList.add('target-position');
			target.style.left = `${position[0] * 12.5}%`;
			target.style.bottom = `${position[1] * 12.5}%`;
			target.addEventListener('click', () => targetClicked(piece, position))
		}
	}

	const targetClicked = (piece, position) => {
		piece.moveTo(this, ...position);
		clearTargets();
		for (let player in this.players) {
			for (let p in this.players[player].pieces) {
				let pieces = this.players[player].pieces[p];
				// Make sure captured pieces are hidden in the DOM
				pieces.watchCapture();
				setTimeout(function() {
					// This is for stuff that moves automatically at turn's end
					// mainly rook during a castle move
					pieces.moveTo(this, pieces.position.x, pieces,position.y);
				}, 500)
			}
		}
		// Pass the turn to the other player
		this.switchTurn();
		this.indicateTurn();
	}

	const clearTargets = () => {
		// Remove all pieces' selectable targets in the DOM
		for (let i of container.getElementsByClassName('target-position')) {
			setTimeout(function() {
				i.parentElement.removeChild(i);
			})
		}
	}
}

let chess = new Chess();

for (let i of document.getElementsByClassName('chess-container')) {
	if (i) {
		chess.initChess(i);
	}
}