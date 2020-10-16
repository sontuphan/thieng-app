import React, { Component, Fragment } from 'react';
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
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TweenOne from 'rc-tween-one';
import Image from 'material-ui-image';

import {
  NotificationsRounded, SearchRounded, AccountCircleRounded,
  PersonRounded, StorefrontRounded, ExitToAppRounded,
} from '@material-ui/icons';

import { BaseCard } from 'components/cards';

import LOGO from 'static/images/favicon.png';
import styles from './styles';
import { toggleAuth, logOut } from 'modules/auth.reducer';
import { toggleNotification } from 'modules/notification.reducer';
import { toggleSearch } from 'modules/search.reducer';
import { toggleCart } from 'modules/cart.reducer';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      blink: false,
      anchorEl: null,
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

  onSearch = () => {
    return this.props.toggleSearch();
  }

  onNotification = () => {
    const { auth, toggleCart, toggleAuth } = this.props;
    if (!auth.isValid) return toggleAuth();
    // this.props.toggleNotification();
    return toggleCart();
  }

  onOpenUser = (e) => {
    return this.setState({ anchorEl: e.currentTarget });
  }

  onCloseUser = () => {
    return this.setState({ anchorEl: null });
  }

  logout = () => {
    this.props.logOut();
    this.onCloseUser();
    return this.props.history.push('/home');
  }

  renderProfile = () => {
    const { classes } = this.props;
    const { auth, toggleAuth } = this.props;
    const { anchorEl } = this.state;

    if (!auth.isValid) return <Tooltip title={'Đăng ký / Đăng nhập'}>
      <IconButton size="small" color="secondary" onClick={toggleAuth}>
        <AccountCircleRounded />
      </IconButton>
    </Tooltip >
    return <Fragment>
      <Tooltip title={auth.displayname}>
        <Avatar alt={auth.avatar} src={auth.avatar} className={classes.avatar} onClick={this.onOpenUser} />
      </Tooltip>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.onCloseUser}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <List>
          <ListItem button component={RouterLink} to={'/user/' + auth._id + '/store'}>
            <ListItemIcon>
              <PersonRounded color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Trang cá nhân" />
          </ListItem>
          <ListItem button component={RouterLink} to={'/user/' + auth._id + '/store'}>
            <ListItemIcon>
              <StorefrontRounded color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Trang bán hàng" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.logout}>
            <ListItemIcon>
              <ExitToAppRounded color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItem>
        </List>
      </Popover>
    </Fragment>
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
  toggleAuth, logOut,
  toggleNotification,
  toggleSearch,
  toggleCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));