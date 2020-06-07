import React, { Component, Fragment } from 'react';
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
  SearchRounded, PersonRounded, ShoppingBasketRounded
} from '@material-ui/icons';

import styles from './styles';
import LogIn from './login';
import { TopDrawer } from 'components/drawers';

import { refreshSession, logIn } from 'modules/auth.reducer';
import { toogleNotification } from 'modules/notification.reducer';
import { toogleSearch } from 'modules/search.reducer';
import { toogleCart } from 'modules/cart.reducer';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        // { text: "Bảng tin", link: '/newsfeed' },
        { text: "Siêu thị", link: '/mall' },
        // { text: "Đối tác", link: '/partner' },
        { text: "Liên hệ", link: '/home#contact' },
      ],
      visibleDrawer: false,
      visibleLogInModal: false,
    }
  }

  componentDidMount() {
    this.props.refreshSession();
  }

  onToggleDrawer = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleDrawer: visible });
    return this.setState({ visibleDrawer: !this.state.visibleDrawer });
  }

  onToggleLogInModal = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleLogInModal: visible });
    return this.setState({ visibleLogInModal: !this.state.visibleLogInModal });
  }

  syncAuth = (er, re) => {
    if (er) return console.error(er);
    return this.props.logIn(re);
  }

  // onSearch = () => {
  //   this.onToggleDrawer(false);
  //   this.props.toogleSearch();
  // }

  // onNotification = () => {
  //   this.onToggleDrawer(false);
  //   this.props.toogleNotification();
  // }

  onCart = () => {
    this.onToggleDrawer(false);
    this.props.toogleCart();
  }

  onUser = () => {
    let { auth } = this.props;
    this.onToggleDrawer(false);
    if (!auth.email) return console.error('Not signed in yet.');
    return this.props.history.push('/user/' + auth.email + '/store');
  }

  renderProfile = () => {
    const { classes, auth, ui } = this.props;
    if (!auth.isValid) {
      return <Button variant="contained" color="primary" startIcon={<PersonRounded />} onClick={this.onToggleLogInModal} >
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
    const { routes, visibleDrawer } = this.state;
    if (this.props.ui.width >= 960) {
      return <Grid container alignItems="center" className={classes.noWrap} spacing={4}>
        {routes.map(route => <Grid item key={route.link}>
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
                  {routes.map(route => <ListItem
                    key={route.link}
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
    return <Fragment>
      <Grid container className={classes.noWrap} spacing={2}>
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
            {/* <Grid item>
                <IconButton size="small" color="secondary" onClick={this.onSearch}>
                  <SearchRounded />
                </IconButton>
              </Grid> */}
            {/* Notification app */}
            {/* <Grid item>
                <IconButton size="small" color="secondary" onClick={this.onNotification}>
                  <Badge badgeContent={3} color="primary">
                    <NotificationsRounded />
                  </Badge>
                </IconButton>
              </Grid> */}
            {/* Grocery app */}
            <Grid item>
              <IconButton size="small" color="secondary" onClick={this.onCart}>
                <Badge badgeContent={3} color="primary">
                  <ShoppingBasketRounded />
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
      <LogIn
        visible={this.state.visibleLogInModal}
        onToggle={this.onToggleLogInModal}
        callback={this.syncAuth}
      />
    </Fragment>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshSession, logIn,
  toogleNotification, toogleSearch,
  toogleCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));