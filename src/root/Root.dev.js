import React from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Login from '../containers/Login';
import PrivateRoute from './PrivateRoute';

import '../statics/styles/App.css';
import GameRoute from './GameRoute';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/game" component={GameRoute} />
        <Route path="/" component={Homepage} />
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
