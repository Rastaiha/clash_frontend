import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import GamePage from '../containers/GamePage';
import BattlePage from '../containers/BattlePage';
import Inventory from '../containers/Inventory';
import Login from '../containers/Login';

import '../statics/styles/App.css';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/game" component={GamePage} />
        <Route path="/battle" component={BattlePage} />
        <Route path="/civilization" component={Inventory} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  );
};
export default Root;
