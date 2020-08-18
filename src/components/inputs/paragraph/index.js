import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { AddRounded, RemoveRounded } from '@material-ui/icons';

import { TextInput } from 'components/inputs';

import styles from './styles';


class ParagraphInput extends Component {

  onChange = (text, index) => {
    let { value, onChange } = this.props;
    value[index] = text;
    return onChange(value);
  }

  onAdd = (index) => {
    let { value, onChange } = this.props;
    value.splice(index + 1, 0, '');
    return onChange(value);
  }

  onRemove = (index) => {
    let { value, onChange } = this.props;
    value = value.filter((text, i) => (index !== i));
    return onChange(value);
  }

  render() {
    const { classes } = this.props;
    const { value, variant, placeholder, readOnly, disabled } = this.props;

    return <Grid container spacing={2}>
      {value.map((text, index) => <Grid item key={index} xs={12}>
        <Grid container className={classes.noWrap} spacing={1} alignItems="center">
          <Grid item className={classes.stretch}>
            <TextInput
              value={text}
              onChange={(value) => this.onChange(value, index)}
              variant={variant}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
            />
          </Grid>
          {readOnly || disabled ? null : <Grid item>
            <IconButton onClick={() => this.onRemove(index)} size="small">
              <RemoveRounded fontSize="small" />
            </IconButton>
          </Grid>}
          {readOnly || disabled ? null : <Grid item>
            <IconButton onClick={() => this.onAdd(index)} size="small">
              <AddRounded fontSize="small" />
            </IconButton>
          </Grid>}
        </Grid>
      </Grid>)}
    </Grid>
  }
}

ParagraphInput.defaultProps = {
  value: [],
  placeholder: '',
  variant: 'body1',
  onChange: () => { },
  readOnly: false,
  disabled: false,
}

ParagraphInput.propTypes = {
  value: PropTypes.array,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2']),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default withStyles(styles)(ParagraphInput);