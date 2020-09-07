import React, { Component } from 'react';
import GameMap from '../components/konva/GameMap';
import { connect } from 'react-redux';
import { movePlayer } from '../redux/actions/map';
import loadedImages from '../components/konva/loadedImages';
import imageNames from '../components/konva/imageNames';
import { Icon } from 'semantic-ui-react';

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
    // console.log("loaddedd babaaaaaa:", loadedImages)
    // this.preloadImages();
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div className="game-nav">
          <div className="game-nav-container">
            <div>
              <Icon name="alarm" />
            </div>
          </div>
        </div>
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
