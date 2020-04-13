import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Item from 'containers/mall/item';
import Items from 'containers/mall/items';

import styles from './styles';

class Mall extends Component {

  render() {
    return <Switch>
      <Redirect exact from="/mall" to="/mall/chairs" />
      <Route exact path="/mall/:category" component={Items} />
      <Route exact path="/mall/item/:id" component={Item} />
    </Switch>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Mall)));