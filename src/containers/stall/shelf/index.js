import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Swipeable } from 'react-swipeable';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import {
  ThreeDRotationRounded, ArrowBackRounded,
  ArrowForwardRounded, ColorLensRounded, AddRounded
} from '@material-ui/icons';

import ColorSelect from './colorSelect';
import Drain from 'components/drain';

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
    const { showing } = this.state;
    const { files } = this.props;
    if (prevState.showing !== showing) {
      utils.getAccessibleTextColor(files[showing].source).then(color => {
        this.setState({ color });
      });
    }
  }

  onColor = (color) => {
    const { files } = this.props;
    files.forEach(({ metadata }, step) => {
      if (metadata.color === color) this.onStep(step);
    });
  }

  onStep = (step) => {
    const { files } = this.props;
    let translate = -step * (20 * files.length - 100) / (files.length - 1);
    if (translate > 0) translate = 0;
    this.setState({
      showing: step,
      translate: translate + 1
    }, () => this.setState({ translate }));
  }

  onNext = () => {
    const { files } = this.props;
    let step = Math.min(this.state.showing + 1, files.length - 1);
    this.onStep(step);
  }

  onBack = () => {
    let step = Math.max(this.state.showing - 1, 0);
    this.onStep(step);
  }

  render() {
    const { classes, author, files } = this.props;
    const { showing } = this.state;
    const file = files[showing] || {};
    const colors = files.map(file => file.metadata && file.metadata.color).filter(color => color);

    return <Swipeable onSwipedLeft={this.onNext} onSwipedRight={this.onBack}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Grid container
            spacing={2}
            justify="center"
            alignItems="center"
            style={file.type && file.type !== 'image/png' ? {
              backgroundImage: `url('${file.source}')`,
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
                {this.props.editable && file.source ? <Grid item>
                  <IconButton onClick={() => this.props.onEdit(showing)}>
                    <ColorLensRounded style={{ color: this.state.color }} />
                  </IconButton>
                </Grid> : null}
              </Grid>
            </Grid>
            {/* PNG image */}
            <Grid item
              xs={10}
              className={classes.imageShelf}
              style={file.type && file.type === 'image/png' ? {
                backgroundImage: `url('${file.source}')`,
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
                value={file.metadata && file.metadata.color}
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
                  files.map((file, i) => <Grid item key={i}>
                    <Grid container justify="center">
                      <Badge
                        overlap="circle"
                        variant="dot"
                        color="primary"
                        invisible={showing !== i}
                      >
                        <Avatar
                          alt={file.source}
                          src={file.source}
                          onClick={() => this.onStep(i)}
                          className={classes.cursor}
                        />
                      </Badge>
                    </Grid>
                  </Grid>)
                }
                {this.props.editable ? <Grid item>
                  <Tooltip title="Add new image">
                    <Avatar
                      onClick={this.props.onAdd}
                      className={classes.cursor}
                    >
                      <AddRounded />
                    </Avatar>
                  </Tooltip>
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
  files: [],
  onAdd: () => { },
  onEdit: () => { },
  editable: false,
}

Shelf.propTypes = {
  author: PropTypes.object.isRequired,
  files: PropTypes.array,
  on3D: PropTypes.func,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  editable: PropTypes.bool,
}

export default withRouter(withStyles(styles)(Shelf));