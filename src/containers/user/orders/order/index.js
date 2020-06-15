import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';

import { ArrowBackRounded, ShoppingBasketRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import { ProductCard } from 'components/cards';
import { NumericInput } from 'components/inputs';

import { getOrder } from 'modules/bucket.reducer';

import styles from './styles';
import utils from 'helpers/utils';


class Order extends Component {

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (!isEqual(prevProps.visible, visible) && visible) {
      this.loadData();
    }
  }

  loadData = () => {
    const { orderId, getOrder } = this.props;
    if (orderId) return getOrder(orderId);
  }

  renderItems = (order) => {
    const { classes } = this.props;
    if (!order.items) return null;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="flex-end" alignItems="center" className={classes.noWrap} spacing={2}>
          <Grid item>
            <Typography variant="h3">Sản phẩm</Typography>
          </Grid>
          <Grid item>
            <IconButton size="small">
              <ShoppingBasketRounded color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {order.items.map((item, i) => <Grid item key={i} xs={6} md={3}>
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

  render() {
    const { classes } = this.props;
    const { visible, orderId, onClose, bucket } = this.props;
    const order = bucket[orderId] || {};

    return <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2} className={classes.noWrap}>
            <Grid item>
              <IconButton onClick={onClose} size="small">
                <ArrowBackRounded />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>Quay lại</Typography>
            </Grid>
            <Grid item className={classes.stretch} />
            <Grid item>
              <Typography>{orderId}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={12}>
          {this.renderItems(order)}
        </Grid>
      </Grid>
    </Slide>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  bucket: state.bucket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrder,
}, dispatch);

Order.defaultProps = {
  visible: false,
  onClose: () => { },
}

Order.propTypes = {
  orderId: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Order)));