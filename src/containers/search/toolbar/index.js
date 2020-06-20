import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { SearchRounded } from '@material-ui/icons';

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
    return this.setState({ data });
  }

  render() {
    const { classes, onClick } = this.props;
    return <TextField
      variant="outlined"
      color="secondary"
      placeholder="Tên sản phẩm"
      size="small"
      onChange={this.input}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" className={classes.adornment}>
            <IconButton size="small" onClick={() => onClick(this.state.data)}>
              <SearchRounded />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onKeyPress={e => e.key === 'Enter' ? onClick(this.state.data) : null}
      fullWidth={this.props.fullWidth} />
  }
}

SearchToolbar.defaultProps = {
  onClick: () => { },
  fullWidth: false,
}

SearchToolbar.propTypes = {
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
}

export default withStyles(styles)(SearchToolbar);