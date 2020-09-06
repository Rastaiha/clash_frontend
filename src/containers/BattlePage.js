import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Segment,
  Header,
  Divider,
  Label,
  Input,
  Button,
} from 'semantic-ui-react'
import Card from '../components/battleElements/Card'
import {
  login,
  logout,
} from '../redux/actions/account'
import {
  requestFight,
  move,
} from '../redux/actions/battle'

class BattlePage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      username: null,
      opponent: null,
    }
    this.request = this.request.bind(this)
  }

  componentDidMount() {
    this.props.login({ username: 'mahdi', password: '12345' });
  }

  request() {
    this.props.login({ username: this.state.username, password: '12345' });
    // this.props.move({ x: 101, y: 101 })
    setTimeout(function () {
      this.props.requestFight({ username: this.state.opponent })
    }.bind(this)
      , 2000)
  }


  render() {
    console.log(this.state.username)
    return (
      <Container text style={{ direction: 'rtl' }}>
        <Grid centered verticalAlign='middle' columns={1}>
          <Grid.Row>
            <Grid.Column textAlign='center' width={16}>
              <Segment>
                <Input
                  placeholder='نام کاربری خودت'
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <Input
                  placeholder='نام کاربری رقیب'
                  onChange={(e) => this.setState({ opponent: e.target.value })}
                />
                <Button
                  onClick={this.request}
                >
                  حمله کن
                </Button>
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
  username: state.account.username,
})

export default connect(
  mapSateToProps,
  {
    login,
    requestFight,
    move,
  }
)(BattlePage)