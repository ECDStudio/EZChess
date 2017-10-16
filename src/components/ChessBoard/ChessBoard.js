import React, { Component } from 'react';
import Piece from '../Piece/Piece';

class ChessBoard extends Component {
  updateGame = () => {
    this.props.updateGame();
  }
  
  players = this.props.game.players;

  player1 = Object.keys(this.players.player1.pieces).map((piece) => {
    return (
      <Piece game={this.props.game} model={this.players.player1.pieces[piece]} updateGame={this.updateGame} key={piece} />
    )
  })

  player2 = Object.keys(this.players.player2.pieces).map((piece) => {
    return (
      <Piece game={this.props.game} model={this.players.player2.pieces[piece]} updateGame={this.updateGame} key={piece} />
    )
  })
  render() {
    return (
      <div className="chessboard">
        <ul>
          {this.player1}
        </ul>
        <ul>
          {this.player2}
        </ul>
      </div>
    );
  }
}

export default ChessBoard;
