import React, { } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import { DeleteRounded } from '@material-ui/icons';

import { useStyles } from './styles';
import { DEFAULT_DRAIN } from '../../tree/constants';


const DrainBar = (props) => {
  const classes = useStyles();

  const onHeight = (e) => {
    const height = parseInt(e.target.value);
    if (!height) return;
    if (height) return props.onChange({ height });
  }

  return <Paper className={classes.paper} elevation={8}>
    <Grid container spacing={1}>
      <Grid item>
        <IconButton size="small" onClick={props.onDelete}>
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
          defaultValue={props.value.height}
          onChange={onHeight}
        />
      </Grid>
    </Grid>
  </Paper>
}

DrainBar.defaultProps = {
  value: DEFAULT_DRAIN,
  onChange: () => { },
  onDelete: () => { },
}

DrainBar.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
}

export default DrainBar;