import React, { Component } from 'react';

class TargetPositions extends Component {
  state = {
    game: this.props.game
  }

  updateGame = (game) => {
    setTimeout(() => {
      this.props.updateGame(game);
    }, 1);
  };

  toTarget(piece, position, game) {
    piece.toPosition(game, ...position);
    game.switchTurn();
    this.updateGame(game);
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
