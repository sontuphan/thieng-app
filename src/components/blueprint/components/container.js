import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ContainerBar } from '../toolbars';
import { ContainerTool } from '../toolbox';

import styles from './styles';


class Container extends Component {
  constructor() {
    super();

    this.state = {
      visibleEdit: false,
      anchorEl: null,
    }
  }

  /**
   * Add
   */

  // Add a subcontainer by default
  onAddContainer = () => {
    this.props.tree.addContainer(this.props.id);
    this.props.onChange(this.props.tree);
  }
  // Add an image by default
  onAddImage = () => {
    this.props.tree.addImage(this.props.id);
    this.props.onChange(this.props.tree);
  }
  // Add a video by default
  onAddVideo = () => {

  }
  // Add text by default
  onAddText = () => {
    this.props.tree.addText(this.props.id);
    this.props.onChange(this.props.tree);
  }
  // Add a drain by default
  onAddDrain = (e) => {
    this.props.tree.addDrain(this.props.id);
    this.props.onChange(this.props.tree);
  }

  /**
   * Edit
   */
  onEdit = (e) => {
    return this.setState({
      visibleEdit: !this.state.visibleEdit,
      anchorEl: e.currentTarget,
    });
  }
  onEditOk = (data) => {
    this.props.tree.editContainer(
      this.props.id,
      data.width,
      data.justify,
      data.alignItems,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visibleEdit: false });
  }

  /**
   * Delete
   */
  onDelete = () => {
    this.props.tree.deleteContainer(this.props.id);
    this.props.onChange(this.props.tree);
  }

  render() {
    let { classes } = this.props;
    let node = this.props.tree.getNode(this.props.id);
    return <Grid item xs={node.width}>
      <Grid
        container
        justify={node.justify}
        alignItems={node.alignItems}
        spacing={2}
        className={this.props.editable ? classes.container : null}
        id={this.props.id}
      >
        {this.props.children}

        <Grid item xs={12}>
          <Grid container spacing={2} justify="center">
            {this.props.editable ? <Grid item>
              <ContainerBar
                onDelete={this.onDelete}
                onEdit={this.onEdit}
                onAddContainer={this.onAddContainer}
                onAddImage={this.onAddImage}
                onAddVideo={this.onAddVideo}
                onAddText={this.onAddText}
                onAddDrain={this.onAddDrain}
              />
              <ContainerTool
                defaultData={node}
                visible={this.state.visibleEdit}
                anchorEl={this.state.anchorEl}
                onChange={this.onEditOk}
                onClose={this.onEdit}
              />
            </Grid> : null}

          </Grid>
        </Grid>

      </Grid>
    </Grid>
  }
}

Container.defaultProps = {
  onChange: () => { },
  editable: false,
}

Container.propTypes = {
  id: PropTypes.string.isRequired,
  tree: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
}

export default withStyles(styles)(Container);