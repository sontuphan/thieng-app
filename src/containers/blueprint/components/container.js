import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { EditRounded, AddRounded, DeleteRounded } from '@material-ui/icons';

import { ContainerTool } from '../toolbox';

import styles from './styles';


class Container extends Component {
  constructor() {
    super();

    this.state = {
      visibleAdd: false,
      visibleEdit: false,
      anchorEl: null,
    }
  }

  /**
   * Add
   */
  onAdd = (e) => {
    return this.setState({
      visibleAdd: !this.state.visibleAdd,
      anchorEl: e.currentTarget,
    });
  }
  onAddOk = (data) => {
    this.props.tree.addContainer(
      this.props.id,
      data.width,
      data.justify,
      data.alignItems,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visibleAdd: false });
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
    console.log(this.props.tree)
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
        className={classes.container}
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
                visible={this.state.visibleEdit}
                anchorEl={this.state.anchorEl}
                onChange={this.onEditOk}
                onClose={this.onEdit}
              />
            </Grid>

            {/* Add button */}
            <Grid item>
              <IconButton
                size="small"
                onClick={this.onAdd}
              >
                <AddRounded fontSize="small" />
              </IconButton>
              <ContainerTool
                visible={this.state.visibleAdd}
                anchorEl={this.state.anchorEl}
                onChange={this.onAddOk}
                onClose={this.onAdd}
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