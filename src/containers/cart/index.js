import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

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

import { toogleCart, setCart } from 'modules/cart.reducer';

import styles from './styles';


class Cart extends Component {
  constructor() {
    super();

    this.state = {
      amount: 0,
    }
  }

  onChange = (item, amount) => {
    item.amount = amount;
    this.props.setCart(item);
  }

  onCancel = (item) => {
    this.props.setCart({ ...item, amount: 0 });
  }

  render() {
    let { classes } = this.props;
    let items = this.props.cart.data;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <BottomDrawer
          visible={this.props.cart.visible}
          onClose={this.props.toogleCart}
        >
          <Grid container spacing={2} justify="center">
            <Grid item xs={11} md={10}>
              <Grid container spacing={2}>
                {
                  items.map(item => <Grid item key={item.id} xs={6} sm={4} md={3} lg={2}>
                    <CartItem item={item} />
                  </Grid>)
                }
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={11} md={10}>
              <PaymentInfomation />
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={11} md={10}>
              <DeliveryInfomation />
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={11} md={10}>
              <Grid
                container
                alignItems="center"
                className={classes.noWrap}
                spacing={2}
              >
                <Grid item>
                  <Typography>Please ensure your information is correct!</Typography>
                </Grid>
                <Grid item className={classes.stretch} xs={12}>
                  <Divider />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FlightTakeoffRounded />}
                  >
                    <Typography>Done</Typography>
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
  toogleCart,
  setCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cart)));