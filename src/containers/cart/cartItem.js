import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { CancelRounded } from '@material-ui/icons';

import { ProductCard } from 'components/cards';
import { NumericInput } from 'components/inputs';

import { toggleCart, setCart } from 'modules/cart.reducer';

import styles from './styles';
import utils from 'helpers/utils';


class CartItem extends Component {
  constructor() {
    super();

    this.state = {
      amount: 0,
    }
  }

  onChange = (amount) => {
    const { item, setCart } = this.props;
    return setCart({ ...item, amount });
  }

  onCancel = () => {
    const { item, setCart } = this.props;
    return setCart({ ...item, amount: 0 });
  }

  render() {
    const { classes } = this.props;
    const { item } = this.props;

    if (!item) return null;
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <ProductCard itemId={item._id} />
      </Grid>
      <Grid item xs={12}>
        <NumericInput
          variant="outlined"
          value={item.amount}
          onChange={this.onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
          <Grid item>
            <Tooltip title="Hủy mua">
              <IconButton size="small" onClick={this.onCancel}>
                <CancelRounded />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h3">{utils.prettyNumber(item.amount * item.price, 'long')} ₫</Typography>
          </Grid>
        </Grid>
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
  toggleCart,
  setCart,
}, dispatch);

CartItem.defaultProps = {
  item: null,
}

CartItem.propTypes = {
  item: PropTypes.object,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CartItem)));