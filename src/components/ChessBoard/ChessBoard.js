import React, { Component } from 'react';
import Piece from '../Piece/Piece';

class ChessBoard extends Component {
  state = {
    game: this.props.game,
    current: null,
  }

  updateGame = () => {
    this.props.updateGame();
    this.setState({
      game: this.state.game,
    })
  }

  setCurrent = (id) => {
    this.setState({
      current: id,
    })
  }

  render() {
    const player1 = Object.keys(this.state.game.players.player1.pieces).map((piece) => {
      return (
        <Piece
          game={this.state.game}
          model={this.state.game.players.player1.pieces[piece]}
          updateGame={this.updateGame}
          setCurrent={this.setCurrent}
          current={this.state.current}
          id={piece}
          key={piece} />
      )
    })

    const player2 = Object.keys(this.state.game.players.player2.pieces).map((piece) => {
      return (
        <Piece
          game={this.state.game}
          model={this.state.game.players.player2.pieces[piece]}
          updateGame={this.updateGame}
          setCurrent={this.setCurrent}
          current={this.state.current}
          id={piece}
          key={piece} />
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
