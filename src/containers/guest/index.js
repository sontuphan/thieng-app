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
// import UserHome from './home';
import GuestStore from './store';

import styles from './styles';


class Guest extends Component {

  render() {
    const { classes } = this.props;
    const { match: { params: { userId } } } = this.props;
    if (!userId) return null;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12} className={classes.header}>
        <Grid container justify="flex-end" spacing={2}>
          <Panel userId={userId} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={10}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Profile userId={userId} />
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
          <Route exact path="/guest/:userId/store" component={GuestStore} />
          {/* <Route exact path="/user/:userId/message" component={null} /> */}
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
)(withStyles(styles)(Guest)));