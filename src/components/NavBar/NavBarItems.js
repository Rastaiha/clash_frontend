import React from 'react';
import { Image, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import JitsiAudioBtn from './JitsiAudioBtn';
import JitsiChatBtn from './JitsiChatBtn';

const leftItems = (config, props) => {
  let items = [];
  switch (config.mode) {
    case 'landing':
      if (props.isLoggedIn) {
        items.push(
          <Menu.Item name="logout">
            <Button basic onClick={props.logout}>
              خروج
            </Button>
          </Menu.Item>,
          <Menu.Item name="resetPassword">
            <Button basic as={Link} to="/resetPassword">
              تغییر رمز
            </Button>
          </Menu.Item>,
          <Menu.Item>
            <Button
              as="a"
              target="blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfhh5HaHXPsXp6BXNSHUAKO12qpHVGUg8OQlOTfLHKO_nUjOg/viewform?usp=sf_link"
              positive
            >
              شرکت در نظرسنجی
            </Button>
          </Menu.Item>,
          <Menu.Item>
            <Button as={Link} to="/selectWorkshop" primary>
              ورود به رویداد
            </Button>
          </Menu.Item>
        );
      } else {
        items.push(
          <Menu.Item>
            <Button as={Link} to="/login" positive>
              شرکت در نظرسنجی
            </Button>
          </Menu.Item>,
          <Menu.Item name="login">
            <Button as={Link} to="/login" primary>
              ورود
            </Button>
          </Menu.Item>
        );
      }
      break;
    case 'workshop':
      items = [
        <Menu.Item style={{ padding: '5px 10px' }}>
          <Image size="mini" src={process.env.PUBLIC_URL + '/logo.png'} />
        </Menu.Item>,
        <Menu.Item style={{ padding: '5px 10px' }}>
          کارگاه {config.currentWorkshop}
        </Menu.Item>,
      ];
      break;
    default:
      break;
  }
  return items;
};

const popup_style = {
  padding: '5px 8px',
};

const rightItems = (config, props) => {
  let items = [];
  switch (config.mode) {
    case 'landing':
      items = [
        <Menu.Item as={Link} to="/" style={{ padding: '5px 10px' }}>
          <Image
            size="mini"
            src={process.env.PUBLIC_URL + '/logo.png'}
            className="logo-size"
          />
        </Menu.Item>,
      ];
      break;
    case 'workshop':
      items = [
        <Menu.Item
          style={{
            paddingLeft: 0,
          }}
        >
          <JitsiAudioBtn />
        </Menu.Item>,
        <Menu.Item
          style={{
            paddingLeft: 0,
          }}
        >
          {props.team_uuid ? (
            <JitsiChatBtn roomName={props.team_uuid} name={config.name} />
          ) : (
            ''
          )}
        </Menu.Item>,
      ];
      break;
    default:
      break;
  }
  return items;
};

export default function (config, props) {
  return {
    leftItems: leftItems(config, props),
    rightItems: rightItems(config, props),
  };
}
