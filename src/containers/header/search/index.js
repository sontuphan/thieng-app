import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { Search } from '@material-ui/icons';

import styles from './styles';

class SearchToolbar extends Component {
  constructor() {
    super();

    this.state = {
      data: null
    }
  }

  input = (e) => {
    let data = e.target.value;
    this.setState({ data });
  }

  render() {
    let { classes } = this.props;
    let { fullWidth, onChange } = this.props;

    return <TextField
      color="secondary"
      placeholder="Search"
      onChange={this.input}
      InputProps={{
        classes: { input: classes.font },
        endAdornment: (
          <InputAdornment position="start" className={classes.adornment}>
            <IconButton size="small" onClick={() => onChange(this.state.data)}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onKeyPress={e => e.key === 'Enter' ? onChange(this.state.data) : null}
      fullWidth={fullWidth} />
  }
}

export default withStyles(styles)(SearchToolbar);