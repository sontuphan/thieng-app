import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import { AddRounded } from '@material-ui/icons';

import ImageEditorDialog from '../imageEditor/dialog';

import styles from './styles';

const DEFAULT_STATE = {
  url: null,
  visibleDialog: false,
}

class ImageUploader extends Component {
  constructor() {
    super();

    this.state = { ...DEFAULT_STATE }
    this.hiddenRef = React.createRef();
  }

  onChange = (e) => {
    if (!e.target.files[0]) return;
    let url = URL.createObjectURL(e.target.files[0]);
    return this.setState({ visibleDialog: true, url });
  }

  onAdd = () => {
    this.hiddenRef.current.click();
  }

  onClose = () => {
    this.hiddenRef.current.value = null;
    this.setState({ ...DEFAULT_STATE });
  }

  onSave = (value) => {
    this.props.onChange(value);
    this.onClose();
  }

  onDelete = () => {
    this.onClose();
  }

  render() {
    let { classes } = this.props;
    if (!this.props.visible) return null;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Add pseudo-button */}
        <Tooltip title="Add new image">
          <Avatar onClick={this.onAdd} className={classes.pseudoButton}>
            <AddRounded />
          </Avatar>
        </Tooltip>
        {/* Hidden input */}
        <input
          type="file"
          ref={this.hiddenRef}
          style={{ display: "none" }}
          onChange={this.onChange}
        />
        {/* Editor */}
        <ImageEditorDialog
          url={this.state.url}
          visible={this.state.visibleDialog}
          onSave={this.onSave}
          onDelete={this.onDelete}
          onClose={this.onClose}
        />
      </Grid>
    </Grid>
  }
}

ImageUploader.defaultProps = {
  visible: false,
  onChange: () => { },
}

ImageUploader.propTypes = {
  visible: PropTypes.bool,
  onChange: PropTypes.func,
}

export default withStyles(styles)(ImageUploader);