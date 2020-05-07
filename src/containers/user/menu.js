import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import {
  HomeRounded, AccountBalanceWalletRounded,
  SettingsRounded, ChatRounded, StorefrontRounded,
} from '@material-ui/icons';

import styles from './styles';
import { checkTreeRootInLocalStorage } from 'components/blueprint/tree/history';


class Menu extends Component {

  render() {
    let { match: { params: { email, page } } } = this.props;

    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Badge badgeContent={checkTreeRootInLocalStorage() ? 1 : 0} color="primary">
          <Button
            variant="outlined"
            color={page === 'home' ? 'primary' : 'default'}
            startIcon={<HomeRounded />}
            component={RouterLink}
            to={`/user/${email}/home`}
          >
            <Typography>Home</Typography>
          </Button>
        </Badge>
      </Grid>
      <Grid item>
        <Badge badgeContent={4} color="primary">
          <Button
            variant="outlined"
            color={page === 'store' ? 'primary' : 'default'}
            startIcon={<StorefrontRounded />}
            component={RouterLink}
            to={`/user/${email}/store`}
          >
            <Typography>Store</Typography>
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
            <Typography>Message</Typography>
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
            <Typography>Wallet</Typography>
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
          >
            <Typography>Settings</Typography>
          </Button>
        </Badge>
      </Grid>
    </Grid>

  }
}

Menu.defaultProps = {
  category: ''
}

Menu.propTypes = {
  category: PropTypes.string
}

export default withRouter(withStyles(styles)(Menu));