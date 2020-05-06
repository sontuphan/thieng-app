import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { EditRounded } from '@material-ui/icons';

import ImageEditorDialog from './dialog';

import styles from './styles';


class ImageEditor extends Component {
  constructor() {
    super();

    this.state = {
      visibleDialog: false,
    }
  }

  onEdit = () => {
    this.setState({ visibleDialog: true });
  }

  onSave = (value) => {
    this.props.onChange(value);
    this.onClose();
  }

  onDelete = () => {
    this.props.onChange({ url: null, color: null });
    this.onClose();
  }

  onClose = () => {
    this.setState({ visibleDialog: false });
  }

  render() {
    let { classes } = this.props;
    if (!this.props.visible) return null;

    return <Grid container spacing={2}>
      {/* Buttons */}
      <Grid item xs={12}>
        <Grid container justify="flex-end" className={classes.noWrap} spacing={2}>
          <Grid item>
            <IconButton onClick={this.onEdit}>
              <EditRounded style={{ color: this.props.iconColor }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {/* Confirmation dialog */}
      <ImageEditorDialog
        visible={this.state.visibleDialog}
        url={this.props.url}
        color={this.props.color}
        onSave={this.onSave}
        onDelete={this.onDelete}
        onClose={this.onClose}
      />
    </Grid>
  }
}

ImageEditor.defaultProps = {
  visible: false,
  onChange: () => { },
  iconColor: '#ffffff',
}

ImageEditor.propTypes = {
  visible: PropTypes.bool,
  onChange: PropTypes.func,
  iconColor: PropTypes.string,
  url: PropTypes.string,
  color: PropTypes.string,
}

export default withStyles(styles)(ImageEditor);