import { connect } from 'react-redux';
import { subscribeToWS } from '../../redux/actions/socketActions';
import {teamUrl} from '../../redux/actions/urls'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group, Image } from 'react-konva';
import Moveable from './Moveable';
import { playerImages } from './constants';
import URLImage from './URLImage';
import json_map from './map';
import image_addresses from './images_src';
import loadedImages from './loadedImages';
import { ensureDirectoryExists } from 'jest-snapshot/build/utils';
import _ from 'lodash';

class GameMap extends Component {
  constructor(props) {
    super(props);

    this.getEntitiesInRange = this.getEntitiesInRange.bind(this);
    this.changeUserPosition = this.changeUserPosition.bind(this);

    let widthSize = Math.ceil(window.innerWidth / 100);
    let heightSize = Math.ceil(window.innerHeight / 100);

    this.state = {
      direction: 'right',
      imageCounter: 0,
      position: {
        x: 100,
        y: 100,
      },

      canMove: true,

      prePosition: {
        x: null,
        y: null,
      },
      preDirection: '',

      cellWidth: 100,
      cellHeigh: 100,
      width: widthSize,
      height: heightSize,
    };
    this.imageCounter = 0;
    this.onKeyEvent = this.onKeyEvent.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.enableMoving(), 1000);
    subscribeToWS(teamUrl, () => this.handlePlayerLoc);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  enableMoving() {
    if (!this.state.canMove) {
      this.setState({ canMove: true });
    }
  }

  checkNextPosition(x, y) {
    let canMove = true;
    let playerInCell;

    let itemInCell = _.find(this.props.mapEntities, (item) => {
      return item.x === x && item.y === y;
    });
    if (itemInCell) {
      canMove = false;
    } else {
      playerInCell = _.find(this.props.players, (player) => {
        return player.x === x && player.y === y;
      });
      if (playerInCell) {
        canMove = false;
      }
    }

    return canMove;
  }

  handlePlayerLoc = newPlayer => {
    console.log(newPlayer);
    const { players } = this.state;
    let newPlayers = [newPlayer];
    players.forEach(player => {
      if (player.playerName !== newPlayer.playerName)
        newPlayers.push(player);
    });
    this.setState({ players: newPlayers })
  }

  onKeyEvent(key, e) {
    if (this.state.canMove) {
      // let canMove = this.checkNextPosition()
      let position = { ...this.state.position };

      let nextX = this.props.user.x;
      let nextY = this.props.user.y;

      switch (key) {
        case 'right':
          nextX += 1;
          // position.x += this.state.cellWidth;
          this.setState({ direction: key, position });
          break;
        case 'left':
          nextX -= 1;
          position.x -= this.state.cellWidth;
          this.setState({ direction: key, position });
          break;
        case 'up':
          nextY -= 1;
          position.y -= this.state.cellHeigh;
          this.setState({ direction: key, position });
          break;
        case 'down':
          nextY += 1;
          position.y += this.state.cellHeigh;
          this.setState({ direction: key, position });
          break;
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }

      if (this.checkNextPosition(nextX, nextY)) {
        this.setState({ canMove: false, imageCounter: this.state.imageCounter + 1 });
        this.props.movePlayer({
          x: nextX,
          y: nextY,
        });
      }

    }
  }

  changeUserPosition(e, startX, startY) {
    let x = e.target.attrs.x / this.state.cellWidth + startX;
    let y = e.target.attrs.y / this.state.cellHeigh + startY;

    if (!(x === this.props.user.x && y === this.props.user.y)) {
      if (0 <= x && x < this.props.width && 0 <= y && y < this.props.height) {
        let direction = '';
        if (x < this.props.user.x) {
          direction = 'left';
        } else if (x > this.props.user.x) {
          direction = 'right';
        } else if (y < this.props.user.y) {
          direction = 'up';
        } else if (y > this.props.user.y) {
          direction = 'down';
        }
        this.setState({ direction });

        this.props.movePlayer({
          x,
          y,
        });
      }
    }
  }

  getEntitiesInRange(mapStartX, mapStartY) {
    const xBound =
      mapStartX + this.state.width <= this.props.width
        ? mapStartX + this.state.width
        : this.props.width;
    const yBound =
      mapStartY + this.state.height <= this.props.height
        ? mapStartY + this.state.height
        : this.props.height;

    let newEntities = this.props.mapEntities.filter((entity) => {
      return (
        mapStartX <= entity.x &&
        entity.x < xBound &&
        mapStartY <= entity.y &&
        entity.y < yBound
      );
    });
    return newEntities;
  }

  render() {
    let mapStartX =
      this.props.user.x - Math.floor(Math.ceil(window.innerWidth / 100) / 2) >=
      0
        ? this.props.user.x - Math.floor(Math.ceil(window.innerWidth / 100) / 2)
        : 0;

    let mapStartY =
      this.props.user.y - Math.floor(Math.ceil(window.innerHeight / 100) / 2) >=
      0
        ? this.props.user.y -
          Math.floor(Math.ceil(window.innerHeight / 100) / 2)
        : 0;

    if (mapStartX + this.state.width > this.props.width) {
      mapStartX = this.props.width - this.state.width;
    }
    if (mapStartY + this.state.height > this.props.height) {
      mapStartY = this.props.height - this.state.height;
    }

    let newEntities = this.getEntitiesInRange(mapStartX, mapStartY);
    // console.log('in renderrrr');

    return (
      <>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={(stageEl) => (this.stageEl = stageEl)}
          // onMouseDown={this.deselectAllOnTouchStage}
          // onTouchStart={this.deselectAllOnTouchStage}
        >
          <Layer ref={(layerEl) => (this.backgroundLayer = layerEl)}>
            <Group>
              {[...Array(600)].map((e, i) => {
                // console.log(
                //   '??',
                //   loadedImages[
                //     process.env.PUBLIC_URL + '/images/sprites/floor2.png'
                //   ]
                // );

                return (
                  <>
                    <URLImage
                      x={(i % 15) * 100}
                      y={parseInt(i / 15) * 100 - 300}
                      src={
                        process.env.PUBLIC_URL + '/images/sprites/floor2.png'
                      }
                      width={100}
                      height={100}
                    />

                    {/* <Image
                      x={(i % 15) * 100}
                      y={parseInt(i / 15) * 100 - 300}
                      image={
                        loadedImages[
                          process.env.PUBLIC_URL + '/images/sprites/floor2.png'
                        ]
                      }
                      width={100}
                      height={100}
                    /> */}
                  </>
                );
              })}
            </Group>
          </Layer>
          <Layer ref={(layerEl) => (this.itemsLayer = layerEl)}>
            <Group>
              {newEntities.map((item) => {
                // console.log(
                //   'imageeeee:',
                //   item.name,
                //   image_addresses[item.name],
                //   loadedImages[image_addresses[item.name]]
                // );
                return (
                  <>
                    <URLImage
                      x={(item.x - mapStartX) * this.state.cellWidth}
                      y={(item.y - mapStartY) * this.state.cellHeigh}
                      src={image_addresses[item.name]}
                      width={this.state.cellWidth}
                      height={this.state.cellHeigh}
                    />

                    {/* <Image
                      x={(item.x - mapStartX) * this.state.cellWidth}
                      y={(item.y - mapStartY) * this.state.cellHeigh}
                      width={this.state.cellWidth}
                      height={this.state.cellHeigh}
                      image={loadedImages[image_addresses[item.name]]}
                    /> */}
                  </>
                );
              })}
            </Group>
          </Layer>
          <Layer ref={(layerEl) => (this.playersLayer = layerEl)}>
            <Group>
              {this.props.players.map((player) => {
                return (
                  <>
                    {/* <Image
                      x={(player.x - mapStartX) * this.state.cellWidth}
                      y={(player.y - mapStartY) * this.state.cellHeigh}
                      scale={0.5}
                      image={loadedImages[image_addresses['PLAYER']]}
                    /> */}

                    <URLImage
                      x={(player.x - mapStartX) * this.state.cellWidth}
                      y={(player.y - mapStartY) * this.state.cellHeigh}
                      src={image_addresses['PLAYER']}
                      scale={0.5}
                    />
                  </>
                );
              })}

              {/* <URLImage
                x={(this.props.user.x - mapStartX) * this.state.cellWidth}
                y={(this.props.user.y - mapStartY) * this.state.cellHeigh}
                src={image_addresses['PLAYER']}
                scale={0.5}
              /> */}

              <Moveable
                images={playerImages}
                direction={this.state.direction}
                x={(this.props.user.x - mapStartX) * this.state.cellWidth}
                y={(this.props.user.y - mapStartY) * this.state.cellHeigh}
                // imageCounter={this.imageCounter++}
                imageCounter={this.state.imageCounter}
              />
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


export default connect(null, {
  
})(GameMap);
