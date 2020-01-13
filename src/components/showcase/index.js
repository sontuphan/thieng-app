import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Swipeable } from 'react-swipeable';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

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
    this.state.objects.forEach((obj, step) => {
      if (obj.color === color) this.onChange(step);
    });
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

  onAuthor = () => {
    window.open(this.state.author.link, '_blank');
  }

  render() {
    let { classes } = this.props;
    let { showing, author, objects } = this.state;

    return <Fragment>
      <Swipeable onSwipedLeft={this.onNext} onSwipedRight={this.onBack}>
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
                <IconButton onClick={this.props.on3D}>
                  <ThreeDRotation />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} className={classes.imageShelf} style={objects[showing].type === 'png' ? {
            backgroundImage: `url('${objects[showing].url}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          } : null}>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item onClick={this.onAuthor} className={classes.pointer}>
                <Avatar alt={author.displayname} src={author.avatar} className={classes.avatar} />
              </Grid>
              <Grid item xs={8} onClick={this.onAuthor} className={classes.pointer}>
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
              <IconButton onClick={this.onBack}>
                <ArrowBack />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={8} md={10}>
            <SwipeableViews index={showing} onChangeIndex={this.onChange} containerStyle={{ alignItems: "center", transform: `translate(${this.state.translate}%, 0px)` }} slideClassName={classes.slide} disabled>
              {
                objects.map((object, i) => {
                  return <Grid item key={i}>
                    <Grid container justify="center">
                      {this.state.showing === i ? <Badge overlap="circle" variant="dot" color="primary">
                        <Avatar alt={object.url} src={object.url} onClick={() => this.onChange(i)} />
                      </Badge>
                        : <Avatar alt={object.url} src={object.url} onClick={() => this.onChange(i)} />
                      }
                    </Grid>
                  </Grid>
                })
              }
            </SwipeableViews>
          </Grid>
          <Grid item xs={2} md={1}>
            <Grid container justify="flex-end">
              <IconButton onClick={this.onNext}>
                <ArrowForward />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Swipeable>
    </Fragment>
  }
}

Showcase.propTypes = {
  author: PropTypes.object.isRequired,
  objects: PropTypes.array.isRequired,
  on3D: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(Showcase));