import Player from './Player';

export default class Chess {
  constructor() {
    this.reset();
  }

  reset() {
    this.turn = 0;
    this.players = {
      player1: new Player('white'),
      player2: new Player('black')
    }
  }
  
  switchTurn() {
    const { player1, player2} = this.players;

    player1.isTurn = !player1.isTurn;
    player2.isTurn = !player2.isTurn;
    this.turn += 1;
  }
}