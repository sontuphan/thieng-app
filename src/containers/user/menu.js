import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import {
  HomeRounded, AccountBalanceWalletRounded,
  SettingsRounded, ChatRounded, StorefrontRounded,
  ViewStreamRounded, TimelineRounded, ArchiveRounded,
  HomeWorkRounded,
} from '@material-ui/icons';

import styles from './styles';
import { checkTreeRootInLocalStorage } from 'components/blueprint/tree/history';


const MENU = {
  home: { name: 'Trang chủ', value: 'home', icon: <HomeRounded />, disabled: true },
  store: { name: 'Cửa hàng', value: 'store', icon: <StorefrontRounded />, disabled: false },
  orders: { name: 'Đơn hàng', value: 'orders', icon: <ViewStreamRounded />, disabled: false },
  factory: { name: 'Xưởng', value: 'factory', icon: <HomeWorkRounded />, disabled: false },
  warehouse: { name: 'Nhà kho', value: 'warehouse', icon: <ArchiveRounded />, disabled: false },
  message: { name: 'Tin nhắn', value: 'message', icon: <ChatRounded />, disabled: true },
  wallet: { name: 'Ví', value: 'wallet', icon: <AccountBalanceWalletRounded />, disabled: true },
  history: { name: 'Lịch sử mua hàng', value: 'history', icon: <TimelineRounded />, disabled: false },
  settings: { name: 'Cài đặt', value: 'settings', icon: <SettingsRounded />, disabled: false },
}

class Menu extends Component {

  renderButton = ({ name, value, icon, disabled }) => {
    const { match: { params: { userId, page } } } = this.props;
    return <Button
      variant="outlined"
      color={page === value ? 'primary' : 'default'}
      startIcon={icon}
      component={RouterLink}
      to={`/user/${userId}/${value}`}
      disabled={disabled}
    >
      <Typography>{name}</Typography>
    </Button>
  }

  renderUser = () => {
    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Badge badgeContent={checkTreeRootInLocalStorage() ? 1 : 0} color="primary">
          {this.renderButton(MENU.home)}
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.message)}
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.wallet)}
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.history)}
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.settings)}
        </Badge>
      </Grid>
    </Grid>
  }

  renderSeller = () => {
    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.store)}
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.orders)}
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.factory)}
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          {this.renderButton(MENU.warehouse)}
        </Badge>
      </Grid>
    </Grid>
  }

  render() {
    return <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        {this.renderUser()}
      </Grid>
      <Grid item xs={12}>
        {this.renderSeller()}
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Menu)));