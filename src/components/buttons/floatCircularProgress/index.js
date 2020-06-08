import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';


function FloatCircularProgressButton(props) {
  const options = {
    ...props,
    children: props.isLoading ? <CircularProgress size={16} /> : props.children,
    disabled: props.isLoading,
  }
  delete options.isLoading;
  return <Fab {...options} />
}

FloatCircularProgressButton.defaultProps = {
  isLoading: false,
}

FloatCircularProgressButton.propTypes = {
  isLoading: PropTypes.bool,
}

export default FloatCircularProgressButton;