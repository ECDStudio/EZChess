import { chess } from './app';

let container = document.createElement('div'),
	player1 = document.createElement('ul'),
	player2 = document.createElement('ul');

container.id = 'chessboard';
document.getElementsByTagName('body')[0].append(container);
container.append(player1, player2);

for (let player in chess) {
	for (let piece in chess[player].pieces) {
		let p = document.createElement('li');
		
		p.classList.add('chess-piece');
		p.classList.add(piece);
		if (player === 'player1') {
			player1.append(p);
		} else {
			player2.append(p);
		}
		p.style.left = `${(chess[player].pieces[piece].position.x - 1) * 12.5}%`;
		p.style.bottom = `${(chess[player].pieces[piece].position.y - 1) * 12.5}%`;
		
		p.addEventListener('click', function() {
			console.log(chess[player].pieces[piece].__proto__.toPosition)
		})
	}
}