import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { ImageRounded, DeleteRounded } from '@material-ui/icons';

import styles from './styles';

class Image extends Component {

  onEdit = () => {
    let e = document.getElementById('tree-upload-image');
    e.click();
  }

  onImage = (e) => {
    let url = URL.createObjectURL(e.target.files[0])
    this.props.tree.editImage(
      this.props.id,
      url,
    );
    this.props.onChange(this.props.tree);
  }

  onDelete = () => {
    this.props.tree.deleteImage(this.props.id);
    this.props.onChange(this.props.tree);
  }

  render() {
    let { classes } = this.props;
    let node = this.props.tree.getNode(this.props.id);
    return <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        className={this.props.editable ? classes.container : null}
        id={this.props.id}
      >
        <Grid item xs={12}>
          <img width="100%" height="auto" alt={node.url} src={node.url} />
        </Grid>
        {this.props.editable ? <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <input type="file" id="tree-upload-image" style={{ display: "none" }} onChange={this.onImage} />
              <IconButton size="small" onClick={this.onEdit}>
                <ImageRounded fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={this.onDelete}>
                <DeleteRounded fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid> : null}
      </Grid>
    </Grid>
  }
}

Image.defaultProps = {
  onChange: () => { },
  editable: false,
}

Image.propTypes = {
  id: PropTypes.string.isRequired,
  tree: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
}

export default withStyles(styles)(Image);