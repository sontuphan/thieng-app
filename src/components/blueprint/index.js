import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Render from './render';
import { MainBar } from './toolbars';

import styles from './components/styles';
import Tree from './tree';
import TreeHistory from './tree/history';


class Blueprint extends Component {
  constructor() {
    super();

    this.treeHistory = new TreeHistory();
    this.tree = new Tree(this.treeHistory.__getTreeRoot());

    this.state = {
      restart: 0,
      editable: true,
    }
  }

  componentDidMount() {
    this.props.onChange(this.tree.root);
  }

  restart = () => {
    return this.setState({ restart: this.state.restart + 1 });
  }

  onChange = (tree) => {
    // Save history
    this.treeHistory.addHistory(tree);
    // Return value
    this.props.onChange(tree.root);
    // Reload rendering
    this.restart();
  }

  onDelete = () => {
    this.treeHistory.clearHistory();
    this.tree = new Tree();
    // Return value
    this.props.onChange(this.tree.root);
    // Reload rendering
    this.restart();
  }

  onUndo = () => {
    let root = this.treeHistory.undo();
    this.tree = new Tree(root);
    // Return value
    this.props.onChange(this.tree.root);
    // Reload rendering
    this.restart();
  }

  onRedo = () => {
    let root = this.treeHistory.redo();
    this.tree = new Tree(root);
    // Return value
    this.props.onChange(this.tree.root);
    // Reload rendering
    this.restart();
  }

  onPreview = () => {
    this.setState({ editable: !this.state.editable });
  }

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item>
        <MainBar
          onDelete={this.onDelete}
          onUndo={this.onUndo}
          onRedo={this.onRedo}
          previewing={!this.state.editable}
          onPreview={this.onPreview}
        />
      </Grid>
      <Grid item xs={12}>
        <Render
          tree={this.tree}
          editable={this.state.editable}
          onChange={this.onChange}
        />
      </Grid>
    </Grid>
  }
}

Blueprint.defaultProps = {
  onChange: () => { },
}

Blueprint.propTypes = {
  onChange: PropTypes.func,
}

export default withStyles(styles)(Blueprint);