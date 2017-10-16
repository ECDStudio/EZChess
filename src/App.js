import React, { Component } from 'react';
import './App.css';
import Chess from './models/Chess';
import ChessBoard from './components/ChessBoard/ChessBoard';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';

class App extends Component {
  chess = new Chess();

  render() {
    return (
      <div className="chess-container">
        <ChessBoard game={this.chess} />
        <TurnIndicator game={this.chess} />
      </div>
    );
  }
}

export default App;
