import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Chess from 'src/models/Chess';

import Stage from './Stage';

import TurnIndicator from 'src/components/TurnIndicator';

import { API } from 'src/constants';

import './Home.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);

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

    return (
      <div className="Home">
        <Stage game={ game } />
        <div className="hud">
          <TurnIndicator game={ game } />
          <Link to="/classic">Classic Mode</Link>
        </div>
      </div>
    );
  }
}
