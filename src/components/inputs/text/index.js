import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './styles';


class TextInput extends Component {

  componentDidMount() {
    this.props.inputRef(this.myRef);
  }

  onChange = (e) => {
    const contents = e.target.textContent;
    this.props.onChange(contents);
  }

  render() {
    let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          ref={node => this.myRef = node}
          contentEditable={!this.props.readOnly}
          suppressContentEditableWarning={!this.props.readOnly}
          className={classes.text}
          variant={this.props.variant}
          align={this.props.align}
          onBlur={this.onChange}
          color={this.props.disabled ? "textSecondary" : "textPrimary"}
        >{this.props.value}</Typography>
      </Grid>
    </Grid>
  }
}

TextInput.defaultProps = {
  value: '',
  variant: 'body1',
  onChange: () => { },
  inputRef: () => { },
  readOnly: false,
  disabled: false,
}

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2']),
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default withStyles(styles)(TextInput);