import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import Drain from 'components/drain';

const useStyles = makeStyles(theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
}));


function OrderDelivery(props) {
  const classes = useStyles();
  const { order } = props;
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
        <Grid item>
          <Typography variant="h3">Giao hàng</Typography>
        </Grid>
        <Grid item className={classes.stretch} xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Drain small />
    </Grid>
    {/* Name */}
    <Grid item xs={12} md={6}>
      <TextField
        label="Tên người nhận"
        color="secondary"
        variant="outlined"
        value={order.receiverName}
        multiline
        fullWidth
        readOnly
      />
    </Grid>
    {/* Phone */}
    <Grid item xs={12} md={6}>
      <TextField
        label="Số điện thoại người nhận"
        color="secondary"
        variant="outlined"
        value={order.receiverPhone}
        multiline
        fullWidth
        readOnly
      />
    </Grid>
    {/* Address */}
    <Grid item xs={12}>
      <TextField
        label="Địa chỉ người nhận"
        color="secondary"
        variant="outlined"
        value={order.receiverAddress}
        multiline
        fullWidth
        readOnly
      />
    </Grid>
    {/* Note */}
    <Grid item xs={12}>
      <TextField
        label="Chú thích thêm"
        color="secondary"
        variant="outlined"
        value={order.note}
        multiline
        fullWidth
        readOnly
      />
    </Grid>
  </Grid>
}

OrderDelivery.defaultProps = {
  order: {},
}

OrderDelivery.propTypes = {
  order: PropTypes.object,
}

export default OrderDelivery;