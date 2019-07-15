import React, { Component } from 'react';

class TurnIndicator extends Component {
  render() {
    const { game } = this.props;
    let currentTurn;
  
    for (let player of Object.values(game.players)) {
      if (!player.isTurn) continue;
      currentTurn = player.side;
    }

    return (
      <div className="current-turn">
        Current Turn: <span>{ currentTurn }</span>
      </div>
    );
  }
}

export default TurnIndicator;
