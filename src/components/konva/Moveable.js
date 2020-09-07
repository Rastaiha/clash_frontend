import React, { Component } from 'react';
import PropTypes from 'prop-types';
import URLImage from './URLImage';

export default class Moveable extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    direction: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    imageCounter: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  };
  render() {
    const { images, direction, x, y } = this.props;
    return (
      <URLImage
        ref={(moveable) => (this.moveable = moveable)}
        src={
          images[direction][this.props.imageCounter % images[direction].length]
        }
        x={x}
        y={y}
      />
    );
  }
}
