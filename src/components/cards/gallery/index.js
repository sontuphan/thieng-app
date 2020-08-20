import React, { useState, useRef, useEffect } from 'react';
import { useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import { ArrowUpwardRounded, ArrowDownwardRounded } from '@material-ui/icons';

import { ImageCard } from 'components/cards';

import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function GalleryCard(props) {
  // Define hooks
  const { ui } = useStore().getState();
  const [checked, setChecked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [height, setHeight] = useState(40);
  const myRef = useRef();
  const classes = useStyles();
  const data = useData(props.itemId);
  useEffect(() => {
    if (myRef.current) return setHeight(myRef.current.offsetWidth / 2);
  }, [data, ui]);
  // Define functions
  if (!data || data instanceof Error) return null;
  const onCollapse = () => setChecked((prev) => !prev);
  const imageProps = props.onClick ? { onClick: props.onClick } : { component: Link, to: `/item/${data._id}` }
  const onColors = ({ backgroundColors, textColors }) => {
    setBackgroundColor(backgroundColors[3]);
    setTextColor(textColors[3]);
  }
  // Render component
  return <Grid container spacing={2}>
    <Grid item xs={12} ref={myRef}>
      <Collapse in={checked} collapsedHeight={height}>
        <Paper elevation={0} className={classes.paper} style={{ backgroundColor: backgroundColor }}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={6} {...imageProps}>
              <ImageCard _id={data.thumbnailId} onChange={onColors} />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    {data.tags.map((tag, i) => <Grid item key={i}>
                      <Chip className={classes.chip} color="primary" label={tag} size="small" />
                    </Grid>)}
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.cursor}>
                  <Typography variant="h3" style={{ color: textColor }}>{data.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems="center" justify="flex-end">
                    <Grid item>
                      <Typography style={{ color: textColor }}>{utils.prettyNumber(data.price, 'long')} ₫</Typography>
                    </Grid>
                    {props.amount ? <Grid item>
                      <Chip className={classes.chip} color="primary" label={props.amount} size="small" />
                    </Grid> : null}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ color: textColor }}>{data.descriptions[0]}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ color: textColor }}>
              {props.body}
            </Grid>
            <Grid item xs={12} /> {/* Safe zone trick*/}
          </Grid>
        </Paper>
      </Collapse>
    </Grid>
    <Grid item xs={12} className={checked ? classes.expansionMore : classes.expansionLess}>
      <div
        className={classes.subexpansion}
        style={{ backgroundImage: `linear-gradient(to bottom, ${backgroundColor + '00'}, ${backgroundColor + '19'}, ${backgroundColor + 'ef'}, ${backgroundColor + 'ff'})` }}
      >
        <Grid container spacing={2} justify="flex-end">
          <Grid item className={classes.padding}>
            <IconButton size="small" onClick={onCollapse}>
              {checked ? <ArrowUpwardRounded fontSize="small" style={{ color: textColor }} />
                : <ArrowDownwardRounded fontSize="small" style={{ color: textColor }} />}
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Grid>
  </Grid >
}

GalleryCard.defaultProps = {
  onClick: null,
  amount: '',
  // onClick is null then using route
  body: null,
}

GalleryCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  amount: PropTypes.string,
  body: PropTypes.object,
  onClick: PropTypes.func,
}

export default GalleryCard;