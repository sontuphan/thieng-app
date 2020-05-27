import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { FiberManualRecord } from '@material-ui/icons';

import styles from './styles';

class ColorSelect extends Component {
  constructor() {
    super();

    this.state = {
      color: null
    }
  }

  onSelect = (color) => {
    this.setState({ color }, () => {
      this.props.onChange(color);
    });
  }

  render() {
    let { classes } = this.props;
    return <Grid container justify="flex-end" alignItems="center" spacing={1}>
      {
        this.props.colors.map(color => <Grid item key={color}>
          <IconButton size="small" onClick={() => { this.onSelect(color) }}>
            <FiberManualRecord
              className={classes.effect}
              style={{ color }}
              fontSize={color === this.props.value ? "large" : "small"} />
          </IconButton>
        </Grid>)
      }
    </Grid>
  }
}

ColorSelect.propTypes = {
  colors: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(ColorSelect);