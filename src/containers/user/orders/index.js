import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { HourglassEmptyRounded, DoneAllRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import ProcessingOrders from './processing';

import { } from 'modules/bucket.reducer';

import styles from './styles';


class UserOrders extends Component {
  constructor() {
    super();

    this.state = {
      tabs: ['processing', 'done'],
      tab: 'processing',
    }
  }

  render() {
    const { classes } = this.props;
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">Đơn hàng</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<HourglassEmptyRounded />}
              onClick={() => this.setState({ tab: 'processing' })}
              color={this.state.tab === 'processing' ? 'primary' : 'default'}
            >
              <Typography>Cần xử lý</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<DoneAllRounded />}
              onClick={() => this.setState({ tab: 'done' })}
              color={this.state.tab === 'done' ? 'primary' : 'default'}
            >
              <Typography>Đã xong</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12}>
        {this.state.tab === 'processing' ? <ProcessingOrders /> : null}
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserOrders)));