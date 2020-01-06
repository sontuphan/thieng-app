import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

class Divider extends Component {
  render() {
    let { classes } = this.props;
    return <Grid container direction="column" justify="flex-end" className={classes.row}>
      <Grid item className={classes.divider} />
    </Grid>
  }
}

export default withStyles(styles)(Divider);