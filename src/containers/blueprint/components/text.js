import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { EditRounded, DeleteRounded, } from '@material-ui/icons';

import { TextTool } from '../toolbox';

import styles from './styles';
import { Typography } from '@material-ui/core';


class Text extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      anchorEl: null,
    }
  }

  onEdit = (e) => {
    return this.setState({
      visible: !this.state.visible,
      anchorEl: e.currentTarget,
    });
  }

  onOk = (data) => {
    this.props.tree.editText(
      this.props.id,
      data.variant,
      data.content,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visible: false });
  }

  onDelete = () => {
    this.props.tree.deleteText(this.props.id);
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
          <Typography variant={node.variant}>{node.content}</Typography>
        </Grid>
        {this.props.editable ? <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <IconButton
                size="small"
                onClick={this.onEdit}
              >
                <EditRounded fontSize="small" />
              </IconButton>
              <TextTool
                defaultData={node}
                visible={this.state.visible}
                anchorEl={this.state.anchorEl}
                onChange={this.onOk}
                onClose={this.onEdit}
              />
            </Grid>
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

Text.defaultProps = {
  onChange: () => { },
  editable: false,
}

Text.propTypes = {
  id: PropTypes.string.isRequired,
  tree: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
}

export default withStyles(styles)(Text);