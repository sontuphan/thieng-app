import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { FiberManualRecord } from '@material-ui/icons';

import styles from './styles';

class ColorSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: props.colors[0]
    }
  }

  onSelect = (color) => {
    this.setState({ color }, () => {
      this.props.onChange(color);
    });
  }

  render() {
    let { classes } = this.props;
    return <Grid container spacing={1} direction="row" alignItems="center">
      {this.props.colors.map(color => <Grid item key={color}>
        <IconButton size="small" onClick={() => { this.onSelect(color) }}>
          <FiberManualRecord className={classes.effect} style={{ color }} fontSize={color === this.state.color ? "large" : "default"} />
        </IconButton>
      </Grid>)}
    </Grid>
  }
}

ColorSelect.propTypes = {
  colors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(ColorSelect);