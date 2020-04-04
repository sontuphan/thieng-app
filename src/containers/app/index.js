import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Header from 'containers/header';
import Home from 'containers/home';
import Newsfeed from 'containers/newsfeed';
import Mall from 'containers/mall';
import User from 'containers/user';
import Factory from 'containers/factory';
import Shop from 'containers/shop';
import Footer from 'containers/footer';

import theme from 'static/styles/theme';
import 'static/styles/index.css';

import { setScreen } from 'modules/ui.reducer';

class App extends Component {
  constructor(props) {
    super(props);

    props.setScreen(window.innerWidth);
  }

  componentDidMount() {
    window.onresize = () => {
      this.props.setScreen(window.innerWidth);
    }
  }

  render() {
    return <ThemeProvider theme={theme}>
      <Grid container justify="center" spacing={2}>
        <Header />
        <Grid item xs={12}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Route path="/newsfeed" component={Newsfeed} />
            <Route path="/mall" component={Mall} />
            <Route exact path="/user/:userId/:projectId?" component={User} />
            <Route exact path="/factory/:projectId?" component={Factory} />
            <Route exact path="/my-shop" component={Shop} />
          </Switch>
        </Grid>
        <Grid item xs={12}>
          <Drain large />
        </Grid>
        <Footer />
      </Grid>
    </ThemeProvider>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setScreen,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles({})(App)));
