import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Static component
import PrivateRoute from 'containers/auth/privateRoute';
import Drain from 'components/drain';
import Header from 'containers/header';
import Footer from 'containers/footer';
import UiUx from 'containers/uiux';
// Pages
import Home from 'containers/home';
// import Newsfeed from 'containers/newsfeed';
import Mall from 'containers/mall';
import Item from 'containers/item';
import User from 'containers/user';
import Guest from 'containers/guest';
import CallbackAuth from 'containers/auth/callback';
import NotFound from 'containers/404';
// Apllications
import Authentication from 'containers/auth';
import Search from 'containers/search';
import Cart from 'containers/cart';
import Notification from 'containers/notification';
import Editor from 'containers/editor';

// CSS
import theme from 'static/styles/theme';
import 'static/styles/index.css';
import styles from './styles';


class App extends Component {

  render() {
    const { classes } = this.props;

    return <ThemeProvider theme={theme}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} className={classes.safe} /> {/* Safe space */}
        <Grid item xs={11} md={10}>
          <Header />
        </Grid>
        <Grid item xs={12} className={classes.safe} >
          <UiUx />
        </Grid>
        <Grid item xs={12}>

          {/* Pages */}
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            {/* <Redirect exact path="/newsfeed" to="/newsfeed/for-me" /> */}
            {/* <Route exact path="/newsfeed/:page" component={Newsfeed} /> */}
            <Redirect exact from="/mall" to="/mall/all" />
            <Route exact path="/mall/:category" component={Mall} />
            <Redirect exact from="/item" to="/mall" />
            <PrivateRoute exact path="/item/:id" component={Item} />
            <Redirect exact from="/user/:userId" to="/user/:userId/store" />
            <PrivateRoute exact path="/user/:userId/:page" component={User} />
            <Redirect exact from="/guest/:userId" to="/guest/:userId/store" />
            <Route exact path="/guest/:userId/:page" component={Guest} />
            <Route exact path="/auth" component={CallbackAuth} />
            <Route exact path='*' component={NotFound} />
          </Switch>

          {/* Global app */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Authentication />
            </Grid>
            <Grid item xs={12}>
              <Search />
            </Grid>
            <Grid item xs={12}>
              <Cart />
            </Grid>
            <Grid item xs={12}>
              <Notification />
            </Grid>
            <Grid item xs={12}>
              <Editor />
            </Grid>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
        <Grid item xs={10}>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App)));
