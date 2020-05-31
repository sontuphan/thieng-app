import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { FiberManualRecord } from '@material-ui/icons';

import { useStyles } from './styles';

function ColorSelector(props) {
  const classes = useStyles();
  return <Grid container justify="flex-end" alignItems="center" spacing={1}>
    {props.colors.map((color, index) => <Grid item key={index}>
      <IconButton size="small" onClick={() => { props.onChange(color) }}>
        <FiberManualRecord
          className={classes.transition}
          style={{ color }}
          fontSize={color === props.value ? 'large' : 'small'} />
      </IconButton>
    </Grid>)}
  </Grid>
}

ColorSelector.defaultProps = {
  colors: [],
  value: '',
  onChange: () => { },
}

ColorSelector.propTypes = {
  colors: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default ColorSelector;