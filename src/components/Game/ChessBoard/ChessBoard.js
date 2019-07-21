import React, { Component } from 'react';

import Piece from '../Piece';
import TargetPositions from './TargetPositions';

import Tiles from './Tiles';

import './ChessBoard.scss';

class ChessBoard extends Component {
  state = {
    selectedModel: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props)
      this.setState({ selectedModel: null })
  }

  render() {
    const { game } = this.props;
    const { selectedModel } = this.state;

    const renderPieces = player => Object.values(game.players[player].pieces).map((piece, key) => {
      return (
        <li key={ key }>
          <Piece
            game={ game }
            model={ piece }
            setSelectedModel={ selectedModel => this.setState({ selectedModel }) }
          />
        </li>
      )
    })

    return (
      <div className="ChessBoard">
        <Tiles />
        {
          Object.keys(game.players).map((player, key) => (
            <ul className="player" key={ key }>
              { renderPieces(player) }
            </ul>
          ))
        }
        {
          selectedModel &&
          <TargetPositions model={ selectedModel } game={ game } />
        }
      </div>
    );
  }
}

export default ChessBoard;
