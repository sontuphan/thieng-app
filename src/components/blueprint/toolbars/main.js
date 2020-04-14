import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ToggleIcon from 'material-ui-toggle-icon';

import {
  DeleteForeverRounded,
  UndoRounded, RedoRounded,
  VisibilityRounded, VisibilityOffRounded
} from '@material-ui/icons';

import styles from './styles';

class MainBar extends Component {

  render() {
    let { classes } = this.props;
    return <Paper className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item>
          <IconButton onClick={this.props.onDelete} size="small">
            <DeleteForeverRounded fontSize="small" />
          </IconButton>
        </Grid>

        <Grid item>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item>
          <IconButton onClick={this.props.onUndo} size="small">
            <UndoRounded fontSize="small" />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton onClick={this.props.onRedo} size="small">
            <RedoRounded fontSize="small" />
          </IconButton>
        </Grid>

        <Grid item>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item>
          <IconButton onClick={this.props.onPreview} size="small">
            <ToggleIcon
              className={classes.toggleIcon}
              on={this.props.previewing}
              onIcon={<VisibilityRounded fontSize="small" />}
              offIcon={<VisibilityOffRounded fontSize="small" />}
            />
          </IconButton>
        </Grid>

      </Grid>
    </Paper>
  }
}

MainBar.defaultProps = {
  onDelete: () => { },
  onUndo: () => { },
  onRedo: () => { },
  onPreview: () => { },
}

MainBar.propTypes = {
  onDelete: PropTypes.func,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
  previewing: PropTypes.bool.isRequired,
  onPreview: PropTypes.func,
}

export default withStyles(styles)(MainBar);