import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

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

import { toogleCart, setCart } from 'modules/cart.reducer';

import styles from './styles';
import utils from 'helpers/utils';


class PaymentInfomation extends Component {
  constructor() {
    super();

    this.state = {
      code: '',
      payment: 'cod',
    }
  }

  onCode = (e) => {
    let code = e.target.value;
    if (!code) code = '';
    this.setState({ code });
  }

  onPayment = (e) => {
    let payment = e.target.value;
    this.setState({ payment });
  }

  getBill = () => {
    let amount = this.props.cart.data.reduce((total, item) => total + item.amount * item.price, 0);
    let unit = this.props.cart.data[0].unit || 'vnd';
    return `${utils.prettyNumber(amount, 'long')} ${unit}`;
  }

  render() {
    let { classes } = this.props;

    return <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          className={classes.noWrap}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3">Payment information</Typography>
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
            <Typography>Total</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h3">{this.getBill()}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Promotion code */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Promotion Code"
          color="secondary"
          variant="outlined"
          value={this.state.code}
          onChange={this.onCode}
          InputProps={{ classes: { input: classes.font } }}
          multiline
          fullWidth
        />
      </Grid>
      {/* Payment */}
      <Grid item xs={12} sm={6} md={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel color="secondary">Payment Method</InputLabel>
          <Select
            label="Payment Method"
            color="secondary"
            value={this.state.payment}
            onChange={this.onPayment}
          >
            <MenuItem value={'cod'}>
              <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                <Grid item className={classes.icon}>
                  <LocalAtmRounded fontSize="small" />
                </Grid>
                <Grid item className={classes.stretch}>
                  <Typography>Cash on Delivery (COD)</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem value={'credit'}>
              <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                <Grid item className={classes.icon}>
                  <CreditCardRounded fontSize="small" />
                </Grid>
                <Grid item className={classes.stretch}>
                  <Typography>Credit</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem value={'bank'}>
              <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                <Grid item className={classes.icon}>
                  <AccountBalanceRounded fontSize="small" />
                </Grid>
                <Grid item className={classes.stretch}>
                  <Typography>Bank Card</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          </Select>
        </FormControl>
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
)(withStyles(styles)(PaymentInfomation)));