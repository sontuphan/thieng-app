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
import Mall from 'containers/mall';
import User from 'containers/user';
import Footer from 'containers/footer';

import theme from './theme';
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
      <Grid container direction="row" justify="center" spacing={2}>
        <Header />
        <Grid item xs={12}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Route path="/mall" component={Mall} />
            <Route exact path="/user/:id" component={User} />

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
