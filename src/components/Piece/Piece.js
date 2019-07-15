import React, { Component } from 'react';
import TargetPositions from '../TargetPositions/TargetPositions';

class Piece extends Component {
  state = {
    targets: null,
  }

  componentWillReceiveProps() {
    this.setState({
      targets: null,
    });
  }

  toggleTargets(model, game) {
    for (let player of Object.values(game.players)) {
      if (this.props.view === player.side && player.side === model.side && player.isTurn) {
        const targets = (
          <TargetPositions model={ model } game={ game } updateGame={this.props.updateGame} />
        );

        this.props.setSelectedModel(model);
        setTimeout(() => {
          if (this.props.selectedModel === model)
            this.setState({ targets });
        })
      }
    }
  }

  render() {
    const { game, model } = this.props;
    const { targets } = this.state
    const style = {
      display: model.position.x === -1 ? 'none' : 'block',
      left: `${ model.position.x * 12.5 }%`,
      bottom: `${ model.position.y * 12.5 }%`,
    }

    return (
      <div>
        <a className={`chess-piece ${model.side} ${model.type}`}
          style={ style }
          onClick={() => this.toggleTargets(model, game)}
        />
        { targets && targets }
      </div>
    )
  }
}

export default Piece;
