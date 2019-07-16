import React, { Component } from 'react';

class TargetPositions extends Component {
  state = {

  }

  updateGame = (game) => {
    setTimeout(() => {
      this.props.updateGame(game);
    }, 1);
  };

  toTarget(piece, position, game) {
    piece.toPosition(game, position);
    game.switchTurn();
    this.updateGame(game);
  }

  render() {
    const { model, game } = this.props;
    const moves = model.availableMoves(game);

    return (
      Object.keys(moves).map((target) => {
        let style = {
          left: `${ moves[target].x * 12.5 }%`,
          bottom: `${ moves[target].y * 12.5 }%`,
        }
        return (
          <div
            className="target-position"
            style={style}
            key={target}
            onClick={() => this.toTarget(model, moves[target], game)}
          />
        )
      })
    )
  }
}

export default TargetPositions;
