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

const indicateTurn = () => {
	// indicate player of current turn
	for (let player in chess.players) {
		if (chess.players[player].isTurn === true) {
			turnCounter.innerHTML = `Current Turn: ${chess.players[player].side}`;
		}
	}
};
indicateTurn();

const watchPiece = (piece) => {
	// first clear all targets if there is any
	const clearTargets = () => {
		for (let i of document.getElementsByClassName('target-position')) {
			// remove all targets after selecting one
			setTimeout(function() {
				i.parentElement.removeChild(i);
			})
		}
	}
	clearTargets();
	// create positions for a piece to move to on the UI
	for (let position of piece.availableMoves()) {
		let target = document.createElement('a');

		chessboard.append(target);
		target.classList.add('target-position');
		target.style.left = `${position[0] * 12.5}%`;
		target.style.bottom = `${position[1] * 12.5}%`;
		target.addEventListener('click', () => {
			piece._toPos(...position);
			clearTargets();
			for (let player in chess.players) {
				for (let piece in chess.players[player].pieces) {
					let allPieces = chess.players[player].pieces[piece];
					allPieces._watchCapture();
					setTimeout(function() {
						allPieces._toPos(allPieces.position.x, allPieces,position.y);
					}, 500)
				}
			}
			chess.switchTurn();
			indicateTurn();
		})
	}
}

for (let player in chess.players) {
	for (let piece in chess.players[player].pieces) {
		// bind the piece on the UI to the virtual object
		const _pieceObj = chess.players[player].pieces[piece];
		let _pieceUI = document.createElement('li');

		_pieceObj._toPos = (pX, pY, specialMove) => {
			_pieceObj.toPosition(pX, pY, specialMove);
			_pieceUI.style.zIndex = '20';
			_pieceUI.style.left = `${_pieceObj.position.x * 12.5}%`;
			_pieceUI.style.bottom = `${_pieceObj.position.y * 12.5}%`;
			setTimeout(function() {
				_pieceUI.style.zIndex = '1';
			}, 1000);
		}

		_pieceObj._toPos(..._pieceObj.position);
		_pieceObj._watchCapture = () => {
			// detect if a piece is captured, hide it on the UI
			if (_pieceObj.position.x === -1 &&
				_pieceObj.position.y === -1) {
				setTimeout(function() {
					_pieceUI.style.display = 'none';
				}, 500)
			}
		}

		_pieceUI.classList.add('chess-piece', chess.players[player].side, _pieceObj.class);
		if (player === 'player1') {
			player1.append(_pieceUI);
		} else {
			player2.append(_pieceUI);
		}
		_pieceUI.addEventListener('click', () => {
			// select a piece and move if it's its player's turn
			if (chess.players[player].isTurn === true) {
				watchPiece(_pieceObj);
			}
		})
	}
}
