import React, { Component } from 'react';

class ChessBoard extends Component {
  render() {
    const players = this.props.game.players;

    const player1 = Object.keys(players.player1.pieces).map(function(piece) {
      return (
        <li className={"chess-piece white " + players.player1.pieces[piece].class}></li>
      )
    })

    const player2 = Object.keys(players.player2.pieces).map(function(piece) {
      return (
        <li className={"chess-piece black " + players.player2.pieces[piece].class}></li>
      )
    })

    return (
      <div className="chessboard">
        <ul>
          {player1}
        </ul>
        <ul>
          {player2}
        </ul>
      </div>
    );
  }
}

export default ChessBoard;
