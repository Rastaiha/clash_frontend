import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import * as jitsiFuncs from '../../utils/jitsi';

export default class JitsiChatBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.resetJitsi = this.resetJitsi.bind(this);
  }
  resetJitsi() {
    jitsiFuncs.destroy();
    jitsiFuncs.initJitsi({
      roomName:
        this.props.roomName || '1234lkfadmRasdfqlwekfmad3f1m1fklasdffbriu',
      parentNode: document.querySelector('.jit-si-meet'),
      userInfo: {
        displayName: this.props.name || 'کاربر',
      },
    });
    jitsiFuncs.messageListener(this.props.onMessage);
  }
  componentDidMount() {
    this.resetJitsi();
  }
  componentWillUnmount() {
    jitsiFuncs.destroy();
  }
  render() {
    return (
      <>
        <Button
          onClick={() => this.setState({ open: !this.state.open })}
          style={{
            padding: '5px',
            height: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/videoCall.png'}
            style={{ width: 17, height: 17, display: 'block', margin: 'auto' }}
          />
        </Button>
        <div
          className={
            this.state.open
              ? 'jit-si-meet-container'
              : 'jit-si-meet-container hidden-jitsi'
          }
        >
          <div
            className="exit-jit-si-meet-container"
            onClick={() => this.setState({ open: !this.state.open })}
          >
            <Icon name="times circle" color="red" />
          </div>
          <div
            className="reload-jit-si-meet-container"
            onClick={this.resetJitsi}
          >
            <Icon name="redo" />
          </div>
          <div className="jit-si-meet"></div>
        </div>
      </>
    );
  }
}
