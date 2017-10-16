import React, { Component } from 'react';
import './App.css';
import Chess from './models/Chess';
import ChessBoard from './components/ChessBoard/ChessBoard';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';

class App extends Component {
  state = {
    chess: new Chess(),
  }

  updateGame = () => {
    this.setState({
      chess: this.state.chess,
    })
  }

  render() {
    return (
      <div className="chess-container">
        <ChessBoard game={this.state.chess} updateGame={this.updateGame} />
        <TurnIndicator game={this.state.chess} />
      </div>
    );
  }
}

export default App;
