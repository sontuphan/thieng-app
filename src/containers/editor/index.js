import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import EditorDialog from './dialog';

import {
  runEditor, setData, returnData,
  uploadFile, updateFile,
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
    const { editor: { visible, file: { source } } } = this.props;
    if (!isEqual(prevProps.editor.visible, visible) && visible) {
      if (source) return this.setState({ visible });
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
      URL.revokeObjectURL(value.source); // Free memory
      return this.props.uploadFile(file, value.metadata).then(re => {
        this.props.setData(re);
        return this.onClose();
      }).catch(console.error);
    }
    else { // Editing mode
      return this.props.updateFile(value).then(re => {
        this.props.setData(re);
        return this.onClose();
      }).catch(console.error);
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
  runEditor, setData, returnData,
  uploadFile, updateFile,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Editor)));