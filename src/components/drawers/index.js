import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './styles';
import utils from 'helpers/utils';

class BottomDrawer extends Component {

  renderSwipArea = () => {
    let { classes } = this.props;
    let isMobile = utils.checkDevice();
    if (isMobile) {
      return <Grid container spacing={2} justify="center">
        <Grid item>
          <div className={classes.touchBarSign} />
        </Grid>
      </Grid>
    }
    else {
      return <Grid container spacing={2} justify="center">
        <Grid item onClick={this.props.onClose}>
          <Tooltip title="Click to close">
            <div className={classes.touchBarSign} />
          </Tooltip>
        </Grid>
      </Grid>
    }
  }

  render() {
    let { classes } = this.props;
    return <SwipeableDrawer
      anchor="bottom"
      open={this.props.visible}
      onOpen={this.props.onOpen}
      onClose={this.props.onClose}
      classes={{ paper: classes.paper }}
    >
      <Grid container spacing={2} className={classes.paperContent}>
        <Grid item xs={12}>
          {this.renderSwipArea()}
        </Grid>
        <Grid item xs={12} className={classes.paperBody}>
          {this.props.children}
        </Grid>
      </Grid>
    </SwipeableDrawer >
  }
}

BottomDrawer.propsTypes = {
  visible: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
}

BottomDrawer.defaultProps = {
  onOpen: () => { console.log('onOpen') },
  onClose: () => { console.log('onClose') },
}

export default withStyles(styles)(BottomDrawer);