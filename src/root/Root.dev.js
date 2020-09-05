import React from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import GamePage from '../containers/GamePage';
import BattlePage from '../containers/BattlePage'
import CivilizationPage from '../containers/CivilizationPage'

import '../statics/styles/App.css';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/game/">
          <GamePage />
        </Route>
        <Route path="/battle/">
          <BattlePage />
        </Route>
        <Route path="/civilization/">
          <CivilizationPage />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
