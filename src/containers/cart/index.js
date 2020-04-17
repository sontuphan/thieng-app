import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { CancelRounded } from '@material-ui/icons';

import { BottomDrawer } from 'components/drawers';
import { ProductCard } from 'components/cards';
import { NumericInput } from 'components/inputs';

import { toogleCart, setCart } from 'modules/cart.reducer';

import styles from './styles';
import utils from 'helpers/utils';


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
    if (!items || !items.length) return null;

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
                  items.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12}>
                        <ProductCard object={obj} />
                      </Grid>
                      <Grid item xs={12}>
                        <NumericInput
                          variant="outlined"
                          value={obj.amount}
                          onChange={amount => { this.onChange(obj, amount) }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
                          <Grid item>
                            <Grid item>
                              <Tooltip title="Cancel">
                                <IconButton
                                  color="primary"
                                  size="small"
                                  onClick={obj => this.onCancel(obj)}
                                >
                                  <CancelRounded />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                          <Grid item className={classes.stretch}>
                            <Divider />
                          </Grid>
                          <Grid item>
                            <Typography variant="h3">{utils.prettyNumber(obj.amount * obj.price, 'long')} {obj.unit}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>)
                }
              </Grid>
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