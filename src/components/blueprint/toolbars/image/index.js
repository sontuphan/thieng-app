import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { ImageRounded, DeleteRounded } from '@material-ui/icons';

import { useStyles } from './styles';
import configs from 'configs';
import api from 'helpers/api';
import { DEFAULT_IMAGE } from '../../tree/constants';

const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    let data = new FormData();
    const type = file.type.split('/')[0];
    data.append(type, file);
    const { api: { base } } = configs;
    api.post(`${base}/file/${type}`, data).then(re => {
      return resolve({ url: re.data.source });
    }).catch(er => {
      return reject(er);
    });
  });
}

const ImageBar = (props) => {
  const classes = useStyles();
  const myRef = useRef(null);

  const onChange = (e) => {
    if (!e.target.files[0]) return;
    uploadFile(e.target.files[0]).then(re => {
      return props.onChange(null, re);
    }).catch(er => {
      return props.onChange(er, null);
    });
  }

  return <Paper className={classes.paper} elevation={8}>
    <Grid container spacing={1}>
      <Grid item>
        <IconButton size="small" onClick={props.onDelete}>
          <DeleteRounded fontSize="small" />
        </IconButton>
      </Grid>

      <Grid item>
        <Divider orientation="vertical" />
      </Grid>

      <Grid item>
        <input
          type="file"
          ref={myRef}
          style={{ display: "none" }}
          onChange={onChange}
        />
        <IconButton size="small" onClick={() => myRef.current.click()}>
          <ImageRounded fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  </Paper>
}

ImageBar.defaultProps = {
  value: DEFAULT_IMAGE,
  onChange: () => { },
  onDelete: () => { },
}

ImageBar.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
}

export default ImageBar;