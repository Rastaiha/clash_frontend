import React from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import GamePage from '../containers/GamePage';
import BattlePage from '../containers/BattlePage';
import Inventory from '../containers/Inventory';
import Login from '../containers/Login';
import PrivateRoute from './PrivateRoute';

import '../statics/styles/App.css';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/game" component={GamePage} />
        <PrivateRoute path="/battle" component={BattlePage} />
        <PrivateRoute path="/civilization" component={Inventory} />
        <Route path="/" component={Homepage} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
