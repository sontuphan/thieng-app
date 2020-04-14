import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { TextInput } from 'components/inputs';
import { TextBar } from '../toolbars';

import styles from './styles';


class Text extends Component {

  onType = (contents) => {
    let node = this.props.tree.getNode(this.props.id);
    this.props.tree.editText(
      this.props.id,
      node.variant,
      node.align,
      contents,
    );
    this.props.onChange(this.props.tree);
  }

  onChange = (data) => {
    this.props.tree.editText(
      this.props.id,
      data.variant,
      data.align,
      data.contents,
    );
    this.props.onChange(this.props.tree);
  }

  onDelete = () => {
    this.props.tree.deleteText(this.props.id);
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

        <Grid item xs={12}>
          <TextInput
            value={node.contents}
            variant={node.variant}
            align={node.align}
            onChange={this.onType}
          />
        </Grid>

        <div className={classes.tool}>
          <Grid container spacing={2} justify="center">
            {this.props.editable ? <Grid item>
              <TextBar
                defaultData={node}
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

Text.defaultProps = {
  onChange: () => { },
  editable: false,
}

Text.propTypes = {
  id: PropTypes.string.isRequired,
  tree: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  editable: PropTypes.bool,
}

export default withStyles(styles)(Text);