import React from 'react';
import { Button, Icon, Header, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Homepage = () => (
  <>
    <div className="first-page"></div>
    <Container
      text
      style={{
        direction: 'rtl',
      }}
    >
      <Header
        as="h1"
        content="جنگ تمدن‌ها"
        inverted
        style={{
          fontSize: '4em',
          textAlign: 'center',
          margin: '3em auto 0',
          color: 'black',
        }}
      />
      <Button
        as={Link}
        to="/"
        primary
        size="big"
        style={{ textAlign: 'center', margin: '30px 30%', display: 'block' }}
      >
        بزن بریم!
        <Icon name="left arrow" />
      </Button>
    </Container>
  </>
);

export default Homepage;
