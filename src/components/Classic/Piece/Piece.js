import React, { Component } from 'react';
import classNames from 'classnames';

import './Piece.scss';

class Piece extends Component {
  toggleTargets = () => {
    const { model, game } = this.props;

    for (let player of Object.values(game.players)) {
      if (this.props.view !== player.side || player.side !== model.side || !player.isTurn) continue;
      this.props.setSelectedModel(model);
    }
  }

  render() {
    const { model } = this.props;
    const classes = classNames({
      'Piece': true,
      [model.side]: model.side,
      [model.type]: model.type,
    })
    const style = {
      display: model.position.x === -1 ? 'none' : 'block',
      left: `${ model.position.x * 12.5 }%`,
      bottom: `${ model.position.y * 12.5 }%`,
    }

    return (
      <div className={ classes }
        style={ style }
        onClick={ this.toggleTargets }
      />
    )
  }
}

export default Piece;
