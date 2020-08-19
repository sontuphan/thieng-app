import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function ImageCard(props) {
  // Define hooks
  const classes = useStyles();
  const data = useData(props._id);
  // Return default if errors
  if (!data || data instanceof Error) return <Grid container justify="center">
    <Grid item xs={12} onClick={props.onClick}>
      <div className={classes.image}>
        <div className={classes.imagePNG} />
      </div>
    </Grid>
  </Grid>
  // State changes
  utils.extractImageColors(data.source).then(re => {
    const backgroundColors = Object.keys(re).map(key => re[key].hex);
    const textColors = Object.keys(re).map(key => re[key].bodyTextColor);
    return props.onChange({ backgroundColors, textColors });
  }).catch(console.error);

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
  onClick: () => { },
  onChange: () => { }
}

ImageCard.propTypes = {
  _id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
}

export default ImageCard;