import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chess from './models/Chess';

class App extends Component {
  chess = new Chess();

  render() {
    let currentTurn;

    for (let player in this.chess.players) {
      if (this.chess.players[player].isTurn === true) {
        currentTurn = this.chess.players[player].side;
      }
    }
    return (
      <div className="chess-container">
        <div className="chessboard">
        
        </div>
        <div>
          Current Turn: {currentTurn}
        </div>
      </div>
    );
  }
}

export default App;
