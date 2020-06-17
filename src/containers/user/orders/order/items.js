import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { ProductCard } from 'components/cards';
import { NumericInput } from 'components/inputs';

import utils from 'helpers/utils';

const useStyles = makeStyles(theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
}));

function OrderItems(props) {
  const classes = useStyles();
  const { order } = props;
  if (!order.items) return null;
  return <Grid container spacing={2}>
    {order.items.map((item, i) => <Grid item key={i} xs={6} sm={4} md={3} lg={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProductCard itemId={item.itemId} />
        </Grid>
        <Grid item xs={12}>
          <NumericInput
            variant="outlined"
            value={item.amount}
            readOnly
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
            <Grid item className={classes.stretch}>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant="h3">{utils.prettyNumber(item.amount * item.price, 'long')} ₫</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>)}
  </Grid>
}

OrderItems.defaultProps = {
  order: {},
}

OrderItems.propTypes = {
  order: PropTypes.object,
}

export default OrderItems;