import React, { Component } from 'react';
import './App.css';
import Chess from './models/Chess';
import Queen from './models/pieces/Queen';
import ChessBoard from './components/ChessBoard/ChessBoard';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';
import PointOfView from './components/PointOfView/PointOfView';
import socketIOClient from "socket.io-client";

class App extends Component {
  game = new Chess();
  api = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001';

  state = {
    chess: this.game,
    view: 'spec',
  }

  updateGame = (game) => {
    this.game = game;
    this.setState({
      chess: game,
    });
    const socket = socketIOClient(this.api);
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
    const socket = socketIOClient(this.api);
    socket.on('FromAPI', data => {
      this.game.turn = data.turn;
      for (let p in this.game.players) {
        this.game.players[p].isTurn = data.players[p].isTurn;
        for (let q in this.game.players[p].pieces) {
          const piece = this.game.players[p].pieces[q];
          piece.position = data.players[p].pieces[q].position;
          piece.step = data.players[p].pieces[q].step;
          // Detect Pawn Promotion here
          if (piece.class === 'pawn' &&
            ((piece.side === 'white' && piece.position.x === 7) ||
            (piece.side ==='black' && piece.position.x === 0))) {
            this.game.players[p].pieces[q] = new Queen(piece.side, piece.position.x, piece.position.y);
          }
        }
      }
      this.setState({
        chess: this.game,
      });
    });
  }

  render() {
    return (
      <div className={`chess-container ${this.state.view}`}>
        <ChessBoard game={this.state.chess} view={this.state.view} updateGame={this.updateGame} />
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
