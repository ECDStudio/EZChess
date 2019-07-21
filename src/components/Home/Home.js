import React, { Component } from 'react';
import Stage from './Stage';

import './Home.scss';

const EASE_FACTOR = 0.1;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.targetRotate = { x: 0, y: 0 };
    this.rotate = { x: 0, y: 0 };

    this.targetZoom = 0;
    this.zoom = 0;

    this.state = {
      selectedPiece: null
    }
  }

  componentDidMount() {
    this.scene = new Stage(this.stage)
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedPiece !== this.state.selectedPiece) console.log(this.state.selectedPiece)
  }

  onTick = () => {
    const { selectedPiece, showPossibleTargets, rotate, zoom } = this.scene;

    this.raf = window.requestAnimationFrame( this.onTick );

    this.rotate = {
      x: this.rotate.x + ((this.targetRotate.x - this.rotate.x) * EASE_FACTOR),
      y: this.rotate.y + ((this.targetRotate.y - this.rotate.y) * EASE_FACTOR),
    }
    rotate(this.rotate);

    this.zoom = this.zoom + ((this.targetZoom - this.zoom) * EASE_FACTOR);
    zoom(this.zoom);

    if (selectedPiece && selectedPiece !== this.state.selectedPiece) {
      this.setState({ selectedPiece }, () => {
        showPossibleTargets([])
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
    return (
      <div className="Home">
        <div ref={ el => this.stage = el } />
      </div>
    );
  }
}
