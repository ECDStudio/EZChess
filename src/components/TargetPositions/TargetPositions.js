import React, { Component } from 'react';
import Queen from '../../models/pieces/Queen';

class TargetPositions extends Component {
  state = {
    game: this.props.game
  }

  updateGame = () => {
    setTimeout(() => {
      this.props.updateGame();
    }, 1);
  };

  toTarget(piece, position, game) {
    piece.toPosition(game, ...position);
    this.updateGame();
    setTimeout(() => {
      if ((piece.side === 'white' && piece.position.x === 7) ||
        (piece.side ==='black' && piece.position.x === 0)) {
        for (let player in game.players) {
          if (game.players[player].side === piece.side) {
            for (let p in game.players[player].pieces) {
              if (game.players[player].pieces[p] === piece) {
                game.players[player].pieces[p] = new Queen(piece.side, piece.position.x, piece.position.y);
              }
            }
          }
        }
        this.props.updateGame();
      }
    }, 1);
    game.switchTurn();
  }

  render() {
    const moves = this.props.model.availableMoves(this.props.game);
    let targets = Object.keys(moves).map((target) => {
      let style = {
        left: `${moves[target][0] * 12.5}%`,
        bottom: `${moves[target][1] * 12.5}%`,
      }
      return (
        <a className="target-position" style={style} key={target}
          onClick={() => this.toTarget(this.props.model, moves[target], this.state.game)}>.</a>
      )
    })
    return (
      targets
    )
  }
}

export default TargetPositions;