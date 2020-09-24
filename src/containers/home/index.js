import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Welcome from './welcome';
import Mall from './mall';
import Contact from './contact';

import styles from './styles';


class Home extends Component {

  render() {
    return <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={11} md={10}>
        <Welcome />
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={11} md={10}>
        <Mall />
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={11} md={10}>
        <Contact />
      </Grid>
    </Grid >
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home)));