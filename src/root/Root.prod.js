import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import NavBar from '../components/NavBar/NavBar';
import NavBarItems from '../components/NavBar/NavBarItems';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/">
          <NavBar config={{ items: NavBarItems({}), noBack: true }}>
            <Homepage />
          </NavBar>
        </Route>
      </Switch>
    </>
  );
};
export default Root;
