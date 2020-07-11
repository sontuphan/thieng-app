import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import {
  MenuRounded, NotificationsRounded,
  SearchRounded, PersonRounded
} from '@material-ui/icons';

import styles from './styles';
import { TopDrawer } from 'components/drawers';

import { toogleAuth } from 'modules/auth.reducer';
import { toogleNotification } from 'modules/notification.reducer';
import { toogleSearch } from 'modules/search.reducer';
import { toogleCart } from 'modules/cart.reducer';

const ROUTES = [
  // { text: "Bảng tin", link: '/newsfeed' },
  { text: "Siêu thị", link: '/mall' },
  // { text: "Đối tác", link: '/partner' },
  { text: "Liên hệ", link: '/home#contact' },
]


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleDrawer: false,
    }
  }

  onToggleDrawer = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleDrawer: visible });
    return this.setState({ visibleDrawer: !this.state.visibleDrawer });
  }

  onSearch = () => {
    this.onToggleDrawer(false);
    this.props.toogleSearch();
  }

  onNotification = () => {
    this.onToggleDrawer(false);
    // this.props.toogleNotification();
    this.props.toogleCart();
  }

  onUser = () => {
    let { auth } = this.props;
    this.onToggleDrawer(false);
    if (!auth.email) return console.error('Not signed in yet.');
    return this.props.history.push('/user/' + auth.email + '/store');
  }

  renderProfile = () => {
    const { classes } = this.props;
    const { auth, ui, toogleAuth } = this.props;

    if (!auth.isValid) {
      return <Button variant="contained" color="primary" startIcon={<PersonRounded />} onClick={toogleAuth} >
        <Typography noWrap>Đăng nhập</Typography>
      </Button >
    }
    else if (ui.width >= 960) {
      return <Tooltip title={auth.displayname}>
        <Avatar alt={auth.avatar} src={auth.avatar} className={classes.avatar} onClick={this.onUser} />
      </Tooltip>
    }
    else {
      return <Grid container alignItems="center" className={classes.noWrap} onClick={this.onUser} spacing={2}>
        <Grid item className={classes.stretch} >
          <Typography noWrap>{auth.displayname}</Typography>
        </Grid>
        <Grid item>
          <Avatar alt={auth.avatar} src={auth.avatar} className={classes.avatar} />
        </Grid>
      </Grid>
    }
  }

  renderRoute = () => {
    const { classes } = this.props;
    const { visibleDrawer } = this.state;
    if (this.props.ui.width >= 960) {
      return <Grid container alignItems="center" className={classes.noWrap} spacing={4}>
        {ROUTES.map((route, i) => <Grid item key={i}>
          <Link color="textPrimary" underline="none" component={RouterLink} to={route.link}>
            <Typography noWrap><span className="link">{route.text}</span></Typography>
          </Link>
        </Grid>)}
        < Grid item >
          {this.renderProfile()}
        </Grid >
      </Grid >
    }
    else {
      return <Grid container spacing={2}>
        <Grid item>
          <IconButton size="small" color="secondary" onClick={this.onToggleDrawer}>
            <MenuRounded />
          </IconButton>
          <TopDrawer visible={visibleDrawer} onClose={this.onToggleDrawer} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <List>
                  {ROUTES.map((route, i) => <ListItem
                    key={i}
                    button
                    component={RouterLink}
                    to={route.link}
                    onClick={this.onToggleDrawer}
                  >
                    <ListItemText primary={route.text} />
                  </ListItem>)}
                </List>
                <Divider />
                <List>
                  <ListItem>
                    <Grid container justify="flex-end" spacing={2}>
                      <Grid item>
                        {this.renderProfile()}
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </TopDrawer>
        </Grid>
      </Grid>
    }
  }

  render() {
    const { classes } = this.props;
    const { cart: { data } } = this.props;
    return <Grid container className={classes.noWrap} spacing={2}>
      {/* Logo */}
      <Grid item className={classes.logo}>
        <Link color="textPrimary" underline="none" component={RouterLink} to={'/home'}>
          <Typography variant="h3">Thiêng Việt</Typography>
        </Link>
      </Grid>
      {/* Menu */}
      <Grid item className={classes.stretch}>
        <Grid container alignItems="center" justify="flex-end" spacing={4}>
          {/* Search app */}
          <Grid item>
            <IconButton size="small" color="secondary" onClick={this.onSearch}>
              <SearchRounded />
            </IconButton>
          </Grid>
          {/* Notification app */}
          <Grid item>
            <IconButton size="small" color="secondary" onClick={this.onNotification}>
              <Badge badgeContent={data.length} color="primary">
                <NotificationsRounded />
              </Badge>
            </IconButton>
          </Grid>
          {/* Routers & Authentication*/}
          <Grid item>
            {this.renderRoute()}
          </Grid>
        </Grid>
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
  toogleAuth,
  toogleNotification,
  toogleSearch,
  toogleCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));