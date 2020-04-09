import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Root from './components/root';
import Container from './components/container';

import styles from './components/styles';
import Tree from './tree';


class Render extends Component {
  constructor() {
    super();

    this.tree = new Tree();
    this.state = {
      restart: 0
    }
  }

  onChange = (tree) => {
    console.log(this.tree.root);
    this.restart();
  }

  renderChild = (id) => {
    const node = this.tree.getNode(id);

    if (node.type === 'root') {
      return <Root
        id={id}
        tree={this.tree}
        onChange={this.onChange}
        editable={this.props.editable}
      >
        {this.renderChildren(node.children)}
      </Root>
    }
    if (node.type === 'container') {
      return <Container
        id={id}
        tree={this.tree}
        onChange={this.onChange}
        editable={this.props.editable}
      >
        {this.renderChildren(node.children)}
      </Container>
    }
    if (node.type === 'image') {

    }
    if (node.type === 'video') {

    }
    if (node.type === 'text') {

    }
    if (node.type === 'drain') {

    }
  }

  renderChildren = (nodes) => {
    return nodes.map((node, index) => <Fragment key={index}>
      {this.renderChild(node)}
    </Fragment>
    );
  }

  renderTree = () => {
    const rootId = this.tree.getRootId();
    return this.renderChild(rootId);
  }

  restart = () => {
    return this.setState({ restart: this.state.restart + 1 });
  }

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        {this.renderTree()}
      </Grid>
    </Grid>
  }
}

Render.defaultProps = {
  editable: false,
  onChange: () => { },
}

Render.propTypes = {
  editable: PropTypes.bool,
  onChange: PropTypes.func,
}

export default withStyles(styles)(Render);