import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (rest.isLoggedIn && !rest.mentor) || rest.isMentor ? (
          <Component {...props} {...rest.myProps} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
  isMentor: state.account.user && state.account.user.is_mentor,
});

export default connect(mapStateToProps, {})(PrivateRoute);
