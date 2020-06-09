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
  ViewStreamRounded, TimelineRounded,
} from '@material-ui/icons';

import styles from './styles';
import { checkTreeRootInLocalStorage } from 'components/blueprint/tree/history';


class Menu extends Component {

  render() {
    const { match: { params: { email, page } } } = this.props;
    const { items: { creation: { data } } } = this.props;

    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Badge badgeContent={checkTreeRootInLocalStorage() ? 1 : 0} color="primary">
          <Button
            variant="outlined"
            color={page === 'home' ? 'primary' : 'default'}
            startIcon={<HomeRounded />}
            component={RouterLink}
            to={`/user/${email}/home`}
            disabled
          >
            <Typography>Trang chủ</Typography>
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={data.length} color="primary">
          <Button
            variant="outlined"
            color={page === 'store' ? 'primary' : 'default'}
            startIcon={<StorefrontRounded />}
            component={RouterLink}
            to={`/user/${email}/store`}
          >
            <Typography>Cửa hàng</Typography>
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          <Button
            variant="outlined"
            color={page === 'orders' ? 'primary' : 'default'}
            startIcon={<ViewStreamRounded />}
            component={RouterLink}
            to={`/user/${email}/orders`}
          >
            <Typography>Đơn hàng</Typography>
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          <Button
            variant="outlined"
            color={page === 'message' ? 'primary' : 'default'}
            startIcon={<ChatRounded />}
            component={RouterLink}
            to={`/user/${email}/message`}
            disabled
          >
            <Typography>Tin nhắn</Typography>
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          <Button
            variant="outlined"
            color={page === 'wallet' ? 'primary' : 'default'}
            startIcon={<AccountBalanceWalletRounded />}
            component={RouterLink}
            to={`/user/${email}/wallet`}
            disabled
          >
            <Typography>Ví</Typography>
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          <Button
            variant="outlined"
            color={page === 'history' ? 'primary' : 'default'}
            startIcon={<TimelineRounded />}
            component={RouterLink}
            to={`/user/${email}/history`}
          >
            <Typography>Lịch sử mua hàng</Typography>
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={0} color="primary">
          <Button
            variant="outlined"
            color={page === 'settings' ? 'primary' : 'default'}
            startIcon={<SettingsRounded />}
            component={RouterLink}
            to={`/user/${email}/settings`}
            disabled
          >
            <Typography>Cài đặt</Typography>
          </Button>
        </Badge>
      </Grid>
    </Grid>

  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Menu)));