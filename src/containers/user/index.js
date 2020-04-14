import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Parallax } from 'rc-scroll-anim';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import { SettingsApplicationsRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import Menu from './menu';
import UserHome from './home';

import { getUserByCode } from 'modules/user.reducer';

import styles from './styles';
import utils from 'helpers/utils';
import PANEL from 'static/images/designer-2.jpg';

class User extends Component {
  constructor() {
    super();

    this.state = {
      likes: 12853,
      products: 32,
    }
  }

  render() {
    let { classes } = this.props;

    return <Grid container justify="center" spacing={2}>

      <Grid item xs={12} className={classes.header}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <IconButton>
              <SettingsApplicationsRounded />
            </IconButton>
          </Grid>
        </Grid>
        <div className={classes.panel}>
          <div className={classes.frame}>
            <Parallax
              animation={{ scale: 1.5, playScale: [1, 2] }}
              style={{ transform: 'scale(1)' }}
            >
              <div className={classes.image}
                style={{
                  backgroundImage: `url('${PANEL}')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }} />
            </Parallax>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={10} className={classes.body}>
        <Grid container spacing={4}>

          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2} className={classes.subheader}>
              <Grid item xs={12} sm={6}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      alt={this.props.auth.displayname}
                      src={this.props.auth.avatar}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{this.props.auth.displayname}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container justify="flex-end" alignItems="center" spacing={2}>
                  <Grid item>
                    <Typography>{utils.prettyNumber(this.state.likes, 'long')} Thích - {utils.prettyNumber(this.state.products, 'long')} Sản phẩm</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justify="center" className={classes.subheader}>
              <Grid item xs={12}>
                <Menu />
              </Grid>
              <Grid item xs={12}>
                <Drain small />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Drain small />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Switch>
              <Route exact path="/user/:userId/home" component={UserHome} />
            </Switch>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserByCode,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User)));