import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { LoyaltyRounded, InfoRounded } from '@material-ui/icons';

import { NumericInput } from 'components/inputs';


const useStyles = makeStyles(theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  info: {
    cursor: 'pointer',
  }
}));

function Discount(props) {
  const classes = useStyles();
  const { onChange, value } = props;
  const info = `
    Chọn phần trăm cho chương trình khuyến mãi. 
    Bạn có thể kiểm tra lại ở phần nhãn phía trên của sản phẩm.
  `
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container alignItems="center" className={classes.onWrap} spacing={2}>
        <Grid item >
          <LoyaltyRounded color="primary" fontSize="small" />
        </Grid>
        <Grid item>
          <Typography>Khuyến mãi</Typography>
        </Grid>
        <Grid item className={classes.stretch}>
          <Divider />
        </Grid>
        <Tooltip title={info} className={classes.info}>
          <InfoRounded fontSize="small" />
        </Tooltip>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <NumericInput value={value} onChange={onChange} />
    </Grid>
  </Grid>
}

Discount.defaultProps = {
  onChange: () => { },
  value: 0,
}

Discount.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
}

export default Discount;