import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Swipeable } from 'react-swipeable';
import async from 'async';
import isEqual from 'react-fast-compare';

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

import Drain from 'components/drain';

import styles from './styles';
import utils from 'helpers/utils';

import { getFile, getUser } from 'modules/bucket.reducer';


class Shelf extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      author: {},
      showing: 0,
      translate: 0,
      color: '#ffffff',
    }
  }

  componentDidMount() {
    this.loadUser();
    this.loadFiles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { fileIds } = this.props;
    if (!isEqual(prevProps.fileIds, fileIds)) {
      this.loadFiles();
    }
    const { showing, files } = this.state;
    if (!isEqual(prevState.files, files)) {
      this.setState({ showing: Math.max(0, Math.min(files.length - 1, showing)) });
    }
    if (!isEqual(prevState.showing, showing)) {
      utils.getAccessibleTextColor(files[showing].source).then(color => {
        return this.setState({ color });
      });
    }
  }

  loadUser = () => {
    const { userId, getUser } = this.props;
    return getUser(userId).then(user => {
      this.setState({ author: user });
    }).catch(console.error);
  }

  loadFiles = () => {
    const { fileIds, getFile } = this.props;
    return async.map(fileIds, (fileId, cb) => {
      return getFile(fileId).then(re => cb(null, re)).catch(er => cb(er, null));
    }, (er, re) => {
      if (er) return console.error(er);
      return this.setState({ files: re });
    });
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
    const { classes, editable } = this.props;
    const { showing, files, author } = this.state;
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
              <Grid container alignItems="center" spacing={1} >
                <Grid item className={classes.link} component={RouterLink} to={'#'}>
                  <Avatar alt={author.displayname} src={author.avatar} />
                </Grid>
                <Grid item xs={8} className={classes.link} component={RouterLink} to={'#'}>
                  <Typography style={{ color: this.state.color }} noWrap>{author.displayname}</Typography>
                </Grid>
              </Grid>
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
                  <Tooltip title="Thêm ảnh mới">
                    <IconButton onClick={this.props.onAdd}>
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