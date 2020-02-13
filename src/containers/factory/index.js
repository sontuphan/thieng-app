import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {  } from '@material-ui/icons';

import styles from './styles';

class Factory extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    // let { classes } = this.props;

    return <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      <Typography>Factory</Typography>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Factory)));