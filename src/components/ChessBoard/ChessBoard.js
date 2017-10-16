import React, { Component } from 'react';
import Piece from '../Piece/Piece';

class ChessBoard extends Component {
  render() {
    const players = this.props.game.players;

    const player1 = Object.keys(players.player1.pieces).map((piece) => {
      return (
        <Piece game={this.props.game} model={players.player1.pieces[piece]} key={piece} />
      )
    })

    const player2 = Object.keys(players.player2.pieces).map((piece) => {
      return (
        <Piece game={this.props.game} model={players.player2.pieces[piece]} key={piece} />
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
