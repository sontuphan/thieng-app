import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Drain from 'components/drain';
import Profile from './profile';
import Panel from './panel';
import Menu from './menu';
// import UserHome from './home';
import UserStore from './store';
import UserWarehouse from './warehouse';
import UserFactory from './factory';
import UserOrders from './orders';
import UserHistory from './history';
import UserSettings from './settings';

import styles from './styles';


class User extends Component {

  componentDidMount() {
    this.validateOwner();
  }

  validateOwner = () => {
    const { match: { params: { userId } }, auth } = this.props;
    if (isEqual(userId, auth._id)) return null;
    return this.props.history.replace(`/guest/${userId}/store`);
  }

  render() {
    const { classes } = this.props;
    const { auth: { _id } } = this.props;

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
              <Profile userId={_id} />
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
          {/* <Route exact path="/user/:userId/home" component={UserHome} /> */}
          <Route exact path="/user/:userId/store" component={UserStore} />
          <Route exact path="/user/:userId/warehouse" component={UserWarehouse} />
          <Route exact path="/user/:userId/factory" component={UserFactory} />
          <Route exact path="/user/:userId/orders" component={UserOrders} />
          {/* <Route exact path="/user/:userId/message" component={null} /> */}
          <Route exact path="/user/:userId/history" component={UserHistory} />
          <Route exact path="/user/:userId/settings" component={UserSettings} />
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