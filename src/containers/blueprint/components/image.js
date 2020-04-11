import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ImageBar } from '../toolbars';

import styles from './styles';


class Image extends Component {

  onChange = (data) => {
    this.props.tree.editImage(
      this.props.id,
      data.url,
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
        id={this.props.id}
        className={this.props.editable ? classes.child : null}
      >

        <Grid item xs={12}>
          <img width="100%" height="auto" alt={node.url} src={node.url} />
        </Grid>

        <div className={classes.tool}>
          <Grid container spacing={2} justify="center">
            {this.props.editable ? <Grid item>
              <ImageBar
                defaultData={node}
                onChange={this.onChange}
                onDelete={this.onDelete}
              />
            </Grid> : null}
          </Grid>
        </div>

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