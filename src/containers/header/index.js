import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

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
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';


import { Menu, Person, Close, Search, LocalGroceryStore } from '@material-ui/icons';

import styles from './styles';

import { search } from 'modules/search.reducer';
import { logIn, logOut } from 'modules/auth.reducer';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: props.ui.width >= 960,
      user: {},
      visible: false,
      routes: [
        { text: "Bảng tin", link: '/newsfeed' },
        { text: "Siêu thị", link: '/mall' },
        // { text: "Đối tác", link: '/partner' },
        { text: "Liên hệ", link: '/contact' },
      ],
      search: null,
      grocery: 3
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

  redirect = (to) => {
    this.props.history.push(to);
    this.close();
  }

  open = () => {
    this.setState({ visible: true });
  }

  close = () => {
    this.setState({ visible: false });
  }

  input = (e) => {
    let search = e.target.value;
    this.setState({ search });
  }

  search = () => {
    this.props.search(this.state.search).then(re => {
      this.setState({ visible: false });
    }).catch(er => {
      console.error(er);
    });
  }

  renderProfile() {
    if (this.state.user.isLoggedIn)
      return <ButtonGroup>
        <Button variant="outlined" size="small"
          startIcon={<Badge badgeContent={this.state.grocery} color="primary">
            <LocalGroceryStore fontSize="small" />
          </Badge>}>
          <Typography>Giỏ hàng</Typography>
        </Button>
        <Button variant="outlined" size="small" startIcon={<Person />}
          onClick={() => this.redirect('/user/remy-sharp')}>
          <Typography>Cá nhân</Typography>
        </Button>
        <Button variant="outlined" size="small" onClick={this.props.logOut}>
          <Typography>Đăng xuất</Typography>
        </Button>
      </ButtonGroup>
    else
      return <Button variant="outlined" size="small" onClick={this.props.logIn}>
        <Typography>Đăng nhập</Typography>
      </Button>
  }

  renderDrawer = () => {
    let { classes } = this.props;
    return <Drawer anchor="top" open={this.state.visible} onClose={this.close}>
      <List className={classes.drawer}>
        <ListItem>
          <ListItemText primary={'Good morning!'} />
          <ListItemSecondaryAction>
            <IconButton color="secondary" size="small" onClick={this.close}>
              <Close />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem button onClick={() => this.redirect('/home')}>
          <ListItemText primary={<Typography variant="h3">Thiêng</Typography>} />
        </ListItem>
        {
          this.state.routes.map((route, index) =>
            <ListItem key={index} button onClick={() => this.redirect(route.link)}>
              <ListItemText primary={route.text} />
            </ListItem>
          )
        }
        <Divider />
        <ListItem>
          <TextField color="secondary" placeholder="Search" onChange={this.input} fullWidth
            onKeyPress={e => e.key === 'Enter' ? this.search() : null} />
          <IconButton size="small" onClick={this.search}><Search /></IconButton>
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
          <TextField color="secondary" placeholder="Search" onChange={this.input}
            onKeyPress={e => e.key === 'Enter' ? this.search() : null} />
          <IconButton size="small" onClick={this.search}><Search /></IconButton>
        </Grid>
        {
          this.state.routes.map((route, index) =>
            <Grid item key={index} className={classes.route}>
              <Typography onClick={() => this.redirect(route.link)}>
                <span className="link">{route.text}</span>
              </Typography>
            </Grid>
          )
        }
        <Grid item className={classes.route}>
          {this.renderProfile()}
        </Grid>
      </Grid>
    else
      return <Grid container direction="row" justify="flex-end" alignItems="center">
        <IconButton color="secondary" onClick={this.open}>
          <Badge badgeContent={this.state.grocery} color="primary">
            <Menu />
          </Badge>
        </IconButton>
      </Grid>
  }

  render() {
    let { classes } = this.props;

    return <Fragment>
      <Grid item xs={10}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item className={classes.logo} onClick={() => this.redirect('/home')}>
            <Typography variant="h3">Thiêng</Typography>
          </Grid>
          <Grid item>
            {this.renderRoute()}
          </Grid>
        </Grid>
      </Grid>
      {this.renderDrawer()}
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