import React, { Component } from 'react';

import './TurnIndicator.scss';

class TurnIndicator extends Component {
  render() {
    const { game } = this.props;
    let currentTurn;
  
    for (let player of Object.values(game.players)) {
      if (!player.isTurn) continue;
      currentTurn = player.side;
    }

    return (
      <div className="TurnIndicator">
        Current Turn: <span>{ currentTurn }</span>
      </div>
    );
  }
}

export default TurnIndicator;
