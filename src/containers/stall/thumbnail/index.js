import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { PhotoAlbumRounded, InfoRounded } from '@material-ui/icons';

import Each from './each';

const useStyles = makeStyles(theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  info: {
    cursor: "pointer"
  }
}));

function Thumbnail(props) {
  const classes = useStyles();
  const { fileIds, onChange, value } = props;
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container alignItems="center" className={classes.onWrap} spacing={2}>
        <Grid item >
          <PhotoAlbumRounded color="primary" fontSize="small" />
        </Grid>
        <Grid item>
          <Typography>Ảnh đại diện</Typography>
        </Grid>
        <Grid item className={classes.stretch}>
          <Divider />
        </Grid>
        <Tooltip title="Chọn một ảnh để dùng làm đại diện cho sản phẩm." enterTouchDelay={100} className={classes.info}>
          <InfoRounded fontSize="small" />
        </Tooltip>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={2}>
        {fileIds.map((fileId, i) => <Grid key={i} item xs={3}>
          <Each fileId={fileId} onClick={() => onChange(i)} selected={value === i} />
        </Grid>)}
      </Grid>
    </Grid>
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