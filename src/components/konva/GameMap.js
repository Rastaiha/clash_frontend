import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import Moveable from './Moveable';
import { playerImages } from './constants';
import URLImage from './URLImage';
import json_map from './map';

export default class GameMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'right',
      position: {
        x: 100,
        y: 100,
      },
    };
    this.imageCounter = 0;
    this.onKeyEvent = this.onKeyEvent.bind(this);
  }
  onKeyEvent(key, e) {
    let position = { ...this.state.position };
    switch (key) {
      case 'right':
        position.x += 10;
        this.setState({ direction: key, position });
        break;
      case 'left':
        position.x -= 10;
        this.setState({ direction: key, position });
        break;
      case 'up':
        position.y -= 10;
        this.setState({ direction: key, position });
        break;
      case 'down':
        position.y += 10;
        this.setState({ direction: key, position });
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  }
  render() {
    return (
      <>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={(stageEl) => (this.stageEl = stageEl)}
          onMouseDown={this.deselectAllOnTouchStage}
          onTouchStart={this.deselectAllOnTouchStage}
        >
          <Layer ref={(layerEl) => (this.backgroundLayer = layerEl)}>
            <Group>
              {[...Array(400)].map((e, i) => (
                <URLImage
                  x={(i % 10) * 150}
                  y={parseInt(i / 10) * 150 - 300}
                  src={process.env.PUBLIC_URL + '/images/sprites/floor2.png'}
                  width={150}
                  height={150}
                />
              ))}
            </Group>
          </Layer>
          <Layer ref={(layerEl) => (this.layerEl = layerEl)}>
            <Group>
              {json_map.half_trees.instances.map((half_tree, i) => (
                <URLImage
                  x={half_tree.x}
                  y={half_tree.y}
                  src={json_map.half_trees.img}
                  width={json_map.half_trees.size.width}
                  height={json_map.half_trees.size.height}
                />
              ))}
              <Moveable
                images={playerImages}
                direction={this.state.direction}
                x={this.state.position.x}
                y={this.state.position.y}
                imageCounter={this.imageCounter++}
              />
              {json_map.trees.instances.map((tree, i) => (
                <URLImage
                  x={tree.x}
                  y={tree.y}
                  src={json_map.trees.img}
                  width={json_map.trees.size.width}
                  height={json_map.trees.size.height}
                />
              ))}
              {json_map.abolhol.instances.map((abolhol, i) => (
                <URLImage
                  x={abolhol.x}
                  y={abolhol.y}
                  src={json_map.abolhol.img}
                  width={json_map.abolhol.size.width}
                  height={json_map.abolhol.size.height}
                />
              ))}
            </Group>
          </Layer>
        </Stage>
        <KeyboardEventHandler
          handleKeys={['left', 'down', 'right', 'up']}
          onKeyEvent={this.onKeyEvent}
        />
      </>
    );
  }
}
