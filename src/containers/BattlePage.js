import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Segment, Divider, Label } from 'semantic-ui-react';
import Card from '../components/battleElements/Card';
import { newDeck } from '../redux/actions/battle';

function BattlePage({ username, deck, playCard }) {
  const [results, setResults] = useState([]);
  const [opponent, setOpponent] = useState({ username: '' });
  const [message, setMessage] = useState('');
  const [running, setRunning] = useState(false);

  const handleFightMsg = useCallback(
    ({ host, guest, remained, message, fightRounds }) => {
      if (host) {
        setRunning(true);
        setOpponent(host.username === username ? guest : host);
      } else if (remained) setMessage(`${message} | ${remained}`);
      else if (fightRounds) {
        let newDeck = deck.map((card) =>
          fightRounds.some(
            ({ winnerCard, loserCard }) =>
              winnerCard.id === card.id || loserCard.id === card.id
          )
            ? { ...card, used: true }
            : { ...card, used: false }
        );
        // setDeck(newDeck);
        setResults(fightRounds);
      } else {
        setMessage(message);
        setInterval(() => setRunning(false), 1500);
      }
    },
    [deck, username]
  );

  return (
    <Container className="battle-page" text style={{ direction: 'rtl' }}>
      <Grid centered verticalAlign="middle" columns={1}>
        <Grid.Row>
          <Grid.Column textAlign="center" width={16}>
            <Segment>
              <h1>خون‌آشام‌های کفتارسفت VS بچه‌محل‌ها</h1>
              <br />
              <div className="their-cards-list">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
              <Divider horizontal>
                <Label circular size="massive" fixed>
                  تایمر
                </Label>
              </Divider>
              <div className="our-cards-list">
                <Card
                  isOurCards
                  onClick={() => playCard}
                  offset={2}
                  src={process.env.PUBLIC_URL + '/images/cards/index.jpeg'}
                />
                <Card
                  isOurCards
                  onClick={() => playCard}
                  offset={1}
                  src={process.env.PUBLIC_URL + '/images/cards/index.jpeg'}
                />
                <Card
                  isOurCards
                  onClick={() => playCard}
                  offset={0}
                  src={process.env.PUBLIC_URL + '/images/cards/index.jpeg'}
                />
                <Card
                  isOurCards
                  onClick={() => playCard}
                  offset={-1}
                  src={process.env.PUBLIC_URL + '/images/cards/index.jpeg'}
                />
                <Card
                  isOurCards
                  onClick={() => playCard}
                  offset={-2}
                  src={process.env.PUBLIC_URL + '/images/cards/index.jpeg'}
                />
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

const mapSateToProps = (state) => ({
  username: state.account.username,
});

export default connect(mapSateToProps, {
  newDeck,
})(BattlePage);
