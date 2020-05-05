import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

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

import styles from './styles';


class DeliveryInformation extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      phone: '',
      address: '',
      selectedAddress: 0,
      note: '',
    }
  }

  onName = (e) => {
    let name = e.target.value;
    if (!name) name = '';
    this.setState({ name });
  }

  onPhone = (e) => {
    let phone = e.target.value;
    if (!phone) phone = '';
    this.setState({ phone });
  }

  onAddress = (e) => {
    let address = e.target.value;
    if (!address) address = '';
    this.setState({ address });
  }

  onSelect = (e) => {
    let selectedAddress = e.target.value;
    this.setState({ selectedAddress });
  }

  onNote = (e) => {
    let note = e.target.value;
    if (!note) note = '';
    this.setState({ note });
  }

  render() {
    let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          className={classes.noWrap}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3">Delivery information</Typography>
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
          label="Receiver's full name"
          color="secondary"
          variant="outlined"
          value={this.state.name}
          onChange={this.onName}
          multiline
          fullWidth
        />
      </Grid>
      {/* Phone */}
      <Grid item xs={12} md={6}>
        <TextField
          label="Receiver's phone number"
          color="secondary"
          variant="outlined"
          value={this.state.phone}
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
              label="Receiver's address"
              color="secondary"
              variant="outlined"
              value={this.state.address}
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
          label="Your notes for us"
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
  toogleCart,
  setCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeliveryInformation)));