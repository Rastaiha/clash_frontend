import _ from 'lodash';
import React, { Component } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Group, Layer, Sprite, Stage } from 'react-konva';
import { connect } from 'react-redux';
import { subscribeToWS } from '../../redux/actions/socketActions';
import { teamUrl } from '../../redux/actions/urls';
import image_addresses from './images_src';
import Player from './Player';
import URLImage from './URLImage';

class GameMap extends Component {
  constructor(props) {
    super(props);

    this.getEntitiesInRange = this.getEntitiesInRange.bind(this);

    let widthSize = Math.ceil(window.innerWidth / 100);
    let heightSize = Math.ceil(window.innerHeight / 100);

    this.state = {
      direction: 'down',
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

      soldierImage: null,

      cellWidth: 100,
      cellHeight: 100,
      width: widthSize,
      height: heightSize,
    };
    this.imageCounter = 0;
    this.onKeyEvent = this.onKeyEvent.bind(this);
  }

  componentDidMount() {
    const image = new Image();
    image.src =
      process.env.PUBLIC_URL + '/images/sprites/soldiers/soldier6.png';
    image.onload = () => {
      this.setState({ soldierImage: image });
    };

    subscribeToWS(teamUrl, () => this.handlePlayerLoc);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

  getAnimations() {
    let height = 32;
    const animations = {
      down: [0, 0, 30, height, 30, 0, 30, height, 30, 0, 30, height],
      left: [
        0,
        height * 1,
        30,
        height,
        30,
        height * 1,
        30,
        height,
        30,
        height * 1,
        30,
        height,
      ],
      right: [
        0,
        height * 2,
        30,
        height,
        30,
        height * 2,
        30,
        height,
        30,
        height * 2,
        30,
        height,
      ],
      up: [
        0,
        height * 3,
        30,
        height,
        30,
        height * 3,
        30,
        height,
        30,
        height * 3,
        30,
        height,
      ],
    };
    return animations;
  }

  handlePlayerLoc = (newPlayer) => {
    console.log(newPlayer);
    const { players } = this.state;
    let newPlayers = [newPlayer];
    players.forEach((player) => {
      if (player.playerName !== newPlayer.playerName) newPlayers.push(player);
    });
    this.setState({ players: newPlayers });
  };

  onKeyEvent(key, e, startX, startY) {
    if (this.state.canMove) {
      let position = { ...this.state.position };

      let nextX = this.props.user.x;
      let nextY = this.props.user.y;

      switch (key) {
        case 'right':
          nextX += 1;
          break;
        case 'left':
          nextX -= 1;
          position.x -= this.state.cellWidth;
          break;
        case 'up':
          nextY -= 1;
          position.y -= this.state.cellHeight;
          break;
        case 'down':
          nextY += 1;
          position.y += this.state.cellHeight;
          break;
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }

      if (this.checkNextPosition(nextX, nextY)) {
        this.setState({
          canMove: false,
          imageCounter: this.state.imageCounter + 1,
          direction: key,
        });

        let preX = this.userSprite.x();
        let preY = this.userSprite.y();

        this.showAnimation(nextX, nextY, startX, startY);

        setTimeout(() => {
          this.userSprite.absolutePosition({
            x: preX,
            y: preY,
          });
          this.userSprite.stop();

          this.props.movePlayer({
            x: nextX,
            y: nextY,
          });
          this.setState({ canMove: true });
        }, 1000);
      }
    }
  }

  showAnimation(nextX, nextY, startX, startY) {
    this.userSprite.start();
    this.userSprite.to({
      x: (nextX - startX) * this.state.cellWidth + this.state.cellWidth / 2,
      y: (nextY - startY) * this.state.cellHeight + this.state.cellHeight / 2,
      duration: 0.9,
    });
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

    return (
      <>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={(stageEl) => (this.stageEl = stageEl)}
        >
          <Layer ref={(layerEl) => (this.backgroundLayer = layerEl)}>
            <Group>
              {[...Array(600)].map((e, i) => {
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
                  </>
                );
              })}
            </Group>
          </Layer>
          <Layer ref={(layerEl) => (this.itemsLayer = layerEl)}>
            <Group>
              {newEntities.map((item) => {
                return (
                  <>
                    <URLImage
                      x={(item.x - mapStartX) * this.state.cellWidth}
                      y={(item.y - mapStartY) * this.state.cellHeight}
                      src={image_addresses[item.name]}
                      align="center"
                      width={this.state.cellWidth}
                      height={this.state.cellHeight}
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

                    <Player
                      // ref={(otherPlayer) => (this.otherPlayer = otherPlayer)}
                      x={
                        (player.x - mapStartX) * this.state.cellWidth +
                        this.state.cellWidth / 2
                      }
                      y={
                        (player.y - mapStartY) * this.state.cellHeight +
                        this.state.cellHeight / 2
                      }
                      src={image_addresses['PLAYER']}
                      scale={{
                        x: 1,
                        y: 1,
                      }}
                      onClick={this.onPlayerClick}
                    />

                    {/* <URLImage
                      x={(player.x - mapStartX) * this.state.cellWidth}
                      y={(player.y - mapStartY) * this.state.cellHeigh}
                      src={image_addresses['PLAYER']}
                      scale={0.5}
                    /> */}
                  </>
                );
              })}

              {/* <URLImage
                x={(this.props.user.x - mapStartX) * this.state.cellWidth}
                y={(this.props.user.y - mapStartY) * this.state.cellHeigh}
                src={image_addresses['PLAYER']}
                scale={0.5}
              /> */}

              <Sprite
                x={
                  (this.props.user.x - mapStartX) * this.state.cellWidth +
                  this.state.cellWidth / 2
                }
                y={
                  (this.props.user.y - mapStartY) * this.state.cellHeight +
                  this.state.cellHeight / 2
                }
                ref={(userSprite) => (this.userSprite = userSprite)}
                image={this.state.soldierImage}
                animation={this.state.direction}
                animations={this.getAnimations()}
                frameRate={5}
              />
            </Group>
          </Layer>
        </Stage>
        <KeyboardEventHandler
          handleKeys={['left', 'down', 'right', 'up']}
          onKeyEvent={(key, e) => {
            this.onKeyEvent(key, e, mapStartX, mapStartY);
          }}
        />
      </>
    );
  }
}

export default connect(null, {})(GameMap);
