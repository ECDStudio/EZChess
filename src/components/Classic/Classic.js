import React, { Component } from 'react';
import className from 'classnames';
import socketIOClient from "socket.io-client";

import Chess from 'src/models/Chess';

import ChessBoard from './ChessBoard';
import TurnIndicator from './TurnIndicator/TurnIndicator';
import PointOfView from './PointOfView';

import { API } from 'src/constants';

import './Classic.scss';

class Classic extends Component {
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
    this.game.update(data)
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
      'Classic': true,
      [view]: view,
    })

    return (
      <div className={ classes }>
        <ChessBoard game={ game } />
        <div className="hud">
          <TurnIndicator game={ game } />
          <PointOfView current={ view } />
          <button onClick={ this.resetGame }>Reset Game</button>
        </div>
      </div>
    );
  }
}

export default Classic;
