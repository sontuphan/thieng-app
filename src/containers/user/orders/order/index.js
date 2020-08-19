import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import {
  ArrowBackRounded, ScheduleRounded, UnarchiveRounded,
  FlightRounded, BlockRounded, ThumbUpAltRounded,
} from '@material-ui/icons';

import OrderItems from './items';
import OrderPayment from './payment';
import OrderDelivery from './delivery';
import Drain from 'components/drain';

import { getOrder } from 'modules/bucket.reducer';
import { updateOrderStatus, updateOrderPaymentStatus } from 'modules/order.reducer';

import styles from './styles';
import utils from 'helpers/utils';

const ACTIONS = [
  { value: 'waiting', icon: <ScheduleRounded /> },
  { value: 'packaging', icon: <UnarchiveRounded /> },
  { value: 'delivering', icon: <FlightRounded /> },
  { value: 'canceled', icon: <BlockRounded /> },
  { value: 'done', icon: <ThumbUpAltRounded /> },
]


class Order extends Component {

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (!isEqual(prevProps.visible, visible) && visible) {
      this.loadData();
    }
  }

  loadData = (reset = false) => {
    const { orderId, getOrder } = this.props;
    if (orderId) return getOrder(orderId, reset);
  }

  onPaymentStatus = (order, paymentStatus) => {
    const { updateOrderPaymentStatus } = this.props;
    return updateOrderPaymentStatus({ _id: order._id, paymentStatus }).then(() => {
      return this.loadData(true);
    }).catch(console.error);
  }

  renderStatusButton = (order, action) => {
    const { updateOrderStatus } = this.props;
    const updateStatus = () => {
      return updateOrderStatus({ _id: order._id, status: action.value }).then(() => {
        return this.loadData(true);
      }).catch(console.error);
    }
    return <Button
      variant="outlined"
      color={order.status === action.value ? 'primary' : 'default'}
      startIcon={action.icon}
      onClick={updateStatus}
    >
      <Typography>{utils.translateOrderStatus(action.value)}</Typography>
    </Button>
  }

  renderActions = (order) => {
    const { classes } = this.props;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
          <Grid item>
            <Typography variant="h3">Tình trạng đơn hàng</Typography>
          </Grid>
          <Grid item className={classes.stretch} xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      {ACTIONS.map((action, i) => <Grid item key={i}>
        {this.renderStatusButton(order, action)}
      </Grid>)}
    </Grid >
  }

  render() {
    const { classes } = this.props;
    const { visible, orderId, onClose, bucket } = this.props;
    const order = bucket[orderId] || {};

    return <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2} className={classes.noWrap}>
            <Grid item>
              <IconButton onClick={onClose} size="small">
                <ArrowBackRounded />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>Quay lại</Typography>
            </Grid>
            <Grid item className={classes.stretch} />
            <Grid item>
              <Typography>{orderId}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={12}>
          <OrderItems order={order} />
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={12}>
          <OrderPayment
            order={order}
            onPaymentStatus={(paymentStatus) => this.onPaymentStatus(order, paymentStatus)}
          />
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={12}>
          <OrderDelivery order={order} />
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={12}>
          {this.renderActions(order)}
        </Grid>
      </Grid>
    </Slide>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  bucket: state.bucket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrder,
  updateOrderStatus, updateOrderPaymentStatus,
}, dispatch);

Order.defaultProps = {
  visible: false,
  onClose: () => { },
}

Order.propTypes = {
  orderId: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Order)));