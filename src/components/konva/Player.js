import React from 'react';
import URLImage from './URLImage';
import { Group, Label } from 'konva';

const Button = (props) => {
  return (
    <Group>
      <Label>salam</Label>
    </Group>
  )
}

class Player extends React.Component {
  render() {
    return (
      <>
        <URLImage
          ref={(player) => (this.player = player)}
          x={this.props.x}
          y={this.props.y}
          src={this.props.src}
          scale={this.props.scale}
          onMouseOver={this.props.onMouseOver}
          onClick={this.props.onClick}
        />
      </>
    );
  }
}

export default Player;
