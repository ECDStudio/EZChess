import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames';
import socketIOClient from "socket.io-client";

import Chess from 'models/Chess';

import PointOfView from 'components/PointOfView';
import TurnIndicator from 'components/TurnIndicator';

import ChessBoard from './ChessBoard';

import { API } from 'constants.js';

import './Classic.scss';

class Classic extends Component {
  constructor() {
    super();

    this.game = new Chess();
  }

  componentDidMount() {
    const socket = socketIOClient(API);

    socket.on('FromAPI', data => {
      this.game.update(data)
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
          <PointOfView current={ view } classic />
          <button onClick={ this.resetGame }>Reset Game</button>
          <Link to="/">Modern Mode</Link>
        </div>
      </div>
    );
  }
}

export default Classic;
