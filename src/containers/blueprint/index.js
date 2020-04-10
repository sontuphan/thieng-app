import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { VisibilityRounded, UndoRounded, RedoRounded, DeleteForeverRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import Render from './render';

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
      editable: true
    }
  }

  restart = () => {
    return this.setState({ restart: this.state.restart + 1 });
  }

  onChange = (tree) => {
    // Save history
    this.treeHistory.addHistory(tree);
    // Reload rendering
    this.restart();
  }

  onDelete = () => {
    this.treeHistory.clearHistory();
    this.tree = new Tree();
    // Reload rendering
    this.restart();
  }

  onUndo = () => {
    let root = this.treeHistory.undo();
    this.tree = new Tree(root);
    // Reload rendering
    this.restart();
  }

  onRedo = () => {
    let root = this.treeHistory.redo();
    this.tree = new Tree(root);
    // Reload rendering
    this.restart();
  }

  onPreview = () => {
    this.setState({ editable: !this.state.editable });
  }

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <IconButton size="small" onClick={this.onDelete} >
              <DeleteForeverRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={this.onUndo} >
              <UndoRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={this.onRedo} >
              <RedoRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.onPreview}
              startIcon={<VisibilityRounded />}
            >
              <Typography>Preview</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={10}>
        <Render
          tree={this.tree}
          editable={this.state.editable}
          onChange={this.onChange}
        />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Blueprint)));