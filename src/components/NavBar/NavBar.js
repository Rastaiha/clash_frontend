import React, { Component } from 'react';
import { Icon, Menu, Sidebar, Responsive } from 'semantic-ui-react';
import NavBarItems from './NavBarItems';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/account';

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
}) => {
  const rightMenu = (
    <>
      <Menu fixed="top" className="borderless">
        <Menu.Item
          onClick={onToggle}
          style={{
            paddingLeft: '7px',
            paddingRight: '4px',
          }}
        >
          {leftItems.length > 0 ? <Icon name="sidebar" /> : ''}
        </Menu.Item>
        <Menu.Menu position="right">{rightItems}</Menu.Menu>
      </Menu>
      {children}
    </>
  );
  return leftItems.length > 0 ? (
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
        {rightMenu}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  ) : (
    rightMenu
  );
};

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed="top" className="borderless">
    {leftItems}
    <Menu.Menu position="right">{rightItems}</Menu.Menu>
  </Menu>
);
const NavBarChildren = ({ children }) => (
  <div className="under-nav-items">{children}</div>
);

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handlePusher = this.handlePusher.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    if (window.scrollY <= 10 && this.state.scrolling === true) {
      this.setState({ scrolling: false });
    } else if (window.scrollY > 10 && this.state.scrolling !== true) {
      this.setState({ scrolling: true });
    }
  }

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { leftItems, rightItems } = NavBarItems(this.props.config, {
      isLoggedIn: this.props.isLoggedIn,
      logout: this.props.logout,
    });
    const { visible } = this.state;
    return (
      <div className={'nav ' + (this.state.scrolling ? '' : 'no-scroll')}>
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

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, {
  logout,
})(NavBar);
