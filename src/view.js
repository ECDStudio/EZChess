import { chess } from './app';

let container = document.createElement('div'),
	player1 = document.createElement('ul'),
	player2 = document.createElement('ul');

container.id = 'chessboard';
document.getElementsByTagName('body')[0].append(container);
container.append(player1, player2);

const watchPiece = (piece, obj) => {
	piece.addEventListener('click', () => {
		for (let i of obj.availableMoves()) {
			let target = document.createElement('a');
			target.classList.add('target-position');
			container.append(target);
			target.style.left = `${i[0] * 12.5}%`;
			target.style.bottom = `${i[1] * 12.5}%`;

			watchTarget(target, obj, i);
		}
	})
}

const watchTarget = (target, obj, position) => {
	target.addEventListener('click', () => {
		obj._toPos(...position);
		for (let i of document.getElementsByClassName('target-position')) {
			setTimeout(function() {
				i.parentElement.removeChild(i);
			})
		}
		for (let player in chess) {
			for (let piece in chess[player].pieces) {
				chess[player].pieces[piece]._watchCapture();
			}
		}
	})
}

for (let player in chess) {
	for (let piece in chess[player].pieces) {
		const _piece = chess[player].pieces[piece];
		let _pieceDom = document.createElement('li');

		_piece._toPos = (pX, pY) => {
			_piece.toPosition(pX, pY);
			_pieceDom.style.left = `${_piece.position.x * 12.5}%`;
			_pieceDom.style.bottom = `${_piece.position.y * 12.5}%`;
		}

		_piece._toPos(..._piece.position);

		_pieceDom.classList.add('chess-piece');
		_pieceDom.classList.add(piece);
		_pieceDom.classList.add(chess[player].side);
		if (player === 'player1') {
			player1.append(_pieceDom);
		} else {
			player2.append(_pieceDom);
		}

		watchPiece(_pieceDom, _piece);

		_piece._watchCapture = () => {
			// detect if a piece is captured
			if (_piece.position.x === -1 &&
				_piece.position.y === -1) {
				_pieceDom.style.display = 'none';
			}
		}
	}
}