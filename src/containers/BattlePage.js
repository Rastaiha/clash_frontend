import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Segment, Divider, Label } from 'semantic-ui-react';
import Card from '../components/battleElements/Card';
import { newDeck } from '../redux/actions/battle';
import { wsQueueFightUrl } from '../redux/actions/urls';
import { subscribeToWS } from '../redux/actions/socketActions';

class BattlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      message: '',
      results: [],
    };
    this.handleFightMsg = this.handleFightMsg.bind(this);
  }

  componentDidMount() {
    subscribeToWS(wsQueueFightUrl, this.handleFightMsg);
  }

  handleFightMsg({ host, guest, remained, message, fightRounds }) {
    if (host) {
      this.setState({
        running: true,
        opponent: host.username === this.state.username ? guest : host,
      });
    } else if (remained) this.setState({ message: `${message} | ${remained}` });
    else if (fightRounds) {
      let newDeck = this.props.deck.map((card) =>
        fightRounds.some(
          ({ winnerCard, loserCard }) =>
            winnerCard.id === card.id || loserCard.id === card.id
        )
          ? { ...card, used: true }
          : { ...card, used: false }
      );
      this.props.newDeck(newDeck);
      this.setState({ results: fightRounds });
    } else {
      this.setState({ message });
      setInterval(() => this.setState({ running: false }), 1500);
    }
  }

  render() {
    console.log(this.state.username);
    return (
      <Container className="battle-page" text style={{ direction: 'rtl' }}>
        <Grid centered verticalAlign="middle" columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center" width={16}>
              <Segment>
                <h1>خون‌آشام‌های کفتارسفت VS بچه‌محل‌ها</h1>
                <br />
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: '70%',
                    }}
                  >
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
                  <div
                    style={{
                      width: '30%',
                    }}
                  ></div>
                </div>
                <Divider horizontal>
                  <Label circular size="massive" fixed>
                    تایمر
                  </Label>
                </Divider>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      width: '30%',
                    }}
                  ></div>
                  <div
                    style={{
                      display: 'flex',
                      width: '70%',
                    }}
                  >
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapSateToProps = (state) => ({
  username: state.account.username,
});

export default connect(mapSateToProps, {
  newDeck,
})(BattlePage);
