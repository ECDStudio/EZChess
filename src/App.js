import React, { Component } from 'react';
import './App.css';
import Chess from './models/Chess';
import TurnIndicator from './TurnIndicator/TurnIndicator';

class App extends Component {
  chess = new Chess();

  render() {
    return (
      <div className="chess-container">
        <div className="chessboard">
          <ul>
          </ul>
          <ul>
          </ul>
        </div>
        <TurnIndicator game={this.chess} />
      </div>
    );
  }
}

export default App;
