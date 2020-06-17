import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import {
  ReceiptRounded,
  LocalAtmRounded, CreditCardRounded, AccountBalanceRounded,
} from '@material-ui/icons';

import { Momo } from 'components/icons';
import Drain from 'components/drain';

import utils from 'helpers/utils';

const useStyles = makeStyles(theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  selectIcon: {
    padding: '16.5px 14px'
  },
  icon: {
    height: 36,
  }
}));

function OrderPayment(props) {
  const classes = useStyles();
  const { order } = props;
  if (!order.items) return null;
  return <Grid container alignItems="center" spacing={2}>
    <Grid item xs={12}>
      <Grid container className={classes.noWrap} alignItems="center" spacing={2} >
        <Grid item>
          <Typography variant="h3">Thanh toán</Typography>
        </Grid>
        <Grid item className={classes.stretch} xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Drain small />
    </Grid>
    {/* Total */}
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
          <Typography variant="h3">{`${utils.prettyNumber(order.items.reduce((total, { amount, price }) => total + amount * price, 0), 'long')} ₫`}</Typography>
        </Grid>
      </Grid>
    </Grid>
    {/* Promotion code */}
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Mã giảm giá"
        color="secondary"
        variant="outlined"
        value={order.promoCode}
        multiline
        fullWidth
        readOnly
      />
    </Grid>
    {/* Payment */}
    <Grid item xs={12} sm={6} md={4}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel color="secondary">Phương thức thanh toán</InputLabel>
        <Select
          label="Phương thức thanh toán"
          color="secondary"
          value={order.paymentMethod}
          classes={{ root: classes.selectIcon }}
          readOnly
        >
          <MenuItem value={'cod'}>
            <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
              <Grid item className={classes.icon}>
                <LocalAtmRounded fontSize="small" />
              </Grid>
              <Grid item className={classes.stretch}>
                <Typography>Giao hàng nhận tiền (COD)</Typography>
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem value={'momo'}>
            <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
              <Grid item className={classes.icon}>
                <Momo fontSize="small" />
              </Grid>
              <Grid item className={classes.stretch}>
                <Typography>Momo</Typography>
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem value={'credit'}>
            <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
              <Grid item className={classes.icon}>
                <CreditCardRounded fontSize="small" />
              </Grid>
              <Grid item className={classes.stretch}>
                <Typography>Thẻ ghi nợ (Credit)</Typography>
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem value={'bank'}>
            <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
              <Grid item className={classes.icon}>
                <AccountBalanceRounded fontSize="small" />
              </Grid>
              <Grid item className={classes.stretch}>
                <Typography>Thẻ ngân hàng</Typography>
              </Grid>
            </Grid>
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

OrderPayment.defaultProps = {
  order: {},
}

OrderPayment.propTypes = {
  order: PropTypes.object,
}

export default OrderPayment;