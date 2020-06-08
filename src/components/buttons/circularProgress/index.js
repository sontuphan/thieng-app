import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


function CircularProgressButton(props) {
  const options = {
    ...props,
    endIcon: props.isLoading ? <CircularProgress size={16} /> : props.endIcon,
    disabled: props.isLoading,
  }
  delete options.isLoading;
  return <Button {...options} />
}

CircularProgressButton.defaultProps = {
  isLoading: false,
}

CircularProgressButton.propTypes = {
  isLoading: PropTypes.bool,
}

export default CircularProgressButton;