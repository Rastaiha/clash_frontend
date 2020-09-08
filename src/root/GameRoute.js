import React, { Component } from 'react';
import { initWebsocket, closeWebsocket } from '../redux/actions/socketActions';
import PrivateRoute from './PrivateRoute';
import GamePage from '../containers/GamePage';
import BattlePage from '../containers/BattlePage';
import Inventory from '../containers/Inventory';
import { connect } from 'react-redux';

class GameRoute extends Component {
  componentDidMount() {
    initWebsocket({ username: this.props.username });
  }
  componentWillUnmount() {
    closeWebsocket();
  }
  render() {
    return (
      <>
        <PrivateRoute path="/game" component={GamePage} />
        <PrivateRoute path="/battle" component={BattlePage} />
        <PrivateRoute path="/inventory" component={Inventory} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.account.username,
});

export default connect(mapStateToProps)(GameRoute);
