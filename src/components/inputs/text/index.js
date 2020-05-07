import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './styles';


class TextInput extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.readOnly !== this.props.readOnly ||
      prevProps.focus !== this.props.focus
    ) {
      this.focus();
    }
    if (prevProps.value !== this.props.value) {
      this.ref.current.textContent = this.props.value;
    }
  }

  focus = () => {
    if (!this.props.readOnly && this.props.focus)
      return this.ref.current.focus();
  }

  onInput = (e) => {
    const contents = e.target.textContent;
    this.props.onChange(contents);
  }

  render() {
    let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          ref={this.ref}
          contentEditable={!this.props.readOnly && !this.props.disabled}
          suppressContentEditableWarning={!this.props.readOnly && !this.props.disabled}
          className={classes.text}
          variant={this.props.variant}
          align={this.props.align}
          onInput={this.onInput}
          color={this.props.disabled ? 'textSecondary' : 'textPrimary'}
          placeholder={this.props.placeholder}
        />
      </Grid>
    </Grid>
  }
}

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  variant: 'body1',
  onChange: () => { },
  readOnly: false,
  disabled: false,
  focus: false,
}

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2']),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
}

export default withStyles(styles)(TextInput);