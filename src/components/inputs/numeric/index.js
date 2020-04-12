import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

import { AddRounded, RemoveRounded } from '@material-ui/icons';

import styles from './styles';


class NumericInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  onChange = (e) => {
    let value = e.target.value;
    if (!parseInt(value)) value = 0;
    if (value < 0) value = 0;
    value = Math.floor(value);
    return this.setState({ value }, () => {
      this.props.onChange(this.state.value);
    })
  }

  onAdd = () => {
    let value = this.state.value + 1;
    return this.setState({ value }, () => {
      this.props.onChange(this.state.value);
    });
  }

  onMinus = () => {
    let value = this.state.value - 1;
    if (value < 0) value = 0;
    return this.setState({ value }, () => {
      this.props.onChange(this.state.value);
    });
  }

  render() {
    let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          variant={this.props.variant === 'outlined' ? 'outlined' : 'elevation'}
          className={
            this.props.size === 'large' ?
              classes.largePaper : this.props.size === 'normal' ?
                classes.normalPaper : classes.smallPaper
          }
          elevation={this.props.elevation}
        >
          <Grid container alignItems="center" spacing={2} className={classes.noWrap}>
            <Grid item onClick={this.onMinus}>
              <IconButton size="small">
                <RemoveRounded />
              </IconButton>
            </Grid>
            <Grid item className={classes.fullWidth}>
              <InputBase
                onChange={this.onChange}
                value={this.state.value}
                classes={{ input: classes.input }}
                fullWidth
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
              />
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={this.onAdd}>
                <AddRounded />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  }
}

NumericInput.defaultProps = {
  value: 0,
  onChange: () => { },
  readOnly: false,
  disabled: false,
  size: 'normal',
  variant: 'elevation',
  elevation: 1,
}

NumericInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  variant: PropTypes.oneOf(['outlined', 'elevation']),
  elevation: PropTypes.number,
}

export default withStyles(styles)(NumericInput);