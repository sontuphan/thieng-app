import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Each from './each';


function Thumbnail(props) {
  const { fileIds, onChange, value } = props;
  return <Grid container spacing={2}>
    {fileIds.map((fileId, i) => <Grid key={i} item xs={3}>
      <Each fileId={fileId} onClick={() => onChange(i)} selected={value === i} />
    </Grid>)}
  </Grid>
}

Thumbnail.defaultProps = {
  onChange: () => { },
  value: 0,
  fileIds: [],
}

Thumbnail.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
  fileIds: PropTypes.array,
}

export default Thumbnail;