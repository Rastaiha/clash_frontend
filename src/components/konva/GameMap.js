import _ from 'lodash';
import React, { Component } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Group, Layer, Sprite, Stage, Circle } from 'react-konva';
import { connect } from 'react-redux';
import { subscribeToWS } from '../../redux/actions/socketActions';
import { teamUrl } from '../../redux/actions/urls';
import image_addresses from './images_src';
import Player from './Player';
import URLImage from './URLImage';
import { animations } from './animationsUtills';
import { getmapData, getPlayerStatus } from '../../redux/actions/map';

class GameMap extends Component {
  constructor(props) {
    super(props);

    this.getEntitiesInRange = this.getEntitiesInRange.bind(this);
    this.secondOnKeyEvent = this.secondOnKeyEvent.bind(this);

    let widthSize = Math.ceil(window.innerWidth / 100);
    let heightSize = Math.ceil(window.innerHeight / 100);

    this.state = {
      direction: 'down',
      imageCounter: 0,
      position: {
        x: 100,
        y: 100,
      },

      entitiesInMap: [],
      otherPlayers: [],

      canMove: true,

      prePosition: {
        x: null,
        y: null,
      },
      preDirection: '',

      soldierImage: null,
      otherPlayersImage: null,

      cellWidth: 100,
      cellHeight: 100,
      width: widthSize,
      height: heightSize,
    };
    this.imageCounter = 0;
    this.onKeyEvent = this.onKeyEvent.bind(this);
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.players !== this.props.players) {
      var changedPlayers = preProps.players.filter((player) => {
        return this.props.players.indexOf(player) === -1;
      });

      changedPlayers.forEach((player) => {
        const curPlayer = _.find(this.props.players, {
          username: player.username,
        });
        this.handleChangedPlayer(player, curPlayer);
      });
    }
  }

  handleChangedPlayer(prePlayer, curPlayer) {
    let deltaX = curPlayer.x - prePlayer.x;
    let deltaY = curPlayer.y - prePlayer.y;

    let direction = 'right';
    if (deltaX === 0) {
      direction = deltaY > 0 ? 'down' : 'up';
    } else {
      direction = deltaX > 0 ? 'right' : 'left';
    }

    this.state.otherPlayers[prePlayer.username].spriteNode.animation(direction);
    this.state.otherPlayers[prePlayer.username].spriteNode.start();
    this.state.otherPlayers[prePlayer.username].player.to({
      x:
        this.state.otherPlayers[prePlayer.username].player.x() +
        deltaX * this.state.cellWidth,
      y:
        this.state.otherPlayers[prePlayer.username].player.y() +
        deltaY * this.state.cellHeight,
      duration: 0.9,
    });

    setTimeout(() => {
      this.state.otherPlayers[prePlayer.username].spriteNode.stop();
    }, 1000);
  }

  componentDidMount() {
    this.props.getPlayerStatus();
    // this.props.getmapData();
    const image = new Image();
    image.src =
      process.env.PUBLIC_URL + '/images/sprites/soldiers/soldier5.png';
    image.onload = () => {
      this.setState({ soldierImage: image });
    };

    const image2 = new Image();
    image2.src =
      process.env.PUBLIC_URL + '/images/sprites/soldiers/soldier1.png';
    image2.onload = () => {
      this.setState({ otherPlayersImage: image2 });
    };

    subscribeToWS(teamUrl, () => this.handlePlayerLoc);
  }

  checkNextPosition(x, y) {
    let canMove = true;
    let playerInCell;

    let itemInCell = _.find(this.props.mapEntities, (item) => {
      return item.x === x && item.y === y;
    });
    if (itemInCell && itemInCell.name !== 'MOTEL') {
      canMove = false;
    } else {
      playerInCell = _.find(this.props.players, (player) => {
        return player.x === x && player.y === y;
      });
      if (playerInCell) {
        canMove = false;
      }
    }

    if (x < 0 || x >= this.props.width || y < 0 || y >= this.props.height) {
      canMove = false;
    }

    return canMove;
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

  secondOnKeyEvent(key, e, startX, startY) {
    if (this.state.canMove) {
      let nextX = this.props.user.x;
      let nextY = this.props.user.y;

      let deltaX = 0;
      let deltaY = 0;

      switch (key) {
        case 'right':
          nextX += 1;
          deltaX += -1;
          break;
        case 'left':
          nextX -= 1;
          deltaX = 1;
          break;
        case 'up':
          nextY -= 1;
          deltaY = 1;
          break;
        case 'down':
          nextY += 1;
          deltaY = -1;
          break;
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }

      this.setState({direction: key})

      if (this.checkNextPosition(nextX, nextY)) {
        let horizontalCheck = key === 'right' || key === 'down' ? 1 : 0;
        let verticalCheck = key === 'right' || key === 'down' ? 0 : -1;

        if (key === 'right' || key === 'left') {
          if (
            nextX + Math.ceil(this.state.width / 2) <
              this.props.width + horizontalCheck &&
            nextX - Math.ceil(this.state.width / 2) >= 0 + verticalCheck
          ) {
            console.log('1.move map');
            this.moveMap(key, startX, startY, nextX, nextY, deltaX, deltaY);
          } else {
            console.log('1.move player');
            this.movePlayer(key, nextX, nextY, startX, startY);
          }
        } else {
          if (
            nextY + Math.ceil(this.state.height / 2) <
              this.props.height + horizontalCheck &&
            nextY - Math.ceil(this.state.height / 2) >= 0 + verticalCheck
          ) {
            console.log('2.move map');
            this.moveMap(key, startX, startY, nextX, nextY, deltaX, deltaY);
          } else {
            console.log('2.move player');
            this.movePlayer(key, nextX, nextY, startX, startY);
          }
        }
      }
    }
  }

  moveMap(key, startX, startY, nextX, nextY, deltaX, deltaY) {
    this.setState({
      canMove: false,
      imageCounter: this.state.imageCounter + 1,
    });

    // const entitiesInMap = this.getEntitiesInRange(startX, startY);
    this.userSprite.start();

    this.moveItemsLayer(deltaX, deltaY);

    this.props.players.forEach((player) => {
      this.moveOtherPlayers(
        player.username,
        (player.x - startX + deltaX) * this.state.cellWidth +
          this.state.cellWidth / 2,
        (player.y - startY + deltaY) * this.state.cellHeight +
          this.state.cellHeight / 2
      );
    });

    this.moveBackground(deltaX, deltaY);

    setTimeout(() => {
      this.userSprite.stop();

      this.props.movePlayer({
        x: nextX,
        y: nextY,
      });

      this.backgroundLayer.x(
        this.backgroundLayer.x() - deltaX * this.state.cellWidth
      );
      this.backgroundLayer.y(
        this.backgroundLayer.y() - deltaY * this.state.cellHeight
      );

      this.itemsLayer.x(this.itemsLayer.x() - deltaX * this.state.cellWidth);
      this.itemsLayer.y(this.itemsLayer.y() - deltaY * this.state.cellHeight);

      this.setState({ canMove: true });
    }, 1000);
  }

  moveBackground(deltaX, deltaY) {
    this.backgroundLayer.to({
      x: this.backgroundLayer.x() + deltaX * this.state.cellWidth,
      y: this.backgroundLayer.y() + deltaY * this.state.cellHeight,
      duration: 0.9,
    });
  }

  moveItemsLayer(deltaX, deltaY) {
    this.itemsLayer.to({
      x: this.itemsLayer.x() + deltaX * this.state.cellWidth,
      y: this.itemsLayer.y() + deltaY * this.state.cellHeight,
      duration: 0.9,
    });
  }

  moveEntities(id, newX, newY) {
    this.state.entitiesInMap[id].imageNode.to({
      x: newX,
      y: newY,
      duration: 0.9,
    });
  }

  moveOtherPlayers(username, newX, newY) {
    this.state.otherPlayers[username].player.to({
      x: newX,
      y: newY,
      duration: 0.9,
    });
  }

  onKeyEvent(key, e, startX, startY) {
    if (this.state.canMove) {
      let nextX = this.props.user.x;
      let nextY = this.props.user.y;

      switch (key) {
        case 'right':
          nextX += 1;
          break;
        case 'left':
          nextX -= 1;
          break;
        case 'up':
          nextY -= 1;
          break;
        case 'down':
          nextY += 1;
          break;
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }

      if (this.checkNextPosition(nextX, nextY)) {
        this.movePlayer(key, nextX, nextY, startX, startY);
      }
    }
  }

  movePlayer(key, nextX, nextY, startX, startY) {
    this.setState({
      canMove: false,
      imageCounter: this.state.imageCounter + 1,
      direction: key,
    });

    let preX = this.userSprite.x();
    let preY = this.userSprite.y();

    this.showAnimation(nextX, nextY, startX, startY);

    setTimeout(() => {
      this.userSprite.stop();

      this.userSprite.absolutePosition({
        x: preX,
        y: preY,
      });

      this.props.movePlayer({
        x: nextX,
        y: nextY,
      });

      this.setState({ canMove: true });
    }, 1000);
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
    let xBound =
      mapStartX + this.state.width < this.props.width
        ? mapStartX + this.state.width
        : this.props.width;
    let yBound =
      mapStartY + this.state.height < this.props.height
        ? mapStartY + this.state.height
        : this.props.height;

    xBound += 1;
    yBound += 1;

    let newEntities = this.props.mapEntities.filter((entity) => {
      return (
        mapStartX - 1 <= entity.x &&
        entity.x < xBound &&
        mapStartY - 1 <= entity.y &&
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
                      x={(i % 19) * 100 - 200}
                      y={parseInt(i / 19) * 100 - 200}
                      src={
                        process.env.PUBLIC_URL + '/images/sprites/floor2.png'
                      }
                      width={this.state.cellWidth}
                      height={this.state.cellHeight}
                    />
                  </>
                );
              })}
              {[...Array(600)].map((e, i) => {
                return (
                  <>
                    <URLImage
                      x={(i % 19) * 100 - 150}
                      y={parseInt(i / 19) * 100 - 150}
                      src={
                        process.env.PUBLIC_URL + '/images/sprites/floor2.png'
                      }
                      width={this.state.cellWidth}
                      height={this.state.cellHeight}
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
                      ref={(entity) =>
                        (this.state.entitiesInMap[item.id] = entity)
                      }
                      x={(item.x - mapStartX) * this.state.cellWidth}
                      y={
                        (item.y - mapStartY) * this.state.cellHeight -
                        (item.height - 1) * this.state.cellHeight
                      }
                      src={image_addresses[item.name]}
                      width={this.state.cellWidth * item.width}
                      height={this.state.cellHeight * item.height}
                    />
                  </>
                );
              })}
            </Group>
          </Layer>
          <Layer ref={(layerEl) => (this.playersLayer = layerEl)}>
            <Group>
              {this.props.players.map((player) => {
                const distanceFromUser =
                  Math.abs(player.x - this.props.user.x) +
                  Math.abs(player.y - this.props.user.y);
                return (
                  <>
                    <Player
                      x={
                        (player.x - mapStartX) * this.state.cellWidth +
                        this.state.cellWidth / 2
                      }
                      y={
                        (player.y - mapStartY) * this.state.cellHeight +
                        this.state.cellHeight / 2
                      }
                      ref={(otherPlayer) =>
                        (this.state.otherPlayers[player.username] = otherPlayer)
                      }
                      buttonsEnabled={distanceFromUser <= 3 ? true : false}
                      username={player.username}
                      image={this.state.otherPlayersImage}
                      animation={'down'}
                      animations={animations}
                      frameRate={5}
                    />
                  </>
                );
              })}

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
                animations={animations}
                frameRate={5}
              />
            </Group>
          </Layer>
        </Stage>
        <KeyboardEventHandler
          handleKeys={['left', 'down', 'right', 'up']}
          onKeyEvent={(key, e) => {
            this.secondOnKeyEvent(key, e, mapStartX, mapStartY);
          }}
        />
      </>
    );
  }
}

export default connect(null, { getmapData, getPlayerStatus })(GameMap);
