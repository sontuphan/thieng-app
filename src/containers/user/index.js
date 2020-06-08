import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Parallax } from 'rc-scroll-anim';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import { CloudUploadRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import Profile from './profile';
import Menu from './menu';
import UserHome from './home';
import UserStore from './store';
import UserSettings from './settings';

import styles from './styles';


class User extends Component {

  render() {
    const { classes, auth } = this.props;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12} className={classes.header}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <IconButton>
              <CloudUploadRounded />
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
                  backgroundImage: `url('https://source.unsplash.com/featured/?interior')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }} />
            </Parallax>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={10}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {auth._id ? <Profile userId={auth._id} /> : null}
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={12}>
              <Menu />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={11} md={10}>
        <Switch>
          {/* <Route exact path="/user/:email/home" component={UserHome} /> */}
          <Route exact path="/user/:email/store" component={UserStore} />
          {/* <Route exact path="/user/:email/message" component={null} /> */}
          {/* <Route exact path="/user/:email/settings" component={UserSettings} /> */}
        </Switch>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User)));