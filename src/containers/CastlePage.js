import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Segment,
  Header,
  Divider,
  Label,
} from 'semantic-ui-react'
import BattlePage from './BattlePage';
import GamePage from './GamePage';
import Inventory from './Inventory';
import { initWebsocket, subscribeToWS } from './redux/actions/socketActions';


class CivilizationPage extends Component {

  componentDidMount() {
    initWebsocket();
  }

  render() {
    return (
      <Container text style={{ direction: 'rtl' }}>
        <BattlePage/>
        <GamePage/>
        <Inventory/>
      </Container >
    )
  }

}

const mapSateToProps = (state) => ({

})

export default connect()(CivilizationPage)