import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Root from './components/root';
import Container from './components/container';
import Text from './components/text';
import Image from './components/image';
import Drain from './components/drain';

import styles from './components/styles';

class Render extends Component {

  renderChild = (id) => {
    const node = this.props.tree.getNode(id);

    if (node.type === 'root') {
      return <Root
        id={id}
        tree={this.props.tree}
        onChange={this.props.onChange}
        editable={this.props.editable}
      >
        {this.renderChildren(node.children)}
      </Root>
    }
    if (node.type === 'container') {
      return <Container
        id={id}
        tree={this.props.tree}
        onChange={this.props.onChange}
        editable={this.props.editable}
      >
        {this.renderChildren(node.children)}
      </Container>
    }
    if (node.type === 'image') {
      return <Image
        id={id}
        tree={this.props.tree}
        onChange={this.props.onChange}
        editable={this.props.editable}
      />
    }
    if (node.type === 'video') {

    }
    if (node.type === 'text') {
      return <Text
        id={id}
        tree={this.props.tree}
        onChange={this.props.onChange}
        editable={this.props.editable}
      />
    }
    if (node.type === 'drain') {
      return <Drain
        id={id}
        tree={this.props.tree}
        onChange={this.props.onChange}
        editable={this.props.editable}
      />
    }
  }

  renderChildren = (nodes) => {
    return nodes.map((node, index) => <Fragment key={index}>
      {this.renderChild(node)}
    </Fragment>
    );
  }

  renderTree = () => {
    const rootId = this.props.tree.getRootId();
    return this.renderChild(rootId);
  }

  render() {
    return <Grid container spacing={2}>
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
  tree: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
}

export default withStyles(styles)(Render);