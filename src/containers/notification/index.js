import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { } from '@material-ui/icons';

import { TopDrawer } from 'components/drawers';
import PrimaryNotification from './primary';
import SecondaryNotification from './secondary';

import { toogleNotification } from 'modules/notification.reducer';

import styles from './styles';


class Notification extends Component {

  render() {

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopDrawer
          visible={this.props.notification.visible}
          onClose={this.props.toogleNotification}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={10}>
                  <PrimaryNotification />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={10}>
                  <SecondaryNotification />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TopDrawer>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  notification: state.notification,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toogleNotification,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Notification)));