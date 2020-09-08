import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameMap from '../components/konva/GameMap';
import loadedImages from '../components/konva/loadedImages';
import { movePlayer, updatePlayer } from '../redux/actions/map';
import imageNames from '../components/konva/imageNames';
import GameNav from '../components/GameNav/GameNav';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedLoad: false,
      touchSupported: false,
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
    this.setState({touchSupported: this.isTouchSupported()})
  }

  isTouchSupported() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = 'ontouchstart' in document.createElement('div');

    if (msTouchEnabled || generalTouchEnabled) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <GameNav />
        <GameMap
          compassPosition={{
            x: 15,
            y: 14,
          }}
          updatePlayer={this.props.updatePlayer}
          movePlayer={this.props.movePlayer}
          mapEntities={this.props.map.mapEntities}
          players={this.props.players}
          width={this.props.map.width}
          height={this.props.map.height}
          user={this.props.user}
          touchSupported={this.state.touchSupported}
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
  updatePlayer,
  movePlayer,
})(GamePage);
