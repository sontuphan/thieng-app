import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { AddRounded } from '@material-ui/icons';

import { ContainerTool } from './tool';

import styles from './styles';


class Root extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      anchorEl: null,
    }
  }

  onAdd = (e) => {
    return this.setState({
      visible: !this.state.visible,
      anchorEl: e.currentTarget,
    });
  }

  onOk = (data) => {
    this.props.onAdd({
      parentId: this.props.data.id,
      type: 'container',
      width: data.width,
      justify: data.justify,
      alignItems: data.alignItems,
    });
    this.setState({ visible: false });
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
            <IconButton size="small" onClick={this.onAdd}>
              <AddRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <ContainerTool
              visible={this.state.visible}
              anchorEl={this.state.anchorEl}
              onChange={this.onOk}
              onClose={this.onAdd}
            />
          </Grid>
        </Grid>
      </Grid> : null}
    </Grid>
  }
}

Root.defaultProps = {
  editable: false,
  onAdd: () => { },
}

Root.propTypes = {
  editable: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
}

export default withStyles(styles)(Root);