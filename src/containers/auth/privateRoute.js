
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, history, ...rest }) => {
  const { location: { pathname } } = history;
  return <Route {...rest}
    render={props => auth.isValid ? <Component {...props} /> : <Redirect to={'/404?redirect=' + pathname} />}
  />
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute));