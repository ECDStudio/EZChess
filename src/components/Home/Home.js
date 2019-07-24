import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import Chess from 'src/models/Chess';

import ThreeScene from './ThreeScene';

import TurnIndicator from 'src/components/TurnIndicator';

import { API } from 'src/constants';

import './Home.scss';

const EASE_FACTOR = 0.1;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.game = new Chess();

    this.targetRotate = { x: 0, y: 0 };
    this.rotate = { x: 0, y: 0 };

    this.targetZoom = 0;
    this.zoom = 0;

    this.state = {
      selectedPiece: null
    }
  }

  componentDidMount() {
    const socket = socketIOClient(API);

    socket.on('FromAPI', data => {
      this.game.update(data);
      this.scene.update(this.game);
      this.forceUpdate();
    });

    this.updateView();

    this.scene = new ThreeScene(this.stage);

    for (let player of Object.values(this.game.players)) {
      for (let piece of Object.values(player.pieces))
        this.scene.setupPiece(piece)
    }

    this.raf = window.requestAnimationFrame( this.onTick );

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mousewheel', this.handleMouseWheel);
    window.addEventListener('resize', this.scene.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mousewheel', this.handleMouseWheel);
    window.removeEventListener('resize', this.scene.resize);
  }

  componentDidUpdate(prevProps) {
    const { view } = this.props.match.params;

    if (prevProps.match.params.view !== view)
      this.updateView();
  }

  resetGame = () => {
    this.game.reset();
    this.props.updateGame(this.game);
    this.scene.update(this.game);
  }

  updateView = () => {
    const { updateView, match } = this.props;

    updateView(match.params.view);
  }

  onTick = () => {
    const { selectedPiece, showPossibleTargets, rotate, zoom } = this.scene;

    this.raf = window.requestAnimationFrame( this.onTick );

    // this.rotate = {
    //   x: this.rotate.x + ((this.targetRotate.x - this.rotate.x) * EASE_FACTOR),
    //   y: this.rotate.y + ((this.targetRotate.y - this.rotate.y) * EASE_FACTOR),
    // }
    // rotate(this.rotate);

    // this.zoom = this.zoom + ((this.targetZoom - this.zoom) * EASE_FACTOR);
    // zoom(this.zoom);

    if (selectedPiece && selectedPiece !== this.state.selectedPiece) {
      this.setState({ selectedPiece }, () => {
        showPossibleTargets(selectedPiece.availableMoves(this.props.game))
      })
    }
  }

  handleMouseMove = e => {
    const { innerWidth, innerHeight } = window;

    this.targetRotate = {
      x: (e.clientX - innerWidth / 2) / innerWidth * 2,
      y: (e.clientY - innerHeight / 2) / innerHeight * 2,
    }
  }

  handleMouseWheel = e => {
    this.targetZoom = this.targetZoom - e.deltaY;
    this.targetZoom = Math.min(this.targetZoom, 10);
    this.targetZoom = Math.max(this.targetZoom, -2);
  }

  render() {
    const { game } = this;

    return (
      <div className="Home">
        <div ref={ el => this.stage = el } />
        <div className="hud">
          <TurnIndicator game={ game } />
          <button onClick={ this.resetGame }>Reset Game</button>
          <Link to="/classic">Classic Mode</Link>
          <p>3D models credit: Jarlan Perez (https://poly.google.com/user/4lZfAdz3x3X)</p>
        </div>
      </div>
    );
  }
}
