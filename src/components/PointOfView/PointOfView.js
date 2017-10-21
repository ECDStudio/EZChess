import React, { Component } from 'react';

class PointOfView extends Component {
  render() {
    return (
      <div>
        <a className={this.props.current === 'white' ? 'current' : ''}
             onClick={() => this.props.updateView('white')}>
          White
        </a>
        <a className={this.props.current === 'spec' ? 'current' : ''}
             onClick={() => this.props.updateView('spec')}>
          Spectator
        </a>
        <a className={this.props.current === 'black' ? 'current' : ''}
             onClick={() => this.props.updateView('black')}>
          Black
        </a>
      </div>
    );
  }
}

export default PointOfView;