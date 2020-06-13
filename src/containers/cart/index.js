import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import async from 'async';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { FlightTakeoffRounded } from '@material-ui/icons';

import { BottomDrawer } from 'components/drawers';
import Drain from 'components/drain';
import CartItem from './cartItem';
import DeliveryInfomation from './deliveryInfomation';
import PaymentInfomation from './paymentInfomation';

import { toogleCart, clearCart } from 'modules/cart.reducer';
import { addOrder } from 'modules/order.reducer';

import styles from './styles';


class Cart extends Component {
  constructor() {
    super();

    this.state = {}
  }

  onPaymentInfo = (value) => {
    return this.setState(value);
  }

  onDeliveryInfo = (value) => {
    return this.setState(value);
  }

  onDone = () => {
    const { cart: { data } } = this.props;
    const { toogleCart, addOrder, clearCart } = this.props;
    const info = { ...this.state }
    // Normalize data
    const group = data.reduce((g, i) => {
      let item = { ...i }
      const { userId } = item;
      if (!g[userId]) g[userId] = [];
      item.itemId = item._id;
      delete item.userId;
      delete item._id;
      g[userId].push(item);
      return g;
    }, {});
    const carts = Object.keys(group).map(sellerId => {
      return { ...info, sellerId, items: group[sellerId] }
    });
    // Submit data
    return async.map(carts, (cart, cb) => {
      return addOrder(cart).then(re => cb(null, re)).catch(er => cb(er, null));
    }, (er, re) => {
      if (er) console.error(er);
      else clearCart();
      return toogleCart();
    });
  }

  render() {
    const { classes } = this.props;
    const { toogleCart, cart: { data, visible } } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <BottomDrawer visible={visible} onClose={toogleCart}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={11} md={10}>
              <Grid container spacing={2}>
                {data.map(item => <Grid item key={item._id} xs={6} sm={4} md={3} lg={2}>
                  <CartItem item={item} />
                </Grid>)}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={11} md={10}>
              <PaymentInfomation onChange={this.onPaymentInfo} />
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={11} md={10}>
              <DeliveryInfomation onChange={this.onDeliveryInfo} />
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={11} md={10}>
              <Grid container alignItems="center" className={classes.noWrap} spacing={2} >
                <Grid item>
                  <Typography>Kiểm tra thật kỹ đơn hàng nhé! <span role="img" aria-label="smile">😊</span></Typography>
                </Grid>
                <Grid item className={classes.stretch} xs={12}>
                  <Divider />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FlightTakeoffRounded />}
                    onClick={this.onDone}
                  >
                    <Typography>Xong</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Drain />
            </Grid>
          </Grid>
        </BottomDrawer>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toogleCart, clearCart,
  addOrder,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cart)));