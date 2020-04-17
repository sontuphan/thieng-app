import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import { DeleteRounded } from '@material-ui/icons';

import styles from './styles';
import { DEFAULT_DRAIN } from '../tree/constants';

const DEFAULT_DATA = {
  height: DEFAULT_DRAIN.height,
}


class DrainBar extends Component {
  constructor() {
    super();

    this.state = {
      ...DEFAULT_DATA,
    }
  }

  componentDidMount() {
    this.setState(this.props.defaultData);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.defaultData) !== JSON.stringify(this.props.defaultData)) {
      this.setState(this.props.defaultData);
    }
  }

  onHeight = (e) => {
    let height = 0;
    if (parseInt(e.target.value))
      height = parseInt(e.target.value);
    return this.setState({ height }, () => {
      this.props.onChange(this.state);
    });
  }

  render() {
    let { classes } = this.props;
    return <Paper className={classes.paper} elevation={8}>
      <Grid container spacing={1}>
        <Grid item>
          <IconButton size="small" onClick={this.props.onDelete}>
            <DeleteRounded fontSize="small" />
          </IconButton>
        </Grid>

        <Grid item>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item>
          <TextField
            color="secondary"
            size="small"
            value={this.state.height}
            onChange={this.onHeight}
            InputProps={{
              classes: {
                input: classes.font,
              }
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  }
}

DrainBar.defaultProps = {
  defaultData: { ...DEFAULT_DATA },
  onChange: () => { },
  onDelete: () => { },
}

DrainBar.propTypes = {
  defaultData: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
}

export default withStyles(styles)(DrainBar);