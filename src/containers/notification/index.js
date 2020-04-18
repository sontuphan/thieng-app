import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { } from '@material-ui/icons';

import { TopDrawer } from 'components/drawers';

import { toogleNotification } from 'modules/notification.reducer';
import { toogleCart } from 'modules/cart.reducer';

import styles from './styles';


class Notification extends Component {
  constructor() {
    super();

    this.state = {
    }
  }

  onCart = () => {
    this.props.toogleCart();
  }

  render() {
    // let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopDrawer
          visible={this.props.notification.visible}
          onClose={this.props.toogleNotification}
        >
          <Grid container spacing={2}>
            <Grid item xs={11} md={10}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onCart}
              >
                <Typography>Cart</Typography>
              </Button>
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
  toogleCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Notification)));