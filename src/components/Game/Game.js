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

    socket.on('FromAPI', data => {
      const { game } = this;

      game.turn = data.turn;
      for (let p in game.players) {
        game.players[p].isTurn = data.players[p].isTurn;
        for (let q in game.players[p].pieces) {
          const piece = game.players[p].pieces[q];
          const { position, step, type, enPassant, enPassTurn } = data.players[p].pieces[q];

          piece.position = position;
          piece.step = step;
          piece.type = type;
          if (enPassant) piece.enPassant = enPassant;
          if (enPassTurn) piece.enPassTurn = enPassTurn;

          // Watch for morphing from pawn revertion after game reset
          if (piece.type !== type && type === 'pawn')
            game.players[p].pieces[q] = new Pawn(data.players[p].side, ...position);
        }
      }
      this.watchPawnsPromotion(game);
      this.forceUpdate();
    });

    this.updateView();
  }

  componentDidUpdate(prevProps) {
    const { view } = this.props.match.params;

    if (prevProps.match.params.view !== view)
      this.updateView();
  }

  resetGame = () => {
    this.game.reset();
    this.props.updateGame(this.game);
  }

  watchPawnsPromotion = (game) => {
    // Used to detect if the updated state of the game has
    // any Pawn Promotion afer receiving emission from API
    for (let p in game.players) {
      for (let q in game.players[p].pieces) {
        const { type, side, position } = game.players[p].pieces[q];

        if (type === 'pawn' &&
          ((side === 'white' && position.x === 7) ||
          (side ==='black' && position.x === 0))) {
          game.players[p].pieces[q] = new Queen(side, position.x, position.y);
        }
      }
    }
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
