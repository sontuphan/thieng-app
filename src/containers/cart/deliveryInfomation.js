import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  HomeRounded, BusinessRounded, LocationCityRounded,
} from '@material-ui/icons';

import Drain from 'components/drain';

import { toogleCart, setCart } from 'modules/cart.reducer';
import { getUser } from 'modules/bucket.reducer';

import styles from './styles';


class DeliveryInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      receiverName: '',
      receiverPhone: '',
      receiverAddress: '',
      selectedAddress: 0,
      note: '',
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, selectedAddress } = this.state;
    if (!isEqual(prevState.user, user)) {
      return this.setState({
        receiverName: user.displayname,
        receiverPhone: user.phone || '',
        receiverAddress: (user.addresses && user.addresses[selectedAddress]) || '',
      });
    }
  }

  loadData = () => {
    const { auth, getUser } = this.props;
    const userId = auth._id;
    return getUser(userId).then(user => {
      if (user) return this.setState({ user });
    }).catch(console.error);
  }

  returnData = () => {
    const data = { ...this.state };
    delete data.user;
    delete data.selectedAddress;
    return this.props.onChange(data);
  }

  onName = (e) => {
    let receiverName = e.target.value;
    if (!receiverName) receiverName = '';
    return this.setState({ receiverName }, this.returnData);
  }

  onPhone = (e) => {
    let receiverPhone = e.target.value;
    if (!receiverPhone) receiverPhone = '';
    return this.setState({ receiverPhone }, this.returnData);
  }

  onAddress = (e) => {
    let receiverAddress = e.target.value;
    if (!receiverAddress) receiverAddress = '';
    return this.setState({ receiverAddress }, this.returnData);
  }

  onSelect = (e) => {
    let selectedAddress = e.target.value;
    const { user } = this.state;
    if (!user) return this.setState({ selectedAddress }, this.returnData);
    let receiverAddress = user.addresses[selectedAddress];
    if (!receiverAddress) receiverAddress = '';
    return this.setState({ selectedAddress, receiverAddress }, this.returnData);
  }

  onNote = (e) => {
    let note = e.target.value;
    if (!note) note = '';
    return this.setState({ note }, this.returnData);
  }

  render() {
    const { classes } = this.props;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          className={classes.noWrap}
          spacing={2}
        >
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
          value={this.state.receiverName}
          onChange={this.onName}
          multiline
          fullWidth
        />
      </Grid>
      {/* Phone */}
      <Grid item xs={12} md={6}>
        <TextField
          label="Số điện thoại người nhận"
          color="secondary"
          variant="outlined"
          value={this.state.receiverPhone}
          onChange={this.onPhone}
          multiline
          fullWidth
        />
      </Grid>
      {/* Address */}
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} spacing={2}>
          <Grid item className={classes.stretch}>
            <TextField
              label="Địa chỉ người nhận"
              color="secondary"
              variant="outlined"
              value={this.state.receiverAddress}
              onChange={this.onAddress}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item>
            <Select
              variant="outlined"
              color="secondary"
              value={this.state.selectedAddress}
              onChange={this.onSelect}
              classes={{ root: classes.selectIcon }}
              fullWidth
            >
              <MenuItem value={0}>
                <Grid container spacing={2}>
                  <Grid item className={classes.icon}>
                    <HomeRounded fontSize="small" />
                  </Grid>
                </Grid>
              </MenuItem>
              <MenuItem value={1}>
                <Grid container spacing={2}>
                  <Grid item className={classes.icon}>
                    <BusinessRounded fontSize="small" />
                  </Grid>
                </Grid>
              </MenuItem>
              <MenuItem value={2}>
                <Grid container spacing={2}>
                  <Grid item className={classes.icon}>
                    <LocationCityRounded fontSize="small" />
                  </Grid>
                </Grid>
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
      {/* Note */}
      <Grid item xs={12}>
        <TextField
          label="Chú thích thêm"
          color="secondary"
          variant="outlined"
          value={this.state.note}
          onChange={this.onNote}
          multiline
          fullWidth
        />
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
  toogleCart, setCart,
  getUser
}, dispatch);

DeliveryInformation.defaultProps = {
  onChange: () => { },
}

DeliveryInformation.propTypes = {
  onChange: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeliveryInformation)));