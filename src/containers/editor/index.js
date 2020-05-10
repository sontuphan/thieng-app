import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import EditorDialog from './dialog';

import {
  runEditor, setData, returnData,
  uploadFile,
} from 'modules/editor.reducer';

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
      prevProps.editor.visible !== this.props.editor.visible
      && this.props.editor.visible
    ) {
      if (this.props.editor.source)
        return this.setState({ visible: true });
      return this.ref.current.click();
    }
  }

  onFile = (e) => {
    const file = e.target.files[0];
    if (!file) return console.error('Cannot read file');
    return this.props.setData({
      source: URL.createObjectURL(file),
      metadata: { color: null }
    }).then(() => {
      this.setState({ visible: true, file });
    }).catch(console.error);
  }

  onSave = (value) => {
    const { file } = this.state;
    if (file) { // Adding mode
      // Free memory
      URL.revokeObjectURL(value.source);
      // Uploading files
      this.props.uploadFile(file).then(re => {
        this.props.setData(re);
        return this.onClose();
      }).catch(console.error);
    }
    else { // Editing mode
      this.props.setData(value);
      return this.onClose();
    }
  }

  onDelete = () => {
    this.props.setData({ file: null });
    return this.onClose();
  }

  onClose = () => {
    return this.props.returnData().then(() => {
      this.ref.current.value = null;
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
      <EditorDialog
        visible={this.state.visible}
        file={this.props.editor.file}
        onSave={this.onSave}
        onDelete={this.onDelete}
        onClose={this.onClose}
      />
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  editor: state.editor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  runEditor, setData, returnData, uploadFile,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Editor)));