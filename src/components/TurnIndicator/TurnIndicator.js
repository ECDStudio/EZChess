import React, { Component } from 'react';

class TurnIndicator extends Component {
  render() {
    let game = this.props.game;
    let currentTurn;
  
    for (let player in game.players) {
      if (game.players[player].isTurn === true) {
        currentTurn = game.players[player].side;
      }
    }
    return (
      <div>
        Current Turn: {currentTurn}
      </div>
    );
  }
}

export default TurnIndicator;
