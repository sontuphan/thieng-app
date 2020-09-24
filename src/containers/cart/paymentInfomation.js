import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import {
  ReceiptRounded,
  LocalAtmRounded, CreditCardRounded, AccountBalanceRounded,
} from '@material-ui/icons';

import Drain from 'components/drain';
import { Momo } from 'components/icons';
import PaymentGuide from './paymentGuide';

import { toggleCart, setCart } from 'modules/cart.reducer';

import styles from './styles';
import utils from 'helpers/utils';


const PAYMENT_METHODS = [
  { value: 'cod', icon: <LocalAtmRounded fontSize="small" />, disabled: false },
  { value: 'momo', icon: <Momo fontSize="small" />, disabled: true },
  { value: 'credit', icon: <CreditCardRounded fontSize="small" />, disabled: true },
  { value: 'bank', icon: <AccountBalanceRounded fontSize="small" />, disabled: false },
]

class PaymentInfomation extends Component {
  constructor() {
    super();

    this.state = {
      promoCode: '',
      paymentMethod: 'cod',
      visible: false,
    }
  }

  componentDidMount() {
    this.returnData();
  }

  returnData = () => {
    const { promoCode, paymentMethod } = this.state;
    return this.props.onChange({ promoCode, paymentMethod });
  }

  onCode = (e) => {
    let promoCode = e.target.value;
    if (!promoCode) promoCode = '';
    return this.setState({ promoCode }, this.returnData);
  }

  onPayment = (e) => {
    let paymentMethod = e.target.value;
    if (!paymentMethod) paymentMethod = 'cod';
    return this.setState({ paymentMethod, visible: paymentMethod === 'bank' }, this.returnData);
  }

  getBill = () => {
    const { cart: { data } } = this.props;
    const amount = data.reduce((total, { amount, price }) => total + amount * price, 0);
    return `${utils.prettyNumber(amount, 'long')} ₫`;
  }

  render() {
    const { classes } = this.props;
    return <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2} >
          <Grid item>
            <Typography variant="h6">Thanh toán</Typography>
          </Grid>
          <Grid item className={classes.stretch} xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item className={classes.icon}>
            <ReceiptRounded fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <Typography>Tổng</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h6">{this.getBill()}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Promotion code */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Mã giảm giá"
          color="secondary"
          variant="outlined"
          value={this.state.promoCode}
          onChange={this.onCode}
          multiline
          fullWidth
        />
      </Grid>
      {/* Payment */}
      <Grid item xs={12} sm={6} md={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel color="secondary">Phương thức thanh toán</InputLabel>
          <Select
            label="Phương thức thanh toán"
            color="secondary"
            value={this.state.paymentMethod}
            onChange={this.onPayment}
            classes={{ root: classes.selectIcon }}
          >
            {PAYMENT_METHODS.map((method, i) => <MenuItem value={method.value} key={i} disabled={method.disabled}>
              <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                <Grid item className={classes.icon}>
                  {method.icon}
                </Grid>
                <Grid item className={classes.stretch}>
                  <Typography>{utils.translatePaymentMethod(method.value)}</Typography>
                </Grid>
              </Grid>
            </MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <PaymentGuide
        value={this.getBill()}
        visible={this.state.visible}
        onClose={() => this.setState({ visible: false })}
      />
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleCart,
  setCart,
}, dispatch);

PaymentInfomation.defaultProps = {
  onChange: () => { },
}

PaymentInfomation.propTypes = {
  onChange: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PaymentInfomation)));