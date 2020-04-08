import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { EditRounded, AddRounded } from '@material-ui/icons';

import { ContainerTool } from './tool';

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

  onEdit = (e) => {
    return this.setState({
      visibleEdit: !this.state.visibleEdit,
      anchorEl: e.currentTarget,
    });
  }

  onAdd = (e) => {
    return this.setState({
      visibleAdd: !this.state.visibleAdd,
      anchorEl: e.currentTarget,
    });
  }

  onEditOk = (data) => {
    console.log(data)
    // this.props.onAdd({
    //   parentId: this.props.data.id,
    //   type: 'container',
    //   width: data.width,
    //   justify: data.justify,
    //   alignItems: data.alignItems,
    // });
    this.setState({ visibleEdit: false });
  }

  onAddOk = (data) => {
    console.log(data)
    // this.props.onAdd({
    //   parentId: this.props.data.id,
    //   type: 'container',
    //   width: data.width,
    //   justify: data.justify,
    //   alignItems: data.alignItems,
    // });
    this.setState({ visibleAdd: false });
  }

  render() {
    let { classes } = this.props;
    return <Grid
      container
      spacing={2}
      className={classes.container}
      id={this.props.data.id}
    >
      <Grid item xs={12}>
        {this.props.children}
      </Grid>
      {this.props.editable ? <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <IconButton size="small" onClick={this.onEdit}>
              <EditRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={this.onAdd}>
              <AddRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <ContainerTool
              visible={this.state.visibleEdit}
              anchorEl={this.state.anchorEl}
              onChange={this.onEditOk}
              onClose={this.onEdit}
            />
          </Grid>
        </Grid>
      </Grid> : null}
    </Grid>
  }
}

Container.defaultProps = {
  editable: false,
  onAdd: () => { },
  onEdit: () => { },
}

Container.propTypes = {
  editable: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
}

export default withStyles(styles)(Container);