import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import { HighlightOffRounded, SearchRounded } from '@material-ui/icons';

import styles from './styles';

class SearchField extends Component {
  constructor() {
    super();

    this.state = {
      data: ''
    }
  }

  input = (e) => {
    let data = e.target.value;
    return this.setState({ data });
  }

  clear = () => {
    return this.setState({ data: '' }, () => {
      return this.props.onClear();
    });
  }

  renderContained = () => {
    const { classes } = this.props;
    const { placeholder, onSearch, fullWidth } = this.props;
    return (
      <Paper elevation={0} className={classes.contained}>
        <Grid container spacing={1} className={classes.noWrap}>
          <Grid item>
            <IconButton size="small" onClick={this.clear} disabled={!this.state.data}>
              <HighlightOffRounded />
            </IconButton>
          </Grid>
          <Grid item className={classes.startDivider}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item className={classes.stretch}>
            <InputBase
              placeholder={placeholder}
              onChange={this.input}
              value={this.state.data}
              fullWidth={fullWidth}
            />
          </Grid>
          <Grid item className={classes.endDivider}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={() => onSearch(this.state.data)}>
              <SearchRounded />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  renderOutlined = () => {
    const { classes } = this.props;
    const { placeholder, onSearch, fullWidth } = this.props;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          color="secondary"
          placeholder={placeholder}
          size="small"
          onChange={this.input}
          value={this.state.data}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.startAdornment}>
                <IconButton size="small" onClick={this.clear} disabled={!this.state.data}>
                  <HighlightOffRounded />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start" className={classes.endAdornment}>
                <IconButton size="small" onClick={() => onSearch(this.state.data)}>
                  <SearchRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyPress={e => e.key === 'Enter' ? onSearch(this.state.data) : null}
          fullWidth={fullWidth}
        />
      </Grid>
    </Grid>
  }

  render() {
    const { variant } = this.props;
    if (variant === 'contained') return this.renderContained();
    return this.renderOutlined();
  }
}

SearchField.defaultProps = {
  variant: 'outlined',
  onSearch: () => { },
  onClear: () => { },
  placeholder: '',
  fullWidth: false,
}

SearchField.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'contained']),
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
}

export default withStyles(styles)(SearchField);