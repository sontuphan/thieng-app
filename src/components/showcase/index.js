import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { ThreeDRotation, ArrowBack, ArrowForward } from '@material-ui/icons';

import ColorSelect from './colorSelect';
import Drain from 'components/drain';

import styles from './styles';

class Showcase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: 0,
      translate: 0,
      author: props.author,
      objects: props.objects
    }
  }

  onColor = (color) => {
    console.log(color);
  }

  onChange = (step) => {
    let translate = -step * (20 * this.state.objects.length - 100) / (this.state.objects.length - 1);
    if (translate > 0) translate = 0;
    this.setState({
      showing: step,
      translate: translate + 1
    }, () => { this.setState({ translate: translate }); });
  }

  onNext = () => {
    let step = this.state.showing + 1;
    if (step >= this.state.objects.length) step = this.state.objects.length - 1;
    this.onChange(step);
  }

  onBack = () => {
    let step = this.state.showing - 1;
    if (step < 0) step = 0;
    this.onChange(step);
  }

  render() {
    let { classes } = this.props;
    let { showing, author, objects } = this.state;

    return <Fragment>
      <Grid container spacing={2} justify="center"
        style={objects[showing].type !== 'png' ? {
          backgroundImage: `url('${objects[showing].url}')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        } : null}
        className={classes.showcase}>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-end" spacing={2}>
            <Grid item>
              <IconButton>
                <ThreeDRotation color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
             <img alt={objects[showing].url} 
             src={objects[showing].url} 
             height="auto" width="100%" 
             style={{visibility: objects[showing].type === 'png' ? "unset": "hidden"}}/>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar alt={author.displayname} src={author.avatar} className={classes.avatar} />
            </Grid>
            <Grid item xs={8}>
              <Typography noWrap>{author.displayname}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <ColorSelect colors={objects.map(obj => obj.color).filter(color => color !== null)} onChange={this.onColor} />
        </Grid>
      </Grid>
      <Drain small />
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={2} md={1}>
          <Grid container justify="flex-start">
            <IconButton onClick={this.onNext}>
              <ArrowBack />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={8} md={10}>
          <SwipeableViews index={showing} onChangeIndex={this.onChange} containerStyle={{ alignItems: "center", transform: `translate(${this.state.translate}%, 0px)` }} slideClassName={classes.slide} enableMouseEvents>
            {
              objects.map((object, i) => {
                return <Grid item key={i}>
                  <img onClick={() => this.onChange(i)} alt={object.url} src={object.url} className={classes.image} />
                </Grid>
              })
            }
          </SwipeableViews>
        </Grid>
        <Grid item xs={2} md={1}>
          <Grid container justify="flex-end">
            <IconButton onClick={this.onBack}>
              <ArrowForward />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  }
}

Showcase.propTypes = {
  author: PropTypes.object.isRequired,
  objects: PropTypes.array.isRequired,
}

export default withStyles(styles)(Showcase);