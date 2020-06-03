import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { ImageCard } from 'components/cards';

import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function ProductCard(props) {
  const classes = useStyles();
  const data = useData(props.itemId);
  if (!data) return null;
  const imageProps = props.onClick ? { onClick: props.onClick } : { component: Link, to: `/item/${data._id}` }

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} {...imageProps}>
            <ImageCard _id={data.thumbnailId || data.fileIds[0]} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {data.tags.map(tag => <Grid item key={tag}>
                <Chip
                  className={classes.chip}
                  color="primary"
                  label={tag}
                  size="small"
                />
              </Grid>)}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.cursor}>
            <Typography>{data.name}</Typography>
            <Typography variant="h3">{utils.prettyNumber(data.price, 'long')} vnd</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid >
}

ProductCard.defaultProps = {
  onClick: null,
}

ProductCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default ProductCard;