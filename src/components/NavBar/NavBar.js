import React, { Component } from 'react';
import { Icon, Menu, Sidebar, Responsive, Container } from 'semantic-ui-react';

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      vertical
      visible={visible}
    >
      {leftItems}
    </Sidebar>

    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: '100vh' }}
    >
      <Menu fixed="top" className="borderless">
        <Menu.Item
          onClick={onToggle}
          style={{
            paddingLeft: '7px',
            paddingRight: '4px',
          }}
        >
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">{rightItems}</Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed="top" className="borderless">
    <Container>
      {leftItems}
      <Menu.Menu position="right">{rightItems}</Menu.Menu>
    </Container>
  </Menu>
);
const NavBarChildren = ({ children }) => (
  <div className="under-nav-content">{children}</div>
);

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handlePusher = this.handlePusher.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { leftItems, rightItems } = this.props.config.items;
    const { visible } = this.state;
    return (
      <div className={this.props.config.noBack ? 'no-back nav-bar' : 'nav-bar'}>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}
