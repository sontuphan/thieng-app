import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

import Blueprint from 'helpers/blueprint';

class Footer extends Component {
  constructor(){
    super();

    let blueprint = new Blueprint();
    blueprint.debug()
  }
  render() {
    let { classes } = this.props;

    return <Fragment>
      <Grid item xs={10} className={classes.row}>
        <Grid container direction="row" alignItems="center" className={classes.maxHeight} spacing={2}>
          <Grid item xs={12} className={classes.row}>
            <Typography>Copyright © 2020 Thiêng Việt</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Footer)));