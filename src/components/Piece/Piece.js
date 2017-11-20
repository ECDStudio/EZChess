import React, { Component } from 'react';
import TargetPositions from '../TargetPositions/TargetPositions';

class Piece extends Component {
  state = {
    game: this.props.game,
    targets: '',
  }

  updateGame = (game) => {
    this.props.updateGame(game);
  };

  toggleTargets(model, game) {
    for (let p in game.players) {
      if (game.players[p].side === model.side && game.players[p].isTurn === true) {
        const targets = (() => {
          return (
            <TargetPositions model={model} game={this.state.game} updateGame={this.updateGame} />
          )
        })();
        this.props.setCurrent(this.props.id);
        setTimeout(() => {
          if (this.props.current === this.props.id) {
            this.setState({
              targets: targets,
            });
          }
        }, 1)
      }
    }
  }

  componentWillReceiveProps() {
    this.setState({
      targets: '',
    });
  }

  render() {
    let style = {
      display: this.props.model.position.x === -1 ? 'none' : 'block',
      left: `${this.props.model.position.x * 12.5}%`,
      bottom: `${this.props.model.position.y * 12.5}%`,
    }

    return (
      <div>
        <a className={`chess-piece ${this.props.model.side} ${this.props.model.class}`}
        style={style}
        onClick={() => this.toggleTargets(this.props.model, this.state.game)}>
        </a>
        {this.state.targets}
      </div>
    )
  }
}

export default Piece;
