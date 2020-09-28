import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import TweenOne from 'rc-tween-one';
import Image from 'material-ui-image';

import {
  NotificationsRounded, SearchRounded, AccountCircleRounded
} from '@material-ui/icons';

import { BaseCard } from 'components/cards';

import LOGO from 'static/images/favicon.png';
import styles from './styles';
import { toggleAuth } from 'modules/auth.reducer';
import { toggleNotification } from 'modules/notification.reducer';
import { toggleSearch } from 'modules/search.reducer';
import { toggleCart } from 'modules/cart.reducer';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      visibleDrawer: false,
      blink: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (!isEqual(prevProps.location, location)) {
      if (location.hash === '#header') this.setState({ blink: true }, () => {
        return setTimeout(() => {
          this.setState({ blink: false });
        }, 5000);
      });
    }
  }

  onToggleDrawer = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleDrawer: visible });
    return this.setState({ visibleDrawer: !this.state.visibleDrawer });
  }

  onSearch = () => {
    this.onToggleDrawer(false);
    return this.props.toggleSearch();
  }

  onNotification = () => {
    const { auth, toggleCart, toggleAuth } = this.props;
    this.onToggleDrawer(false);
    if (!auth.isValid) return toggleAuth();
    // this.props.toggleNotification();
    return toggleCart();
  }

  onUser = () => {
    let { auth } = this.props;
    this.onToggleDrawer(false);
    if (!auth._id) return console.error('Not signed in yet.');
    return this.props.history.push('/user/' + auth._id + '/store');
  }

  renderProfile = () => {
    const { classes } = this.props;
    const { auth, toggleAuth } = this.props;

    if (!auth.isValid) return <Tooltip title={'Đăng ký / Đăng nhập'}>
      <IconButton size="small" color="secondary" onClick={toggleAuth}>
        <AccountCircleRounded />
      </IconButton>
    </Tooltip >
    return <Tooltip title={auth.displayname}>
      <Avatar alt={auth.avatar} src={auth.avatar} className={classes.avatar} onClick={this.onUser} />
    </Tooltip>
  }

  render() {
    const { classes } = this.props;
    const { cart: { data }, ui: { width } } = this.props;
    const { blink } = this.state;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={11} md={10}>
        <BaseCard>
          <Grid container spacing={2} className={classes.noWrap} alignItems="center">
            {/* Logo */}
            <Grid item className={classes.logo}>
              <Link color="textPrimary" underline="none" component={RouterLink} to={'/home'}>
                <Grid container spacing={1} className={classes.noWrap}>
                  <Grid item style={{ width: 35 }}>
                    <Image src={LOGO} aspectRatio={(27 / 27)} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" noWrap>Thiêng Store</Typography>
                    <Typography style={{ fontSize: 6 }} noWrap>Một sản phẩm của Thiêng Việt</Typography>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
            {/* Menu */}
            <Grid item className={classes.stretch}>
              <Grid container alignItems="center" justify="flex-end" spacing={width >= 960 ? 5 : 3}>
                {/* Search app */}
                <Grid item>
                  <IconButton size="small" color="secondary" onClick={this.onSearch}>
                    <SearchRounded />
                  </IconButton>
                </Grid>
                {/* Notification app */}
                <Grid item>
                  <IconButton size="small" color="secondary" onClick={this.onNotification}>
                    {blink ? <TweenOne animation={{ scale: 1.25, yoyo: true, repeat: -1 }} >
                      <Badge badgeContent={data.length} color="primary">
                        <NotificationsRounded />
                      </Badge>
                    </TweenOne> : <Badge badgeContent={data.length} color="primary">
                        <NotificationsRounded />
                      </Badge>}
                  </IconButton>
                </Grid>
                {/* Authentication */}
                <Grid item>
                  {this.renderProfile()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </BaseCard>
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
  toggleAuth,
  toggleNotification,
  toggleSearch,
  toggleCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));