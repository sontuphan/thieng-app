import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function ImageCard(props) {
  // Define hooks
  const classes = useStyles();
  const data = useData(props._id);
  const theme = useTheme();
  // Return default if errors
  if (!data || data instanceof Error) return <div className={classes.full}>
    <div className={classes.png} />
  </div>
  // State changes
  utils.extractImageColors(data.source).then(re => {
    const backgroundColors = Object.keys(re).map(key => re[key].hex);
    const textColors = Object.keys(re).map(key => re[key].bodyTextColor);
    return props.onChange({ backgroundColors, textColors });
  }).catch(console.error);

  return <Grid container spacing={2}
    style={props.variant === 'square' ? data.type !== 'image/png' ? {
      backgroundImage: `url('${data.source}')`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    } : { background: theme.background.primary } : null}
  >
    <Grid item xs={12}>
      <div onClick={props.onClick} className={classes[props.variant]}  >
        {props.variant === 'rounded' && data.type !== 'image/png' ?
          <div className={classes.jpg}
            style={{
              backgroundImage: `url('${data.source}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }} />
          : null}
        {data.type === 'image/png' ?
          <div className={classes.png}
            style={{
              backgroundImage: `url('${data.source}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            }} />
          : null}
      </div>
    </Grid>
  </Grid >
}

ImageCard.defaultProps = {
  variant: 'rounded',
  onClick: () => { },
  onChange: () => { }
}

ImageCard.propTypes = {
  _id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['square', 'rounded']),
  onClick: PropTypes.func,
  onChange: PropTypes.func,
}

export default ImageCard;