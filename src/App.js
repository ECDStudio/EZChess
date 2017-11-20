import React, { Component } from 'react';
import './App.css';
import Chess from './models/Chess';
import ChessBoard from './components/ChessBoard/ChessBoard';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';
import PointOfView from './components/PointOfView/PointOfView';
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    chess: new Chess(),
    view: 'white',
    endpoint: 'http://localhost:3001',
  }

  updateGame = (g) => {
    this.setState({
      chess: g,
    });
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('ToAPI', g);
  }

  updateView = (view) => {
    this.setState({
      view: view,
    })
  }

  resetGame = () => {
    this.state.chess.reset();
    this.updateGame();
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('FromAPI', data => {
      console.log(data);
    this.setState({
      chess: data,
    });
    });
  }

  render() {
    return (
      <div className={`chess-container ${this.state.view}`}>
        <ChessBoard game={this.state.chess} updateGame={this.updateGame} />
        <div className="hud">
          <TurnIndicator game={this.state.chess} />
          <PointOfView game={this.state.chess} current={this.state.view} updateView={this.updateView} />
          <div>
            <a onClick={() => this.resetGame()}>
              Reset Game
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
