import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Parallax } from 'rc-scroll-anim';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import { CloudUploadRounded } from '@material-ui/icons';

import { getFile, getUser } from 'modules/bucket.reducer';
import { runEditor } from 'modules/editor.reducer';
import { updateUser } from 'modules/user.reducer';

import styles from './styles';

class Panel extends Component {

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { auth } = this.props;
    if (!isEqual(prevProps.auth, auth)) {
      this.loadData();
    }
  }

  loadData = (reset = false) => {
    const { auth: { _id }, getUser, getFile } = this.props;
    if (!_id) return;
    return getUser(_id, reset).then(user => {
      if (!user || !user.panel) return;
      return getFile(user.panel);
    }).catch(console.error);
  }

  url = () => {
    const { bucket, auth: { _id } } = this.props;
    const defaultSource = 'https://source.unsplash.com/featured/?interior';
    const user = bucket[_id];
    if (!user) return defaultSource;
    const file = bucket[user.panel];
    if (!file) return defaultSource;
    return !file.source ? defaultSource : file.source;
  }

  onUpload = () => {
    const { runEditor, updateUser } = this.props;
    return runEditor().then(file => {
      if (!file) return console.log('No file added');
      return updateUser({ panel: file._id });
    }).then(() => this.loadData(true)).catch(console.error);
  }

  render() {
    const { classes } = this.props;
    return <Grid item xs={12}>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item>
          <Tooltip title="Tải lên ảnh nền">
            <IconButton onClick={this.onUpload}>
              <CloudUploadRounded />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <div className={classes.panel}>
        <div className={classes.frame}>
          <Parallax
            animation={{ scale: 1.5, playScale: [1, 2] }}
            style={{ transform: 'scale(1)' }}
          >
            <div className={classes.image}
              style={{
                backgroundImage: `url(${this.url()})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }} />
          </Parallax>
        </div>
      </div>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  bucket: state.bucket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getFile, getUser,
  runEditor,
  updateUser,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Panel)));