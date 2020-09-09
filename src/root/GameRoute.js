import React, { Component } from 'react';
import { initWebsocket, closeWebsocket } from '../redux/actions/socketActions';
import PrivateRoute from './PrivateRoute';
import GamePage from '../containers/GamePage';
import BattlePage from '../containers/BattlePage';
import Inventory from '../containers/Inventory';
import { updatePlayer } from '../redux/actions/map';
import { connect } from 'react-redux';
import { teamUrl } from '../redux/actions/urls';

class GameRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    initWebsocket({
      username: this.props.username,
      subscriptions: [
        {
          url: teamUrl,
          callback: (body) => this.props.updatePlayer(body),
        },
      ],
      onConnect: () => {
        this.setState({ loading: false });
      },
    });
  }
  componentWillUnmount() {
    closeWebsocket();
  }
  render() {
    return (
      <>
        <PrivateRoute
          path="/game"
          component={GamePage}
          myProps={{ wsLoading: this.state.loading }}
        />
        <PrivateRoute
          path="/battle"
          component={BattlePage}
          myProps={{ wsLoading: this.state.loading }}
        />
        <PrivateRoute
          path="/inventory"
          component={Inventory}
          myProps={{ wsLoading: this.state.loading }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.account.username,
});

export default connect(mapStateToProps, { updatePlayer })(GameRoute);
