import _ from 'lodash';
import React, { Component } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Group, Layer, Sprite, Stage } from 'react-konva';
import { connect } from 'react-redux';
import image_addresses from './images_src';
import Player from './Player';
import URLImage from './URLImage';
import { animations } from './animationsUtills';
import {
  getMapData,
  getPlayerStatus,
  getPlayers,
  movePlayer,
} from '../../redux/actions/map';
import { Button } from 'semantic-ui-react';
import './style.css';

class GameMap extends Component {
  constructor(props) {
    super(props);

    this.getEntitiesInRange = this.getEntitiesInRange.bind(this);
    this.getPlayersInRange = this.getPlayersInRange.bind(this);
    this.onKeyEvent = this.onKeyEvent.bind(this);
    this.getCompassAngle = this.getCompassAngle.bind(this);
    this.onStageClicked = this.onStageClicked.bind(this);

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

      soldierImage: null,
      otherPlayersImage: null,

      cellWidth: 100,
      cellHeight: 100,
      width: widthSize,
      height: heightSize,

      imageLoading: true,
      dataLoading: -3,
    };
    this.imageCounter = 0;
    this.onKeyEvent = this.onKeyEvent.bind(this);
  }

  loadedImagesCount = 0;
  loadedImages = {};
  preloadImages(imageNames) {
    imageNames.forEach((name) => {
      this.loadedImages[name] = new Image();
      this.loadedImages[name].onload = () => {
        this.loadedImagesCount++;
        if (this.loadedImagesCount >= imageNames.length) {
          this.setState({ imageLoading: false });
        }
      };
      this.loadedImages[name].src = name;
    });
  }

  componentDidMount() {
    this.preloadImages([
      process.env.PUBLIC_URL + '/images/sprites/soldiers/soldier5.png',
    ]);
    this.props.getPlayerStatus().then(() => {
      this.setState({ dataLoading: this.state.dataLoading + 1 });
    });
    this.props.getMapData().then(() => {
      this.setState({ dataLoading: this.state.dataLoading + 1 });
    });
    this.props.getPlayers({ myUsername: this.props.myUsername }).then(() => {
      this.setState({ dataLoading: this.state.dataLoading + 1 });
    });
    this.setState({
      soldierImage: this.loadedImages[
        process.env.PUBLIC_URL + '/images/sprites/soldiers/soldier5.png'
      ],
    });

    const image2 = new Image();
    image2.src =
      process.env.PUBLIC_URL + '/images/sprites/soldiers/soldier1.png';
    image2.onload = () => {
      this.setState({ otherPlayersImage: image2 });
    };
  }

  componentDidUpdate(preProps) {
    if (preProps.user !== this.props.user) {
      console.log('hererererererere');
    }

    if (preProps.players !== this.props.players) {
      var changedPlayers = this.props.players.filter((player) => {
        // console.log("babaaaaa:", player, preProps.players.indexOf(player))
        return preProps.players.indexOf(player) === -1;
      });

      changedPlayers.forEach((player) => {
        const curPlayer = _.find(this.props.players, {
          username: player.username,
        });
        // console.log("changed players:", player, curPlayer, player === curPlayer)
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

    // console.log("otherPlayers", this.state.otherPlayers, prePlayer.username)

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

  checkNextPosition(x, y) {
    let canMove = true;
    let playerInCell;

    let itemInCell = _.find(this.props.mapEntities, (item) => {
      return item.x === x && item.y === y;
    });
    if (itemInCell && itemInCell.type !== 'MOTEL') {
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

  onKeyEvent(key, e, startX, startY) {
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

      this.setState({ direction: key });

      if (this.checkNextPosition(nextX, nextY)) {
        this.setState({
          canMove: false,
        });
        this.props.movePlayer({
          x: nextX,
          y: nextY,
        });
        setTimeout(() => {
          this.setState({
            canMove: true,
          });
        }, 100);

        // let horizontalCheck = key === 'right' || key === 'down' ? 1 : 0;
        // let verticalCheck = key === 'right' || key === 'down' ? 0 : -1;

        // if (key === 'right' || key === 'left') {
        //   if (
        //     nextX + Math.ceil(this.state.width / 2) <
        //       this.props.width + horizontalCheck &&
        //     nextX - Math.ceil(this.state.width / 2) >= 0 + verticalCheck
        //   ) {
        //     this.moveMap(key, startX, startY, nextX, nextY, deltaX, deltaY);
        //   } else {
        //     this.movePlayer(key, nextX, nextY, startX, startY);
        //   }
        // } else {
        //   if (
        //     nextY + Math.ceil(this.state.height / 2) <
        //       this.props.height + horizontalCheck &&
        //     nextY - Math.ceil(this.state.height / 2) >= 0 + verticalCheck
        //   ) {
        //     this.moveMap(key, startX, startY, nextX, nextY, deltaX, deltaY);
        //   } else {
        //     this.movePlayer(key, nextX, nextY, startX, startY);
        //   }
        // }
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
    // console.log("in state:", this.state.width, this.state.height, mapStartX, mapStartY, this.props.width, this.props.height)

    // console.log("bounds:", xBound, yBound)

    // console.log("from:X", mapStartX - 1, ", toX:", xBound, ", fromY:", mapStartY - 1, ", toY:", yBound)

    let newEntities = this.props.mapEntities.filter((entity) => {
      // console.log("entity:", entity.x, entity.y)
      return (
        mapStartX - 1 <= entity.x &&
        entity.x < xBound &&
        mapStartY - 1 <= entity.y &&
        entity.y < yBound
      );
    });
    return newEntities;
  }

  getPlayersInRange(mapStartX, mapStartY) {
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

    let newPlayers = this.props.players.filter((player) => {
      // console.log("entity:", entity.x, entity.y)
      return (
        mapStartX - 1 <= player.x &&
        player.x < xBound &&
        mapStartY - 1 <= player.y &&
        player.y < yBound
      );
    });
    return newPlayers;
  }

  getCompassAngle(startX, startY) {
    let compassX = startX;
    let compassY = startY + this.state.height - 3;

    let deltaX = this.props.compassPosition.x - compassX;
    let deltaY = this.props.compassPosition.y - compassY;

    var angle;
    if (deltaX <= 0 && deltaY <= 0) {
      angle = (Math.atan(Math.abs(deltaX / deltaY)) * 180) / Math.PI;
      angle *= -1;
    } else if (deltaX < 0 && deltaY > 0) {
      angle = (Math.atan(Math.abs(deltaX / deltaY)) * 180) / Math.PI;
      angle += 180;
    } else if (deltaX > 0 && deltaY < 0) {
      angle = (Math.atan(Math.abs(deltaX / deltaY)) * 180) / Math.PI;
    } else if (deltaX >= 0 && deltaY >= 0) {
      angle = (Math.atan(Math.abs(deltaY / deltaX)) * 180) / Math.PI;
      angle += 90;
    }

    return angle;
  }

  onStageClicked(e, startX, startY) {
    console.log('e:', e);

    let clickedX =
      (e.target.attrs.x - this.state.cellWidth / 2) / this.state.cellWidth +
      startX;
    let clickedY =
      (e.target.attrs.y - this.state.cellHeight / 2) / this.state.cellHeight +
      startY;

    console.log('clickedX:', clickedX);
    console.log('clickedY:', clickedY);

    this.props.movePlayer({
      x: clickedX,
      y: clickedY,
    });
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

    // console.log("propsssss:", this.props.mapEntities)
    let newEntities = this.getEntitiesInRange(mapStartX, mapStartY);
    let newPlayers = this.getPlayersInRange(mapStartX, mapStartY);
    let compassAngle = this.getCompassAngle(mapStartX, mapStartY);

    // console.log("in map:", newEntities)

    return (
      <>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={(stageEl) => (this.stageEl = stageEl)}
          onClick={(e) => {
            this.onStageClicked(e, mapStartX, mapStartY);
          }}
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
                // console.log("item:", item)
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
                      src={image_addresses[item.type]}
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
          <Layer>
            <URLImage
              ref={(node) => (this.compass = node)}
              x={this.state.cellWidth / 2}
              y={
                window.innerHeight -
                this.state.cellHeight / 2 -
                this.state.cellWidth
              }
              src={process.env.PUBLIC_URL + '/images/compass.png'}
              width={this.state.cellWidth}
              height={this.state.cellHeight}
              offsetX={this.state.cellWidth / 2}
              offsetY={this.state.cellHeight / 2}
              rotation={compassAngle}
            />
          </Layer>
        </Stage>
        <KeyboardEventHandler
          handleKeys={['left', 'down', 'right', 'up']}
          onKeyEvent={(key, e) => {
            this.onKeyEvent(key, e, mapStartX, mapStartY);
          }}
        />
        {this.props.touchSupported && (
          <Button.Group
            vertical
            style={{
              position: 'absolute',
              top: '40px',
              left: '20px',
            }}
          >
            <Button
              icon="toggle up"
              onClick={(e) => {
                this.onKeyEvent('up', e, mapStartX, mapStartY);
              }}
            />
            <Button
              icon="toggle down"
              onClick={(e) => {
                this.onKeyEvent('down', e, mapStartX, mapStartY);
              }}
            />
            <Button
              icon="toggle left"
              onClick={(e) => {
                this.onKeyEvent('left', e, mapStartX, mapStartY);
              }}
            />
            <Button
              icon="toggle right"
              onClick={(e) => {
                this.onKeyEvent('right', e, mapStartX, mapStartY);
              }}
            />
          </Button.Group>
        )}
        {this.props.wsLoading ||
        this.state.imageLoading ||
        this.state.dataLoading < 0 ? (
          <div
            style={{
              width: '100%',
              height: '100vh',
              position: 'fixed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              zIndex: 10000,
              top: 0,
              left: 0,
            }}
          >
            <img
              src={process.env.PUBLIC_URL + '/images/loading.svg'}
              style={{ width: '80%', maxWidth: '400px' }}
            />
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  myUsername: state.account.username,
  players: state.map.players,
  width: state.map.map.width,
  height: state.map.map.height,
  mapEntities: state.map.map.mapEntities,
  user: state.map.user,
});

export default connect(mapStateToProps, {
  getMapData,
  getPlayerStatus,
  getPlayers,
  movePlayer,
})(GameMap);
