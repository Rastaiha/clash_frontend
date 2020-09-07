import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameMap from '../components/konva/GameMap';
import imageNames from '../components/konva/imageNames';
import loadedImages from '../components/konva/loadedImages';
import { movePlayer } from '../redux/actions/map';
import GameNav from '../components/GameNav/GameNav';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedLoad: false,
    };
  }
  loadedImagesCount = 0;
  preloadImages() {
    imageNames.forEach((name) => {
      loadedImages[name] = new Image();
      loadedImages[name].onload = () => {
        this.loadedImagesCount++;
        if (this.loadedImagesCount >= imageNames.length) {
          this.setState({ finishedLoad: true });
        }
      };
      loadedImages[name].src = name;
    });
  }

  componentDidMount() {
    // this.preloadImages();
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <GameNav />
        <GameMap
          movePlayer={this.props.movePlayer}
          mapEntities={this.props.map.mapEntities}
          players={this.props.players}
          width={this.props.map.width}
          height={this.props.map.height}
          user={this.props.user}
        />
      </div>
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
})(GamePage);
