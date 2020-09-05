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


class BattlePage extends Component {
  render() {
    return (
      <Container text style={{ direction: 'rtl' }}>
        <Grid centered verticalAlign='middle' columns={1}>
          <Grid.Row>
            <Grid.Column textAlign='center' width={16}>
              <Segment>
                <h1>
                  خون‌آشام‌های کفتارسفت VS بچه‌محل‌ها
                </h1>
                <br />
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: '70%'
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
                  >

                  </div>

                </div>
                <Divider horizontal>
                  <Label circular size='massive' fixed>
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
                  >
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      width: '70%'
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
      </Container >
    )
  }

}

const mapSateToProps = (state) => ({

})

export default connect()(BattlePage)