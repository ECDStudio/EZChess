import React, { Component } from 'react';
import Piece from '../Piece/Piece';

class ChessBoard extends Component {
  state = {
    game: this.props.game,
    current: null,
  }

  updateGame = (g) => {
    this.props.updateGame(g);
  }

  setCurrent = (id) => {
    this.setState({
      current: id,
    })
  }

  render() {
    const length = 8; 
    const list = Array.apply(null, {length: length}).map(Number.call, Number);
    const row = list.map((i) => {
      return (
        <li key={i}></li>
      )
    });
    const tiles = list.map((i) => {
      return (
        <li key={i}>
          <ul>
            { row }
          </ul>
        </li>
      )
    });

    const player1 = Object.keys(this.state.game.players.player1.pieces).map((piece) => {
      return (
        <li key={piece}>
          <Piece
          game={this.state.game}
          model={this.state.game.players.player1.pieces[piece]}
          updateGame={this.updateGame}
          setCurrent={this.setCurrent}
          current={this.state.current}
          id={piece} />
        </li>
      )
    })

    const player2 = Object.keys(this.state.game.players.player2.pieces).map((piece) => {
      return (
        <li key={piece}>
          <Piece
          game={this.state.game}
          model={this.state.game.players.player2.pieces[piece]}
          updateGame={this.updateGame}
          setCurrent={this.setCurrent}
          current={this.state.current}
          id={piece} />
        </li>
      )
    })

    return (
      <div className="chessboard">
        <ul className="tiles">
          { tiles }
        </ul>
        <ul className="player">
          { player1 }
        </ul>
        <ul className="player">
          { player2 }
        </ul>
      </div>
    );
  }
}

export default ChessBoard;
