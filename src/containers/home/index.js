import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Welcome from './welcome';

import styles from './styles';
import objectGLB from 'static/images/bamboo.glb';
import objectUSDZ from 'static/images/bamboo.usdz';


class Home extends Component {

  render() {
    const { classes } = this.props;

    return <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={6}>
        <Welcome />
      </Grid>
      <Grid item xs={12} md={6}>
        <model-viewer
          src={objectGLB}
          ios-src={objectUSDZ}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          quick-look-browsers="safari chrome"
          camera-controls
          auto-rotate
          alt="A 3D model of an astronaut"
          shadow-intensity={1}
          shadow-softness={1.25}
          class={classes.arViewer}
        ></model-viewer>
      </Grid>
      <Grid item xs={12}>
        <Drain large />
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