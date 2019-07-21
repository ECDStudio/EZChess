import React, { Component } from 'react';

import './TargetPositions.scss';

class TargetPositions extends Component {
  state = {

  }

  toTarget(piece, position, game) {
    piece.toPosition(game, position);
    game.switchTurn();
    this.props.updateGame(game);
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
            className="TargetPosition"
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
