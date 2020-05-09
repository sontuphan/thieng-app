import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ImageEditorDialog from './dialog';

import {
  runImageEditor, setImageData, returnImageData,
  uploadFile,
} from 'modules/imageEditor.reducer';

import styles from './styles';


class Editor extends Component {
  constructor() {
    super();

    this.state = {
      file: null,
      visible: false,
    }
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.imageEditor.visible !== this.props.imageEditor.visible
      && this.props.imageEditor.visible
    ) {
      if (this.props.imageEditor.url)
        return this.setState({ visible: true });
      return this.ref.current.click();
    }
  }

  onFile = (e) => {
    const file = e.target.files[0];
    if (!file) return console.error('Cannot read file');
    return this.props.setImageData({ url: URL.createObjectURL(file) }).then(() => {
      this.setState({ visible: true, file });
    }).catch(console.error);
  }

  onSave = ({ url, color }) => {
    const { file } = this.state;
    if (file) { // Adding mode
      URL.revokeObjectURL(url);
      // Uploading files
      this.props.uploadFile(file).then(re => {
        url = re.source;
        this.props.setImageData({ url, color });
        return this.onClose();
      }).catch(console.error);
    }
    else { // Editing mode
      this.props.setImageData({ url, color });
      return this.onClose();
    }
  }

  onDelete = () => {
    this.props.setImageData({ url: null, color: null });
    return this.onClose();
  }

  onClose = () => {
    return this.props.returnImageData().then(() => {
      return this.setState({ visible: false, file: null });
    }).catch(console.error);
  }

  render() {
    return <Grid container spacing={2}>
      {/* Hidden input */}
      <input
        type="file"
        ref={this.ref}
        style={{ display: 'none' }}
        onChange={this.onFile}
      />
      {/* Confirmation dialog */}
      <ImageEditorDialog
        visible={this.state.visible}
        url={this.props.imageEditor.url}
        color={this.props.imageEditor.color}
        onSave={this.onSave}
        onDelete={this.onDelete}
        onClose={this.onClose}
      />
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  imageEditor: state.imageEditor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  runImageEditor, setImageData, returnImageData, uploadFile,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Editor)));