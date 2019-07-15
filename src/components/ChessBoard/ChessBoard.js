import React, { Component } from 'react';

import Piece from '../Piece';

import Tiles from './Tiles';

class ChessBoard extends Component {
  state = {
    selectedModel: null,
  }

  render() {
    const { game, view } = this.props;

    const renderPieces = player => Object.values(game.players[player].pieces).map((piece, key) => {
      return (
        <li key={ key }>
          <Piece
            game={ game }
            model={ piece }
            selectedModel={ this.state.selectedModel }
            setSelectedModel={ selectedModel => this.setState({ selectedModel }) }
            id={ piece }
          />
        </li>
      )
    })

    return (
      <div className="chessboard">
        <Tiles />
        {
          Object.keys(game.players).map((player, key) => (
            <ul className="player" key={ key }>
              { renderPieces(player) }
            </ul>
          ))
        }
      </div>
    );
  }
}

export default ChessBoard;
