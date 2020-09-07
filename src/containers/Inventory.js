import React, { Component } from 'react'
import {
  getCardTypes,getCivilCards,playerCard,
  pickupCard,buyCard, discardCard, sellCard
} from '../redux/actions/cards';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Segment,
  Header,
  Divider,
  Label,
} from 'semantic-ui-react'
import InventoryCard from '../components/battleElements/InventoryCard'
import SpecialCard from '../components/battleElements/SpecialCard'

class Inventory extends Component {

  getData = () => {
    this.props.getCivilCards();
    this.props.playerCard();
  };

  componentDidMount() {
    this.props.getCardTypes();
    this.getData();
  }

pickup = async (cardId) => {
  await this.props.pickupCard(cardId);
  this.getData();
}

discard = async (cardId) => {
  await this.props.discardCard(cardId);
  this.getData();
}

sell = async (cardId) => {
  await this.props.sellCard(cardId);
  this.getData();
}
buy = async (cardId) => {
  await this.props.buyCard(cardId);
  this.getData();
}

// old
// render() {
//   return (
//     <Container text style={{ direction: 'rtl' }}>
//       <Grid centered verticalAlign='middle' columns={2}>
//         <Grid.Row>
//           <Grid.Column textAlign='center' width={8}>
//             <Card />
//           </Grid.Column>
//           <Grid.Column textAlign='center' width={8}>
//             <Card />
//           </Grid.Column>
//         </Grid.Row>
//         <Grid.Row>
//           <Grid.Column textAlign='center' width={8}>
//             <Card />
//           </Grid.Column>
//         </Grid.Row>
//         <Grid.Row>
//           <Grid.Column textAlign='center' width={8}>
//             <Card />
//           </Grid.Column>
//           <Grid.Column textAlign='center' width={8}>
//             <Card />
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Container >
//   )
// }
render() {
  const { armory, backpack, cardtypes } = this.props;
  return (
    <div className="w-100">
      <div className="overflow-auto">
        <div class="d-flex flex-row flex-nowrap">
          {cardtypes.map(card => (
            <InventoryCard
              title={card.name}
              onBuy={() => this.buy(card.id)}
            />
          ))}
        </div>
      </div>
      <div className="overflow-auto">
        <div class="d-flex flex-row flex-nowrap">
          {armory.filter(card => !card.picked).map(card => (
            <InventoryCard
              title={card.cardType.name}
              onPickup={() => this.pickup(card.id)}
              onSell={() => this.sell(card.id)}
            />
          ))}
        </div>
      </div>
      <div className="overflow-auto">
        <div class="d-flex flex-row flex-nowrap">
          {backpack.map(card => (
            <InventoryCard
              title={card.cardType.name}
              onDiscard={() => this.discard(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

}

const mapStateToProps = (state) => ({
  cardtypes: state.cardtypes,
  armory: state.armory,
})

export default connect(mapStateToProps, {
  getCardTypes,
  getCivilCards,
  playerCard,
  pickupCard,buyCard, discardCard, sellCard,
})(Inventory);