import React, { Component } from 'react';

class Piece extends Component {
  state = {
    game: this.props.game
  };

  updateGame = () => {
    this.props.updateGame();
    setTimeout(() => {
    }, 500);
  };

  clearTargets() {
    // Remove all pieces' selectable targets in the DOM
    for (let i of document.getElementsByClassName('target-position')) {
      setTimeout(function() {
        i.parentElement.removeChild(i);
      })
    }
  }

  availableMoves(model, game) {
    // First clear all targets if there is any
    this.clearTargets();
    // Create selectable targets in the DOM
    for (let position of model.availableMoves(game)) {
      let target = document.createElement('a');

      document.getElementsByClassName('chessboard')[0].append(target);
      target.classList.add('target-position');
      target.style.left = `${position[0] * 12.5}%`;
      target.style.bottom = `${position[1] * 12.5}%`;
      target.addEventListener('click', () => this.toPosition(model, position, game));
    }
  }

  toPosition(piece, position, game) {
    piece.toPosition(game, ...position);
    this.updateGame();
    this.clearTargets();
    for (let player in game.players) {
      for (let p in game.players[player].pieces) {
        let pieces = game.players[player].pieces[p];
        // Make sure captured pieces are hidden in the DOM
        // pieces.watchCapture();
        setTimeout(function() {
          // This is for stuff that moves automatically at turn's end
          // mainly rook during a castle move
          pieces.toPosition(game, pieces.position.x, pieces,position.y);
        }, 500)
      }
    }
    // Pass the turn to the other player
    game.switchTurn();
    return game;
  }

  render() {
    let style = {
      display: this.props.model.position.x === -1 ? 'none' : 'block',
      left: `${this.props.model.position.x * 12.5}%`,
      bottom: `${this.props.model.position.y * 12.5}%`,
    }
    return (
      <li className={`chess-piece ${this.props.model.side} ${this.props.model.class}`}
          style={style}
          onClick={() => this.availableMoves(this.props.model, this.state.game)}>
      </li>
    )
  }
}

export default Piece;
