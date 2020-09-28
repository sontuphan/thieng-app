import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Zoom from '@material-ui/core/Zoom';

import { BaseCard } from 'components/cards';
import { ImageCard } from 'components/cards';

import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function LiteItemCard(props) {
  const classes = useStyles();
  const data = useData(props.itemId);
  if (!data) return null;
  const imageProps = props.onClick ? { onClick: props.onClick } : { component: Link, to: `/item/${data._id}` }

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <BaseCard>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} {...imageProps}>
            <ImageCard _id={data.thumbnailId} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {data.tags.map(tag => <Grid item key={tag}>
                <Chip color="primary" label={tag} size="small" />
              </Grid>)}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.cursor}>
            <Typography >{data.name}</Typography>
            <Typography variant="body2">{utils.prettyNumber(data.price, 'long')} ₫</Typography>
          </Grid>
        </Grid>
        <Zoom in={props.selective}>
          <Checkbox
            color="primary"
            className={classes.radio}
            checked={props.selected}
            onChange={(e) => props.onClick(e.target.checked)}
          />
        </Zoom>
      </BaseCard>
    </Grid>
  </Grid >
}

LiteItemCard.defaultProps = {
  onClick: null,
  selective: false,
  selected: false,
}

LiteItemCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selective: PropTypes.bool,
  selected: PropTypes.bool,
}

export default LiteItemCard;


function WrapperLiteItemCard(props) {
  return <Grid item xs={6} sm={4} md={3} lg={2}>
    {props.children}
  </Grid>
}

export { WrapperLiteItemCard };