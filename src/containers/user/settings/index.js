import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  HomeRounded, BusinessRounded, LocationCityRounded,
  SaveRounded,
} from '@material-ui/icons';

import Drain from 'components/drain';

import { getUser } from 'modules/bucket.reducer';
import { updateUser } from 'modules/user.reducer';
import { setConfirmation } from 'modules/notification.reducer';

import styles from './styles';


class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      selectedAddress: 0,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;
    if (!isEqual(prevProps.auth, auth)) {
      this.loadData();
    }
  }

  loadData = () => {
    const { auth: { _id }, getUser } = this.props;
    return getUser(_id).then(user => {
      if (user) return this.setState({ user });
    }).catch(console.error);
  }

  onSave = () => {
    const { user } = this.state;
    const { updateUser, setConfirmation } = this.props;
    return updateUser(user).then(re => {
      return setConfirmation(true, 'Cập nhật thông tin thành công', 'success');
    }).catch(er => {
      return setConfirmation(true, 'Đã có lỗi xảy ra', 'error');
    });
  }

  onAddress = (e) => {
    let address = e.target.value;
    let { user, selectedAddress } = this.state;
    user.addresses[selectedAddress] = address;
    return this.setState({ user });
  }

  onPhone = (e) => {
    let phone = e.target.value;
    let { user } = this.state;
    user.phone = phone;
    return this.setState({ user });
  }

  onSelect = (e) => {
    let selectedAddress = e.target.value;
    return this.setState({ selectedAddress });
  }

  render() {
    const { classes } = this.props;
    const { user, selectedAddress } = this.state;

    return <Grid container justify="center" spacing={2}>

      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="h3">Thông tin cá nhân</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Drain small />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {/* Email */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              color="secondary"
              variant="outlined"
              value={user.email ? user.email : ''}
              multiline
              fullWidth
              readOnly
            />
          </Grid>
          {/* Phone */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Số điện thoại"
              color="secondary"
              variant="outlined"
              value={user.phone ? user.phone : ''}
              onChange={this.onPhone}
              multiline
              fullWidth
            />
          </Grid>
          {/* Address */}
          <Grid item xs={12}>
            <Grid container className={classes.noWrap} spacing={2}>
              <Grid item>
                <Select
                  variant="outlined"
                  color="secondary"
                  value={selectedAddress}
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
              <Grid item className={classes.stretch}>
                <TextField
                  label="Địa chỉ"
                  color="secondary"
                  variant="outlined"
                  value={user.addresses ? user.addresses[selectedAddress] : ''}
                  onChange={this.onAddress}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Action */}
          <Grid item xs={12}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveRounded />}
                  onClick={this.onSave}
                >
                  <Typography>Lưu</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
  updateUser,
  setConfirmation,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserSettings)));