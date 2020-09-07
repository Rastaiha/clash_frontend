import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar';
import { login } from '../redux/actions/account';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      form_error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async handleSubmit(event) {
    const { email, password } = this.state;
    this.props.login({ username: email, password });
    event.preventDefault();
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="no-nav-back padded-nav">
        <NavBar
          config={{
            mode: 'landing',
          }}
        >
          <Grid centered container doubling stackable>
            <Grid.Column
              style={{ textAlign: 'center', direction: 'rtl' }}
              width={6}
            >
              <Header as="h2" textAlign="center">
                ورود
              </Header>
              <Segment>
                <Form
                  size="large"
                  onSubmit={this.handleSubmit}
                  error={!!this.state.form_error}
                >
                  <Form.Input
                    name="email"
                    type="email"
                    required
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="ایمیل"
                    className="ltr-input rtl-placeholder"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />

                  <Form.Input
                    name="password"
                    required
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="رمز عبور"
                    type="password"
                    className="ltr-input rtl-placeholder"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <Message
                    error
                    header={this.state.form_error.title}
                    content={this.state.form_error.message}
                  />

                  <Button color="blue" fluid size="large">
                    بزن بریم
                  </Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </NavBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, {
  login,
})(Login);
