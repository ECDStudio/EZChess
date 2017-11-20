import React, { Component } from 'react';
import './App.css';
import Chess from './models/Chess';
import ChessBoard from './components/ChessBoard/ChessBoard';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';
import PointOfView from './components/PointOfView/PointOfView';
import socketIOClient from "socket.io-client";

class App extends Component {
  game = new Chess();

  state = {
    chess: this.game,
    view: 'white',
    endpoint: 'http://localhost:3001',
  }

  updateGame = (game) => {
    this.game = game;
    this.setState({
      chess: game,
    });
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('ToAPI', game);
  }

  updateView = (view) => {
    this.setState({
      view: view,
    })
  }

  resetGame = () => {
    this.state.chess.reset();
    this.updateGame(this.state.chess);
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('FromAPI', data => {
      this.game.turn = data.turn;
      this.game.players.player1.isTurn = data.players.player1.isTurn;
      this.game.players.player2.isTurn = data.players.player2.isTurn;
      this.setState({
        chess: this.game,
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
