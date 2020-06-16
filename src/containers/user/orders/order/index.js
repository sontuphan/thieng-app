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
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import {
  ArrowBackRounded, ReceiptRounded,
  LocalAtmRounded, CreditCardRounded, AccountBalanceRounded,
} from '@material-ui/icons';

import { ProductCard } from 'components/cards';
import { NumericInput } from 'components/inputs';
import { Momo } from 'components/icons';
import Drain from 'components/drain';

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

  renderBill = (order) => {
    const { classes } = this.props;
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

  renderUserInfo = (order) => {
    const { classes } = this.props;
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
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={12}>
          {this.renderBill(order)}
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={12}>
          {this.renderUserInfo(order)}
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