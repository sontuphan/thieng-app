import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Root from './root';
import Container from './container';

import styles from './styles';
import Tree from './tree';


class Blueprint extends Component {
  constructor() {
    super();

    this.tree = new Tree();
    this.rootId = this.getRootId();
  }

  getRootId = () => {
    for (let id in this.tree.root) {
      let node = this.tree.root[id];
      if (node.type === 'root') return id;
    }
  }

  Container = (props) => {
    return <Grid item xs={props.data.width}>
      <Grid container justify={props.data.justify} alignItems={props.data.alignItems} spacing={2}>
        {props.children}
      </Grid>
    </Grid>
  }

  onAddContainer = (data) => {
    this.tree.addContainer(
      data.parentId,
      data.width,
      data.justify,
      data.alignItems,
    );
    console.log(this.tree.root)
  }

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={10}>
        <Root
          data={{ id: this.rootId }}
          onAdd={this.onAddContainer}
          editable
        >
          <Container
            data={{ width: 12, justify: 'center', alignItems: 'center' }}
            onAdd={this.onAddContainer}
            editable
          >

          </Container>
        </Root>
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