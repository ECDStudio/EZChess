import React, { Component } from 'react';

class PointOfView extends Component {
  render() {
    return (
      <div>
        <a className={this.props.current === 'white' ? 'current' : ''}
             onClick={() => this.props.updateView('white')}>
          Play as Player 1 (White)
        </a>
        <a className={this.props.current === 'black' ? 'current' : ''}
             onClick={() => this.props.updateView('black')}>
          Play as Player 2 (Black)
        </a>
        <a className={this.props.current === 'spec' ? 'current' : ''}
             onClick={() => this.props.updateView('spec')}>
          Watch as Spectator
        </a>
      </div>
    );
  }
}

export default PointOfView;