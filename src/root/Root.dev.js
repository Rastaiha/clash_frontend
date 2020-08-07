import React from 'react';
import DevTools from '../containers/DevTools';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import GamePage from '../containers/GamePage';
import NavBar from '../components/NavBar/NavBar';
import NavBarItems from '../components/NavBar/NavBarItems';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/game/">
          <GamePage />
        </Route>
        <Route path="/">
          <NavBar config={{ items: NavBarItems({}), noBack: true }}>
            <Homepage />
          </NavBar>
        </Route>
      </Switch>
      <DevTools />
    </>
  );
};
export default Root;
