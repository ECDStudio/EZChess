import React, { Component } from 'react';
import classNames from 'classnames';

import Queen from 'src/models/pieces/Queen';
import Pawn from 'src/models/pieces/Pawn';

import './Piece.scss';

class Piece extends Component {

  componentDidUpdate(prevProps) {
    const { model, game } = this.props;

    if (prevProps === this.props) return;

    // Watch for pawn promotion
    if (model.type === 'pawn' && model.promotion) {
      for (let player of Object.values(game.players)) {
        for (let q in player.pieces) {
          if (player.pieces[q] !== model) continue;
          player.pieces[q] = new Queen(model.side, model.position.x, model.position.y);
        }
      }
    }
    // Watch for pawn revertion after game reset
    if (prevProps.model.type === 'queen' && model.type === 'pawn') {
      for (let player of Object.values(game.players)) {
        for (let q in player.pieces) {
          if (player.pieces[q] !== model) continue;
          player.pieces[q] = new Pawn(model.side, model.position.x, model.position.y);
        }
      }
    }
  }

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
