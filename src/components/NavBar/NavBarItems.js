import React from 'react';
import { Menu, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const leftItems = (config) => {
  const items = [];
  if (!!config.isLoggedIn) {
    items.push(
      <Menu.Item name="logout">
        <Button as={Link} to="/logout" basic>
          خروج
        </Button>
      </Menu.Item>
    );
  } else {
    items.push(
      <Menu.Item name="login">
        <Button as={Link} to="/login" primary>
          ورود
        </Button>
      </Menu.Item>
    );
  }

  return items;
};

const rightItems = (config) => {
  const items = [];
  if (!!config.isLoggedIn) {
    items.push(
      <Menu.Item name="panel">
        <Button as={Link} to="/panel" primary>
          داشبورد
        </Button>
      </Menu.Item>
    );
  }
  items.push(
    <Menu.Item>
      <Link to="/">
        <Image size="mini" src={process.env.PUBLIC_URL + '/logo.png'} />
      </Link>
    </Menu.Item>
  );

  return items;
};

export default function (config) {
  return {
    leftItems: leftItems(config),
    rightItems: rightItems(config),
  };
}
