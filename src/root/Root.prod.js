import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import GamePage from '../containers/GamePage';

import '../styles/App.css';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/game/">
          <GamePage />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </>
  );
};
export default Root;
