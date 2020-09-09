import React, { Component } from 'react';
import { initWebsocket, closeWebsocket } from '../redux/actions/socketActions';
import PrivateRoute from './PrivateRoute';
import GamePage from '../containers/GamePage';
import BattlePage from '../containers/BattlePage';
import Inventory from '../containers/Inventory';
import { updatePlayer } from '../redux/actions/map';
import { connect } from 'react-redux';
import { MAP_WEBSOCKET } from '../redux/actions/urls';
import { Switch } from 'react-router';

class GameRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  connectToWS() {
    closeWebsocket();
    initWebsocket({
      username: this.props.username,
      subscriptions: [
        {
          url: MAP_WEBSOCKET,
          callback: (body) => this.props.updatePlayer(body),
        },
      ],
      onConnect: () => {
        this.setState({ loading: false });
      },
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.connectToWS();
      }
    }, 2000);
  }

  componentDidMount() {
    this.connectToWS();
  }
  componentWillUnmount() {
    closeWebsocket();
  }
  render() {
    return (
      <Switch>
        <PrivateRoute
          path="/game/battle"
          component={BattlePage}
          myProps={{ wsLoading: this.state.loading }}
        />
        <PrivateRoute
          path="/game/inventory"
          component={Inventory}
          myProps={{ wsLoading: this.state.loading }}
        />
        <PrivateRoute
          path="/game"
          component={GamePage}
          myProps={{ wsLoading: this.state.loading }}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.account.username,
});

export default connect(mapStateToProps, { updatePlayer })(GameRoute);
