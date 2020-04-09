import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { AddRounded } from '@material-ui/icons';

import { ContainerTool } from '../toolbox';

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
    this.props.tree.addContainer(
      this.props.id,
      data.width,
      data.justify,
      data.alignItems,
    );
    this.props.onChange(this.props.tree);
    this.setState({ visible: false });
  }

  render() {
    let { classes } = this.props;
    return <Grid
      container
      spacing={2}
      className={classes.container}
      id={this.props.id}
    >
      {this.props.children}
      {this.props.editable ? <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <IconButton
              size="small"
              onClick={this.onAdd}
            >
              <AddRounded fontSize="small" />
            </IconButton>
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
  onChange: () => { },
  editable: false,
}

Root.propTypes = {
  id: PropTypes.string.isRequired,
  tree: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
}

export default withStyles(styles)(Root);