import React, { useState, useRef } from 'react';
import URLImage from './URLImage';
import { Group, Label, Sprite, Text, Tag, Rect } from 'react-konva';

const Button = ({ x, y, img, onClick }) => {
  const [mouseOver, setMouseOver] = useState(false);
  let groupRef = useRef(null);
  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      onMouseOver={() => {
        groupRef.current.getStage().container().style.cursor = 'pointer';
        setMouseOver(true);
      }}
      onMouseOut={() => {
        groupRef.current.getStage().container().style.cursor = 'default';
        setMouseOver(false);
      }}
      onClick={onClick}
      cursor="pointer"
    >
      {img ? (
        <URLImage
          cursor="pointer"
          style={{ cursor: 'pointer' }}
          src={img}
          width={20}
          height={20}
          cornerRadius={5}
          strokeWidth={4}
        />
      ) : null}
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
        <UsernameBox username={this.props.name || this.props.username} />
        {this.props.buttonsEnabled && (
          <Button
            x={-30}
            y={-15}
            onClick={this.onFightClick}
            img={process.env.PUBLIC_URL + '/images/war.png'}
          />
        )}
        {this.props.buttonsEnabled && (
          <Button
            x={40}
            y={-15}
            img={process.env.PUBLIC_URL + '/images/think.png'}
            onClick={this.onCooperationClicked}
          />
        )}

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
