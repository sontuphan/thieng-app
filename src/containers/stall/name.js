import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { TextInput } from 'components/inputs';

function Name(props) {
  const onName = (value) => {
    if (!value || typeof value !== 'string') value = '';
    return props.onChange(value);
  }
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextInput
        variant="h1"
        value={props.name}
        onChange={onName}
        placeholder="Tên sản phẩm"
      />
    </Grid>
  </Grid>
}

Tags.defaultProps = {
  name: '',
  onChange: () => { },
}

Tags.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
}

export default Name;