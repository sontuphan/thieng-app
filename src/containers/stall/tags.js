import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';


function Tags(props) {
  const { tags } = props;
  if (!tags) return null;
  return <Grid container spacing={1}>
    {tags.map(tag => <Grid item key={tag}>
      <Chip color="primary" label={tag} size="small" />
    </Grid>)}
  </Grid>
}

Tags.defaultProps = {
  tags: []
}

Tags.propTypes = {
  tags: PropTypes.array
}

export default Tags;