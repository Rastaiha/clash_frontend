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
import Card from '../components/battleElements/Card'
import SpecialCard from '../components/battleElements/SpecialCard'

class CivilizationPage extends Component {
  render() {
    return (
      <Container text style={{ direction: 'rtl' }}>
        <Grid centered verticalAlign='middle' columns={2}>
          <Grid.Row>
            <Grid.Column textAlign='center' width={8}>
              <Card />
            </Grid.Column>
            <Grid.Column textAlign='center' width={8}>
              <Card />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center' width={8}>
              <Card />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center' width={8}>
              <Card />
            </Grid.Column>
            <Grid.Column textAlign='center' width={8}>
              <Card />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    )
  }

}

const mapSateToProps = (state) => ({

})

export default connect()(CivilizationPage)