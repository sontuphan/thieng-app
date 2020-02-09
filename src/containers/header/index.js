import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';

import { Menu, Person, Close, Search, LocalGroceryStore } from '@material-ui/icons';

import styles from './styles';

import utils from 'helpers/utils';
import { search } from 'modules/search.reducer';
import { logIn, logOut } from 'modules/auth.reducer';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: props.ui.width >= 960,
      user: {},
      routes: [
        { text: "Bảng tin", link: '/newsfeed' },
        { text: "Siêu thị", link: '/mall' },
        // { text: "Đối tác", link: '/partner' },
        { text: "Liên hệ", link: '/home#contact' },
      ],
      search: null,
      grocery: 3,
      visibleDrawer: false,
      visibleLogInModal: false,
      errorLogInModal: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth)) {
      this.setState({ user: this.props.auth });
    }
    if (JSON.stringify(prevProps.ui) !== JSON.stringify(this.props.ui)) {
      this.setState({ matches: this.props.ui.width >= 960 })
    }
  }

  logIn = (service) => {
    this.props.logIn(service).then(re => {
      this.setState({ errorLogInModal: null })
      this.onToggleLogInModal();
    }).catch(er => {
      this.setState({ errorLogInModal: er })
    });
  }

  input = (e) => {
    let search = e.target.value;
    this.setState({ search });
  }

  search = () => {
    this.props.search(this.state.search).then(re => {
      this.setState({ visibleDrawer: false });
    }).catch(er => {
      console.error(er);
    });
  }

  onToggleDrawer = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleDrawer: visible });
    return this.setState({ visibleDrawer: !this.state.visibleDrawer });
  }


  onToggleLogInModal = (visible) => {
    if (typeof visible === 'boolean') return this.setState({ visibleLogInModal: visible });
    this.setState({ visibleLogInModal: !this.state.visibleLogInModal });
  }

  renderSearch = () => {
    let { classes } = this.props;
    return <TextField
      color="secondary"
      placeholder="Search"
      onChange={this.input}
      InputProps={{
        classes: { input: classes.font },
        endAdornment: (
          <InputAdornment position="start" className={classes.adornment}>
            <IconButton size="small" onClick={this.search}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onKeyPress={e => e.key === 'Enter' ? this.search() : null}
      fullWidth={!this.state.matches} />
  }

  renderProfile = () => {
    let { user } = this.state;
    if (user.isLoggedIn)
      return <ButtonGroup>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Badge badgeContent={this.state.grocery} color="primary">
            <LocalGroceryStore fontSize="small" />
          </Badge>}
          component={RouterLink}
          to="/grocery"
          onClick={() => this.onToggleDrawer(false)}>
          <Typography>Giỏ hàng</Typography>
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Person />}
          component={RouterLink}
          to="/user/remy-sharp"
          onClick={() => this.onToggleDrawer(false)}>
          <Typography>{user.displayname}</Typography>
        </Button >
        <Button
          variant="outlined"
          size="small"
          onClick={() => this.props.logOut(user.service)}>
          <Typography>Đăng xuất</Typography>
        </Button>
      </ButtonGroup >
    else
      return <Button
        variant="outlined"
        size="small"
        onClick={this.onToggleLogInModal}>
        <Typography>Đăng nhập</Typography>
      </Button >
  }

  renderDrawer = () => {
    let { classes } = this.props;
    return <Drawer anchor="top" open={this.state.visibleDrawer} onClose={this.onToggleDrawer}>
      <List className={classes.drawer}>
        <ListItem>
          <ListItemText primary={utils.greet()} />
          <ListItemSecondaryAction>
            <IconButton color="secondary" size="small" onClick={this.onToggleDrawer}>
              <Close />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem button component={RouterLink} to="/home" onClick={this.onToggleDrawer} >
          <ListItemText primary={<Typography variant="h3">Thiêng</Typography>} />
        </ListItem>
        {
          this.state.routes.map((route, index) => <ListItem
            key={index}
            button
            component={RouterLink}
            to={route.link}
            onClick={this.onToggleDrawer} >
            <ListItemText primary={route.text} />
          </ListItem>)
        }
        <Divider />
        <ListItem>
          {this.renderSearch()}
        </ListItem>
        <ListItem>
          {this.renderProfile()}
        </ListItem>
      </List>
    </Drawer>
  }

  renderRoute = () => {
    let { classes } = this.props;
    if (this.state.matches)
      return <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
        <Grid item className={classes.route}>
          {this.renderSearch()}
        </Grid>
        {
          this.state.routes.map((route, index) =>
            <Grid item key={index} className={classes.route}>
              <Link color="textPrimary" underline="none" component={RouterLink} to={route.link}>
                <Typography >
                  <span className="link">{route.text}</span>
                </Typography>
              </Link>
            </Grid>
          )
        }
        <Grid item className={classes.route}>
          {this.renderProfile()}
        </Grid>
      </Grid>
    else
      return <Grid container direction="row" justify="flex-end" alignItems="center">
        <IconButton color="secondary" onClick={this.onToggleDrawer}>
          <Badge badgeContent={this.state.grocery} color="primary">
            <Menu />
          </Badge>
        </IconButton>
      </Grid>
  }

  renderLogInModal = () => {
    return <Dialog
      open={this.state.visibleLogInModal}
      onClose={this.onToggleLogInModal}
      fullScreen={!this.state.matches}
    >
      <DialogTitle>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h3">Đăng nhập</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <IconButton color="secondary" size="small" onClick={this.onToggleLogInModal}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>You can easily log in to the website with your favourite service and skip the inconvenience of registration.</Typography>
          </Grid>
          <Grid item xs={12}>
            {this.state.errorLogInModal ? <Typography color="primary">{this.state.errorLogInModal} Please try again!</Typography> : null}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<i className="fab fa-google" />}
              onClick={() => this.logIn('google')}
              fullWidth>
              <Typography>Log in with Google</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<i className="fab fa-facebook-f" />}
              onClick={() => this.logIn('facebook')}
              fullWidth>
              <Typography>Log in with Facebook</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<i className="fab fa-apple" />}
              onClick={() => this.logIn('apple')}
              fullWidth>
              <Typography>Log in with Apple</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.onToggleLogInModal} color="primary">
          <Typography>Bạn cần sự giúp đỡ ?</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  }

  render() {
    let { classes } = this.props;

    return <Fragment>
      <Grid item xs={10}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item className={classes.logo}>
            <Link color="textPrimary" underline="none" component={RouterLink} to={'/home'}>
              <Typography variant="h3">Thiêng</Typography>
            </Link>
          </Grid>
          <Grid item>
            {this.renderRoute()}
          </Grid>
        </Grid>
      </Grid>
      {this.renderDrawer()}
      {this.renderLogInModal()}
    </Fragment>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  logIn, logOut,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));