import React, { useEffect, useState } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { shift, fastShift, shiftRedirect } from './redux/actions/messages';
import { Redirect } from 'react-router';
import Alert from './components/Alert/Alert';

function Messages(props) {
  const [timer, setTimer] = useState(5000);

  useEffect(() => {
    if (props.messages.length === 0) {
      return;
    }
    if (props.messages[0].mode && props.messages[0].mode === 'alert') {
      return;
    }
    if (timer < 0) {
      shiftMessage();
    } else {
      setTimeout(() => setTimer(timer - 100), 100);
    }
  });
  const shiftRedirect = () => {
    setTimeout(() => props.shiftRedirect(), 100);
    return <Redirect to={props.redirects[0].to} />;
  };

  const resetShiftTimer = () => {
    setTimer(5000);
  };

  const shiftMessage = () => {
    resetShiftTimer();
    props.fastShift();
  };

  if (props.redirects.length > 0) {
    return shiftRedirect();
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 90,
          left: 30,
          zIndex: 10000000,
          direction: 'rtl',
        }}
      >
        {props.messages.length > 0 ? (
          props.messages[0].mode === 'alert' ? (
            <Alert
              message={props.messages[0].text}
              title={props.messages[0].type === 'error' ? 'خطا' : null}
              onClose={shiftMessage}
            />
          ) : (
            <div style={{ position: 'relative' }}>
              <Message
                style={{ fontWeight: 800, fontSize: 30, padding: '10px 20px' }}
                positive={props.messages[0].type === 'success'}
                negative={props.messages[0].type === 'error'}
                compact
                content={
                  props.messages[0].text.includes(
                    'No active account found with the given credentials'
                  )
                    ? 'ایمیل یا رمزعبور اشتباه است.'
                    : props.messages[0].text
                }
              />
              <div
                class="close-message-btn"
                onClick={() => {
                  shiftMessage();
                }}
              >
                <Icon name="times" />
              </div>
            </div>
          )
        ) : (
          ''
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
  redirects: state.messages.redirects,
});

export default connect(mapStateToProps, {
  shift,
  shiftRedirect,
  fastShift,
})(Messages);
