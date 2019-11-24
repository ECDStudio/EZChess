import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Chess from 'models/Chess';

import ThreeScene from './ThreeScene';

import PointOfView from 'components/PointOfView';
import TurnIndicator from 'components/TurnIndicator';

import { API } from 'constants.js';

import './Home.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.game = new Chess();

    this.state = { ready: false };
  }

  componentDidMount() {
    const socket = socketIOClient(API);

    socket.on('FromAPI', data => {
      this.game.update(data);
      if (!this.state.ready) this.setState({ ready: true });
    });

    this.updateView();
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match.params;

    if (prevProps.match.params !== params)
      this.updateView();
  }

  resetGame = () => {
    this.setState({ ready: false }, () => {
      this.game.reset();
      this.props.updateGame(this.game);
    });
  }

  updateView = () => {
    const { match, updateView } = this.props;

    updateView(match.params[0]);
  }

  render() {
    const { view } = this.props;
    const { game } = this;

    return (
      <div className="Home">
        { this.state.ready && <ThreeScene game={ game } view={ view } /> }
        <div className="hud">
          <TurnIndicator game={ game } />
          <PointOfView current={ view } />
          <button onClick={ this.resetGame }>Reset Game</button>
          <Link to="/classic">Classic Mode</Link>
          <p>3D models credit: Jarlan Perez (https://poly.google.com/user/4lZfAdz3x3X)</p>
        </div>
      </div>
    );
  }
}
