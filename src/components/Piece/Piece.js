import React, { Component } from 'react';
import TargetPositions from '../TargetPositions/TargetPositions';

class Piece extends Component {
  state = {
    game: this.props.game,
    targets: '',
  };

  updateGame = () => {
    setTimeout(() => {
      this.props.updateGame();
    }, 1);
  };

  toggleTargets(model) {
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
      <li>
          <a className={`chess-piece ${this.props.model.side} ${this.props.model.class}`}
          style={style}
          onClick={() => this.toggleTargets(this.props.model)}>
          </a>
          {this.state.targets}
      </li>
    )
  }
}

export default Piece;
