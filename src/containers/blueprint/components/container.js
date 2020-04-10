import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import {
  EditRounded, DeleteRounded,
  CheckBoxOutlineBlankRounded, CalendarViewDayRounded,
  VideoCallRounded, TextFieldsRounded, AddPhotoAlternateRounded,
} from '@material-ui/icons';

import { ContainerTool, TextTool, DrainTool } from '../toolbox';

import styles from './styles';


class Container extends Component {
  constructor() {
    super();

    this.state = {
      visibleAddContainer: false,
      visibleAddVideo: false,
      visibleAddText: false,
      visibleAddDrain: false,
      visibleEdit: false,
      anchorEl: null,
    }
  }

  /**
   * Add
   */

  // Container
  onAddContainer = (e) => {
    return this.setState({
      visibleAddContainer: !this.state.visibleAddContainer,
      anchorEl: e.currentTarget,
    });
  }
  onAddContainerOk = (data) => {
    this.props.tree.addContainer(
      this.props.id,
      data.width,
      data.justify,
      data.alignItems,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visibleAddContainer: false });
  }

  // Image
  onAddImage = (e) => {
    this.props.tree.addImage(
      this.props.id,
      'https://source.unsplash.com/random/',
    );
    this.props.onChange(this.props.tree);
  }

  // Video
  onAddVideo = (e) => {
    return this.setState({
      visibleAddVideo: !this.state.visibleAddVideo,
      anchorEl: e.currentTarget,
    });
  }

  // Text
  onAddText = (e) => {
    return this.setState({
      visibleAddText: !this.state.visibleAddText,
      anchorEl: e.currentTarget,
    });
  }
  onAddTextOk = (data) => {
    this.props.tree.addText(
      this.props.id,
      data.variant,
      data.align,
      data.content,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visibleAddText: false });
  }

  //Drain
  onAddDrain = (e) => {
    return this.setState({
      visibleAddDrain: !this.state.visibleAddDrain,
      anchorEl: e.currentTarget,
    });
  }
  onAddDrainOk = (data) => {
    this.props.tree.addDrain(
      this.props.id,
      data.height,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visibleAddDrain: false });
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
        {this.props.editable ? <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>

            {/* Edit button */}
            <Grid item>
              <IconButton
                size="small"
                onClick={this.onEdit}
              >
                <EditRounded fontSize="small" />
              </IconButton>
              <ContainerTool
                defaultData={node}
                visible={this.state.visibleEdit}
                anchorEl={this.state.anchorEl}
                onChange={this.onEditOk}
                onClose={this.onEdit}
              />
            </Grid>

            {/* Add button */}
            <Grid item>
              <IconButton size="small" onClick={this.onAddContainer}>
                <CheckBoxOutlineBlankRounded fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={this.onAddImage}>
                <AddPhotoAlternateRounded fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={this.onAddVideo} disabled>
                <VideoCallRounded fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={this.onAddText}>
                <TextFieldsRounded fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={this.onAddDrain}>
                <CalendarViewDayRounded fontSize="small" />
              </IconButton>
              <ContainerTool
                defaultData={node}
                visible={this.state.visibleAddContainer}
                anchorEl={this.state.anchorEl}
                onChange={this.onAddContainerOk}
                onClose={this.onAddContainer}
              />
              <TextTool
                defaultData={node}
                visible={this.state.visibleAddText}
                anchorEl={this.state.anchorEl}
                onChange={this.onAddTextOk}
                onClose={this.onAddText}
              />
              <DrainTool
                defaultData={node}
                visible={this.state.visibleAddDrain}
                anchorEl={this.state.anchorEl}
                onChange={this.onAddDrainOk}
                onClose={this.onAddDrain}
              />
            </Grid>

            {/* Delete button */}
            <Grid item>
              <IconButton
                size="small"
                onClick={this.onDelete}
              >
                <DeleteRounded fontSize="small" />
              </IconButton>
            </Grid>

          </Grid>
        </Grid> : null}
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