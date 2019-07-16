import React, { Component } from 'react';
import className from 'classnames';
import socketIOClient from "socket.io-client";

import Chess from 'src/models/Chess';
import Queen from 'src/models/pieces/Queen';
import Pawn from 'src/models/pieces/Pawn';

import ChessBoard from 'src/components/ChessBoard';
import TurnIndicator from 'src/components/TurnIndicator/TurnIndicator';
import PointOfView from 'src/components/PointOfView/PointOfView';

import { API } from 'src/constants';

class Game extends Component {
  constructor() {
    super();

    this.game = new Chess();
  }

  componentDidMount() {
    const socket = socketIOClient(API);

    socket.on('FromAPI', this.mapDataFromApi);

    this.updateView();
  }

  componentDidUpdate(prevProps) {
    const { view } = this.props.match.params;

    if (prevProps.match.params.view !== view)
      this.updateView();
  }

  mapDataFromApi = data => {
    // methods from the models are not passed around as data
    // so we loop through individual properties and update them
    // to the actual this.game object
    const { game } = this;

    game.turn = data.turn;

    for (let p in game.players) {
      const player = game.players[p];

      player.isTurn = data.players[p].isTurn;

      for (let q in player.pieces) {
        const piece = player.pieces[q];

        for (let key of Object.keys(data.players[p].pieces[q])) {
          if (piece[key] === data.players[p].pieces[q][key]) continue;
          piece[key] = data.players[p].pieces[q][key]
        }
      }
    }

    this.forceUpdate();
  }

  resetGame = () => {
    this.game.reset();
    this.props.updateGame(this.game);
  }

  updateView = () => {
    const { updateView, match } = this.props;

    updateView(match.params.view);
  }

  render() {
    const { game } = this;
    const { view } = this.props;
    const classes = className({
      'chess-container': true,
      [view]: view,
    })

    return (
      <div className={ classes }>
        <ChessBoard game={ game } />
        <div className="hud">
          <TurnIndicator game={ game } />
          <PointOfView current={ view } />
          <a onClick={ this.resetGame }>Reset Game</a>
        </div>
      </div>
    );
  }
}

export default Game;
