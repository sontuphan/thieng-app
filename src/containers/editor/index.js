import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import EditorDialog from './dialog';

import { runEditor, returnData } from 'modules/editor.reducer';

import styles from './styles';


class Editor extends Component {

  onSave = (value) => {
    return this.props.returnData(value).then(() => {
      // Nothing
    }).catch(console.error);
  }

  onClose = () => {
    return this.props.returnData().then(() => {
      // Nothing
    }).catch(console.error);
  }

  render() {
    const { editor: { visible, file } } = this.props;
    return <Grid container spacing={2}>
      <EditorDialog
        visible={visible}
        file={file || {}}
        onSave={this.onSave}
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
  runEditor, returnData,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Editor)));