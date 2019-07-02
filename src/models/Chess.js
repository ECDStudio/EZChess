import Player from './Player';

import { WHITE, BLACK } from './constants';

export default class Chess {
  constructor() {
    this.reset();
  }

  reset() {
    this.turn = 0;
    this.players = {
      player1: new Player(WHITE),
      player2: new Player(BLACK),
    }
  }
  
  switchTurn() {
    const { player1, player2 } = this.players;

    player1.isTurn = !player1.isTurn;
    player2.isTurn = !player2.isTurn;
    this.turn += 1;
  }
}