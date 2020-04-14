import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import { AddRounded } from '@material-ui/icons';

import styles from './styles';


class Root extends Component {

  onAdd = () => {
    this.props.tree.addContainer(
      this.props.id,
    );
    this.props.onChange(this.props.tree);
  }

  render() {
    let { classes } = this.props;
    return <Grid
      container
      spacing={2}
      className={this.props.editable ? classes.container : null}
      id={this.props.id}
    >
      {this.props.children}

      <Grid item xs={12}>
        <Grid container spacing={2} justify="flex-end">
          {this.props.editable ? <Grid item>

            <Paper className={classes.paper} elevation={8}>
              <Grid container spacing={1}>
                <Grid item>
                  <IconButton size="small" onClick={this.onAdd}>
                    <AddRounded fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>

          </Grid> : null}
        </Grid>
      </Grid>

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