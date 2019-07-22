import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PointOfView extends Component {
  render() {
    const { current } = this.props;

    return (
      <div>
        <Link className={ current === 'white' ? 'current' : '' } to="/classic/white">
          Play as Player 1 (White)
        </Link>
        <Link className={ current === 'black' ? 'current' : '' } to="/classic/black">
          Play as Player 2 (Black)
        </Link>
        <Link className={ current !== 'white' && current !== 'black' ? 'current' : '' } to="/classic">
          Watch as Spectator
        </Link>
      </div>
    );
  }
}

export default PointOfView;