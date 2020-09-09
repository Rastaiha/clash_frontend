import React, { Component } from 'react';
import GameMap from '../components/konva/GameMap';
import GameNav from '../components/GameNav/GameNav';

export default class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touchSupported: false,
    };
  }
  

  componentDidMount() {
    this.setState({ touchSupported: this.isTouchSupported() });
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
          touchSupported={this.state.touchSupported}
          wsLoading={this.props.wsLoading}
        />
      </div>
    );
  }
}
