import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Swipeable } from 'react-swipeable';
import async from 'async';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import {
  ThreeDRotationRounded, ArrowBackRounded,
  ArrowForwardRounded, ColorLensRounded, AddRounded
} from '@material-ui/icons';

import Drain from 'components/drain';
import { UserCard } from 'components/cards';

import styles from './styles';
import utils from 'helpers/utils';

import { getFile, getUser } from 'modules/bucket.reducer';


class Shelf extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      showing: 0,
      translate: 0,
      color: '#ffffff',
    }
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { fileIds } = this.props;
    const { showing, files } = this.state;
    if (!isEqual(prevProps.fileIds, fileIds)) {
      this.loadFiles();
    }
    if (!isEqual(prevState.files, files)) {
      if (showing === prevState.files.length - 1) this.onStep(files.length - 1);
      else this.onStep(Math.max(0, Math.min(files.length - 1, showing)));
    }
    if (!isEqual(prevState.showing, showing)) {
      this.loadBodyTextColor();
    }
  }

  loadFiles = () => {
    const { fileIds, getFile } = this.props;
    return async.map(fileIds, (fileId, cb) => {
      return getFile(fileId).then(re => cb(null, re)).catch(er => cb(er, null));
    }, (er, re) => {
      if (er) return console.error(er);
      return this.setState({ files: re }, this.loadBodyTextColor);
    });
  }

  loadBodyTextColor = () => {
    const { showing, files } = this.state;
    if (!files || !files.length || !files[showing]) return console.error('No image');
    return utils.extractImageColors(files[showing].source).then(palette => {
      const color = palette.Vibrant.bodyTextColor;
      return this.setState({ color });
    }).catch(console.error);
  }

  onUpload = () => {
    return this.ref.current.click();
  }

  onFile = (e) => {
    const file = e.target.files[0];
    e.target.value = null; // Reset value
    if (!file) return console.error('Cannot read file');
    return this.props.onAdd(file);
  }

  onStep = (step) => {
    const { files } = this.state;
    let translate = -step * (20 * files.length - 100) / (files.length - 1);
    if (translate > 0) translate = 0;
    return this.setState({
      showing: step,
      translate: translate + 1
    }, () => this.setState({ translate }));
  }

  onNext = () => {
    const { files } = this.state;
    let step = Math.min(this.state.showing + 1, files.length - 1);
    return this.onStep(step);
  }

  onBack = () => {
    let step = Math.max(this.state.showing - 1, 0);
    return this.onStep(step);
  }

  render() {
    const { classes } = this.props;
    const { userId, editable } = this.props;
    const { showing, files } = this.state;
    const file = files[showing] || {};

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
              <UserCard color={this.state.color} userId={userId} />
            </Grid>
            {/* Actions */}
            <Grid item xs={6}>
              <Grid container justify="flex-end" spacing={2}>
                {this.props.on3D ? <Grid item>
                  <IconButton onClick={this.props.on3D}>
                    <ThreeDRotationRounded style={{ color: this.state.color }} />
                  </IconButton>
                </Grid> : null}
                {editable && file.source ? <Grid item>
                  <Tooltip title="Chỉnh sửa ảnh">
                    <IconButton onClick={() => this.props.onEdit(showing)}>
                      <ColorLensRounded style={{ color: this.state.color }} />
                    </IconButton>
                  </Tooltip>
                </Grid> : null}
                {editable ? <Grid item>
                  <input
                    type="file"
                    ref={this.ref}
                    style={{ display: 'none' }}
                    onChange={this.onFile}
                  />
                  <Tooltip title="Thêm ảnh mới">
                    <IconButton onClick={this.onUpload}>
                      <AddRounded style={{ color: this.state.color }} />
                    </IconButton>
                  </Tooltip>
                </Grid> : null}
              </Grid>
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
                {files.map((file, i) => <Grid item key={i}>
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
                </Grid>)}
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
  fileIds: [],
  step: 0,
  onAdd: () => { },
  onEdit: () => { },
  editable: false,
}

Shelf.propTypes = {
  userId: PropTypes.string.isRequired,
  fileIds: PropTypes.array,
  on3D: PropTypes.func,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  editable: PropTypes.bool,
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getFile, getUser,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Shelf)));