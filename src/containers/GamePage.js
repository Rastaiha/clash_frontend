import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameMap from '../components/konva/GameMap';
import imageNames from '../components/konva/imageNames';
import loadedImages from '../components/konva/loadedImages';
import { movePlayer, updatePlayer } from '../redux/actions/map';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedLoad: false,
    };
  }

  preloadImages() {
    imageNames.forEach((name) => {
      loadedImages[name] = new Image();
      loadedImages[name].src = name;
      console.log('loaded images:', loadedImages, name, loadedImages[name]);
    });

    this.setState({ finishedLoad: true });
  }

  componentDidMount() {
    // this.preloadImages();
  }

  render() {
    return (
      <GameMap
        updatePlayer={this.props.updatePlayer}
        movePlayer={this.props.movePlayer}
        mapEntities={this.props.map.mapEntities}
        players={this.props.players}
        width={this.props.map.width}
        height={this.props.map.height}
        user={this.props.user}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  map: state.map.map,
  players: state.map.players,
  user: state.map.user,
});

export default connect(mapStateToProps, {
  movePlayer,
  updatePlayer,
})(GamePage);
