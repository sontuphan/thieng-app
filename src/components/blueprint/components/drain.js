import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { DrainBar } from '../toolbars';

import styles from './styles';

class Drain extends Component {

  onChange = (data) => {
    console.log(data)
    this.props.tree.editDrain(
      this.props.id,
      data.height,
    );
    this.props.onChange(this.props.tree);
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
        id={this.props.id}
        className={this.props.editable ? classes.child : null}
      >
        <Grid
          item
          xs={12}
          style={{ height: node.height }}
          className={this.props.editable ? classes.accessibleDrain : null}
        />

        <div className={classes.tool}>
          <Grid container spacing={2} justify="center">
            {this.props.editable ? <Grid item>
              <DrainBar
                value={node}
                onChange={this.onChange}
                onDelete={this.onDelete}
              />
            </Grid> : null}
          </Grid>
        </div>

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