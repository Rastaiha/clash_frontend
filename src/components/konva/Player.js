import React, { useState } from 'react';
import URLImage from './URLImage';
import { Group, Label, Sprite, Text, Tag, Rect } from 'react-konva';

const Button = ({ x, y, text, onClick }) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <Group
      x={x}
      y={y}
      onMouseOver={() => {
        setMouseOver(true);
      }}
      onMouseOut={() => {
        setMouseOver(false);
      }}
      onClick={onClick}
    >
      <Label>
        <Tag
          fill={mouseOver ? '#163b5e' : '#1585ed'}
          cornerRadius={5}
          stroke="black"
        />
        <Text text={text} fill="white" padding={5} align="center" />
      </Label>
    </Group>
  );
};

const UsernameBox = ({ username }) => {
  return (
    <Group>
      <Text text={username} strokeWidth={0.5} stroke="#1585ed" />
    </Group>
  );
};

class Player extends React.Component {
  onFightClick() {
    //send fight request
  }

  onCooperationClicked() {
    // send cooperation request
  }

  render() {
    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        ref={(player) => (this.player = player)}
      >
        {this.props.buttonsEnabled && (
          <Button x={-35} y={15} text="مبارزه" onClick={this.onFightClick} />
        )}
        {this.props.buttonsEnabled && (
          <Button
            x={30}
            y={15}
            text="حل سوال"
            onClick={this.onCooperationClicked}
          />
        )}

        <UsernameBox username={this.props.username} />

        <Sprite
          x={0}
          y={13}
          ref={(sprite) => (this.spriteNode = sprite)}
          image={this.props.image}
          animation={this.props.animation}
          animations={this.props.animations}
          frameRate={5}
        />
      </Group>
    );
  }
}

export default Player;
