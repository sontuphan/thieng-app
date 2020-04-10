import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { HeightRounded, DeleteRounded } from '@material-ui/icons';

import { DrainTool } from '../toolbox';

import styles from './styles';

class Drain extends Component {
  constructor() {
    super();

    this.state = {
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

  onEditOk = (data) => {
    this.props.tree.editDrain(
      this.props.id,
      data.height,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visibleEdit: false });
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
        <Grid item xs={12} style={{ height: node.height }} />
        {this.props.editable ? <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <IconButton size="small" onClick={this.onEdit}>
                <HeightRounded fontSize="small" />
              </IconButton>
              <DrainTool
                defaultData={node}
                visible={this.state.visibleEdit}
                anchorEl={this.state.anchorEl}
                onChange={this.onEditOk}
                onClose={this.onEdit}
              />
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

Drain.defaultProps = {
  onChange: () => { },
  editable: false,
}

Drain.propTypes = {
  id: PropTypes.string.isRequired,
  tree: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
}

export default withStyles(styles)(Drain);