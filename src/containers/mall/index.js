import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Item from 'containers/item';
import Items from 'containers/items';

import styles from './styles';

class Mall extends Component {
  constructor() {
    super();

    this.state = {

    }
  }


  render() {
    // let { classes } = this.props;

    return <Fragment>
      <Switch>
        <Route exact path="/mall" component={Items} />
        <Route exact path="/mall/:item" component={Item} />
      </Switch>
    </Fragment>
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