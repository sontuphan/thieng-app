import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import { ExpandMore, ChevronRight } from '@material-ui/icons';


import styles from './components/styles';
import utils from 'helpers/utils';


class Cascade extends Component {

  renderItem = (id) => {
    let node = this.props.root[id];
    return <TreeItem key={id} nodeId={id} label={utils.capitalizeFirstLetter(node.type)}>
      {node.children ? node.children.map(childId => this.renderItem(childId)) : null}
    </TreeItem>
  }

  render() {
    let rootId = null;
    for (let id in this.props.root) {
      let node = this.props.root[id];
      if (node.type === 'root') {
        rootId = id;
        break;
      }
    }

    if (!rootId) return null;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
        >
          {this.renderItem(rootId)}
        </TreeView>
      </Grid>
    </Grid>
  }
}

Cascade.defaultProps = {
  root: {},
}

Cascade.propTypes = {
  root: PropTypes.object,
}

export default withStyles(styles)(Cascade);