import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';
import { useData } from './module';

function ImageCard(props) {
  const classes = useStyles();
  const data = useData(props._id);

  if (!data) return null;
  return <Grid container justify="center">
    <Grid item xs={12} onClick={props.onClick}>
      <div className={classes.image}>
        {data.type === 'image/jpg' || data.type === 'image/jpeg' ?
          <div className={classes.imageJPG}
            style={{
              backgroundImage: `url('${data.source}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }} />
          : null}
        {data.type === 'image/png' ?
          <div className={classes.imagePNG}
            style={{
              backgroundImage: `url('${data.source}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            }} />
          : null}
      </div>
    </Grid>
  </Grid>
}

ImageCard.defaultProps = {
  onClick: () => { }
}

ImageCard.propTypes = {
  _id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default ImageCard;