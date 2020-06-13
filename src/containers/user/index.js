import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Drain from 'components/drain';
import Profile from './profile';
import Panel from './panel';
import Menu from './menu';
import UserHome from './home';
import UserStore from './store';
import UserWarehouse from './warehouse';
import UserFactory from './factory';
import UserOrders from './orders';
import UserSettings from './settings';

import styles from './styles';


class User extends Component {

  render() {
    const { classes, auth } = this.props;
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12} className={classes.header}>
        <Grid container justify="flex-end" spacing={2}>
          <Panel />
        </Grid>
      </Grid>
      <Grid item xs={12} md={10}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {auth._id ? <Profile userId={auth._id} /> : null}
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={12}>
              <Menu />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={11} md={10}>
        <Switch>
          {/* <Route exact path="/user/:email/home" component={UserHome} /> */}
          <Route exact path="/user/:email/store" component={UserStore} />
          <Route exact path="/user/:email/warehouse" component={UserWarehouse} />
          <Route exact path="/user/:email/factory" component={UserFactory} />
          <Route exact path="/user/:email/orders" component={UserOrders} />
          {/* <Route exact path="/user/:email/message" component={null} /> */}
          {/* <Route exact path="/user/:email/settings" component={UserSettings} /> */}
        </Switch>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User)));