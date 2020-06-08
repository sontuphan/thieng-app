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

  render() {
    const { classes } = this.props;
    const { cart: { data } } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <BottomDrawer visible={this.props.cart.visible} onClose={this.props.toogleCart}>
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
              <Grid container alignItems="center" className={classes.noWrap} spacing={2} >
                <Grid item>
                  <Typography>Hãy kiểm tra thật kỹ đơn hàng nhé <span role="img" aria-label="smile">☺️</span>!</Typography>
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
  toogleCart,
  setCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cart)));