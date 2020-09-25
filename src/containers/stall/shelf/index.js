import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import async from 'async';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {
  ThreeDRotationRounded, ColorLensRounded, AddRounded
} from '@material-ui/icons';

import { UserCard, ImageCard, BaseCard } from 'components/cards';
import Carousel, { CarouselChild } from 'components/carousel';

import styles from './styles';

import { getFile, getUser } from 'modules/bucket.reducer';


class Shelf extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      showing: 0,
    }
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { fileIds } = this.props;
    const { fileIds: prevFileIds } = prevProps;
    if (!isEqual(prevFileIds, fileIds)) {
      this.loadFiles();
    }
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

  onUpload = () => {
    return this.ref.current.click();
  }

  onFile = (e) => {
    const file = e.target.files[0];
    e.target.value = null; // Reset value
    if (!file) return console.error('Cannot read file');
    return this.props.onAdd(file);
  }

  render() {
    // const { classes } = this.props;
    const { userId, editable, fileIds } = this.props;
    const { showing, files } = this.state;
    const file = files[showing] || {};

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <BaseCard>
          {/* Images */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Carousel slidesPerView={1}>
                {fileIds.map((fileId, i) => <CarouselChild key={i}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ImageCard _id={fileId} />
                    </Grid>
                  </Grid>
                </CarouselChild>)}
              </Carousel>
            </Grid>
            {/* Author */}
            <Grid item xs={6}>
              <UserCard userId={userId} />
            </Grid>
            {/* Actions */}
            <Grid item xs={6}>
              <Grid container justify="flex-end" spacing={2}>
                {this.props.on3D ? <Grid item>
                  <IconButton onClick={this.props.on3D}>
                    <ThreeDRotationRounded />
                  </IconButton>
                </Grid> : null}
                {editable && file.source ? <Grid item>
                  <Tooltip title="Chỉnh sửa ảnh">
                    <IconButton onClick={() => this.props.onEdit(showing)}>
                      <ColorLensRounded />
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
                      <AddRounded />
                    </IconButton>
                  </Tooltip>
                </Grid> : null}
              </Grid>
            </Grid>
          </Grid>
        </BaseCard>
      </Grid>
    </Grid>
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