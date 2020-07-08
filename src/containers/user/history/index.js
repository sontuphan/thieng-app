import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { ExpandMoreRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import { CircularProgressButton } from 'components/buttons';
import MyOrder from './order';

import styles from './styles';

import { getMyOrders } from 'modules/order.reducer';
import { setConfirmation } from 'modules/notification.reducer';


class UserHistory extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      isLoading: false
    }
  }

  componentDidMount() {
    const { order: { pagination: { limit } } } = this.props;
    return this.loadData(limit, 0);
  }

  loadData = (limit, page) => {
    const { setConfirmation, getMyOrders } = this.props;
    return getMyOrders({}, limit, page).catch(er => {
      return setConfirmation(true, er, 'error');
    });
  }

  onLoad = () => {
    return this.setState({ isLoading: true }, () => {
      const { order: { pagination: { limit, page } } } = this.props;
      return this.loadData(limit, page + 1).catch(er => {
        return setConfirmation(true, er, 'error');
      }).finally(() => {
        return this.setState({ isLoading: false });
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { order: { data } } = this.props;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="h3">Lịch sử</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {data.map(({ _id }, i) => <Fragment key={i}>
            <Grid item xs={12}>
              <MyOrder orderId={_id} />
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
          </Fragment>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
            <CircularProgressButton
              endIcon={<ExpandMoreRounded />}
              isLoading={this.state.isLoading}
              onClick={this.onLoad}
            >
              <Typography>Thêm</Typography>
            </CircularProgressButton>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  order: state.order,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getMyOrders,
  setConfirmation,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserHistory)));