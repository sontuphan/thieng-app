import React, { Component, Fragment } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Swipeable } from 'react-swipeable';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import { ThreeDRotationRounded, ArrowBackRounded, ArrowForwardRounded } from '@material-ui/icons';

import ColorSelect from './colorSelect';
import Drain from 'components/drain';
import ImageEditor from './imageEditor';
import ImageUploader from './imageUploader';

import styles from './styles';
import utils from 'helpers/utils';

class Shelf extends Component {
  constructor() {
    super();

    this.state = {
      showing: 0,
      translate: 0,
      color: '#ffffff',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showing !== this.state.showing) {
      utils.getAccessibleTextColor(this.props.objects[this.state.showing].url).then(color => {
        this.setState({ color });
      });
    }
  }

  onColor = (color) => {
    this.props.objects.forEach((obj, step) => {
      if (obj.color === color) this.onStep(step);
    });
  }

  onStep = (step) => {
    let { objects } = this.props;
    let translate = -step * (20 * objects.length - 100) / (objects.length - 1);
    if (translate > 0) translate = 0;
    this.setState({
      showing: step,
      translate: translate + 1
    }, () => this.setState({ translate: translate }));
  }

  onNext = () => {
    let { objects } = this.props;
    let step = this.state.showing + 1;
    if (step >= objects.length) step = objects.length - 1;
    this.onStep(step);
  }

  onBack = () => {
    let step = this.state.showing - 1;
    if (step < 0) step = 0;
    this.onStep(step);
  }

  onAdd = (value) => {
    let { objects } = this.props;
    objects.push({ ...value, type: 'jpg' });
    return this.props.onChange(objects);
  }

  onEdit = (value) => {
    let { showing } = this.state;
    let { objects } = this.props;
    if (!value.url && !value.color) {
      objects = objects.filter((obj, index) => index !== showing);
    }
    else {
      objects[showing] = { ...objects[showing], ...value }
    }
    return this.props.onChange(objects);
  }

  render() {
    let { classes, author, objects } = this.props;
    let { showing } = this.state;
    let obj = objects[showing];
    let colors = objects.map(obj => obj.color).filter(color => color);

    return <Swipeable onSwipedLeft={this.onNext} onSwipedRight={this.onBack}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Grid container
            spacing={2}
            justify="center"
            alignItems="center"
            style={obj && obj.type !== 'png' ? {
              backgroundImage: `url('${obj.url}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            } : null}
            className={classes.shelf}
          >
            {/* Actions */}
            <Grid item xs={12}>
              <Grid container justify="flex-end" spacing={2}>
                {this.props.on3D ? <Grid item>
                  <IconButton onClick={this.props.on3D}>
                    <ThreeDRotationRounded style={{ color: this.state.color }} />
                  </IconButton>
                </Grid> : null}
                {this.props.editable && obj ? <Grid item>
                  <ImageEditor
                    iconColor={this.state.color}
                    onChange={this.onEdit}
                    url={obj.url}
                    color={obj.color}
                    visible
                  />
                </Grid> : null}
              </Grid>
            </Grid>
            {/* PNG image */}
            <Grid item
              xs={10}
              className={classes.imageShelf}
              style={obj && obj.type === 'png' ? {
                backgroundImage: `url('${obj.url}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              } : null}
            />
            {/* Author */}
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={1} >
                <Grid item className={classes.link} component={RouterLink} to={author.link || '#'}>
                  <Avatar alt={author.displayname} src={author.avatar} />
                </Grid>
                <Grid item xs={8} className={classes.link} component={RouterLink} to={author.link || '#'}>
                  <Typography style={{ color: this.state.color }} noWrap>{author.displayname}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* Colors */}
            <Grid item xs={6}>
              <ColorSelect
                colors={colors}
                value={obj ? obj.color : null}
                onChange={this.onColor}
              />
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Drain small />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2} md={1}>
              <Grid container justify="flex-start">
                <Grid item>
                  <IconButton onClick={this.onBack}>
                    <ArrowBackRounded />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8} md={10}>
              <SwipeableViews
                index={showing}
                onChangeIndex={this.onStep}
                containerStyle={{
                  alignItems: "center",
                  transform: `translate(${this.state.translate}%, 0px)`
                }}
                slideClassName={classes.slide}
                disabled
              >
                {
                  objects.map((object, i) => <Grid item key={i}>
                    <Grid container justify="center">
                      <Badge
                        overlap="circle"
                        variant="dot"
                        color="primary"
                        invisible={this.state.showing !== i}
                      >
                        <Avatar
                          alt={object.url}
                          src={object.url}
                          onClick={() => this.onStep(i)}
                          className={classes.cursor}
                        />
                      </Badge>
                    </Grid>
                  </Grid>)
                }
                {this.props.editable ? <Grid item>
                  <ImageUploader
                    onChange={this.onAdd}
                    visible
                  />
                </Grid> : <Fragment />}
              </SwipeableViews>
            </Grid>
            <Grid item xs={2} md={1}>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton onClick={this.onNext}>
                    <ArrowForwardRounded />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Swipeable>
  }
}

Shelf.defaultProps = {
  objects: [],
  onChange: () => { },
  editable: false,
}

Shelf.propTypes = {
  author: PropTypes.object.isRequired,
  objects: PropTypes.array,
  on3D: PropTypes.func,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
}

export default withRouter(withStyles(styles)(Shelf));