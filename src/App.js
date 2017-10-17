import React, { Component } from 'react';
import './App.css';
import Chess from './models/Chess';
import ChessBoard from './components/ChessBoard/ChessBoard';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';
import PointOfView from './components/PointOfView/PointOfView';

class App extends Component {
  state = {
    chess: new Chess(),
    view: 'white',
  }

  updateGame = () => {
    this.setState({
      chess: this.state.chess,
    })
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

  render() {
    return (
      <div className={`chess-container ${this.state.view}`}>
        <ChessBoard game={this.state.chess} updateGame={this.updateGame} />
        <div className="hud">
          <TurnIndicator game={this.state.chess} />
          <PointOfView game={this.state.chess} current={this.state.view} updateView={this.updateView} />
          <div>
            <a onClick={() => this.resetGame()}>Reset Game</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
