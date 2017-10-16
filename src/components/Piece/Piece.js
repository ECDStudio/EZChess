import React, { Component } from 'react';

class Piece extends Component {
  render() {
    let style = {
      left: `${this.props.model.position.x * 12.5}%`,
      bottom: `${this.props.model.position.y * 12.5}%`
    }
    return (
      <li className={`chess-piece ${this.props.model.side} ${this.props.model.class}`} style={style}></li>
    )
  }
}

export default Piece;
