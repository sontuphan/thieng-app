import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { ImageRounded, DeleteRounded } from '@material-ui/icons';

import styles from './styles';
import { DEFAULT_IMAGE } from '../tree/constants';

const DEFAULT_DATA = {
  url: DEFAULT_IMAGE.url,
}


class ImageBar extends Component {
  constructor() {
    super();

    this.state = {
      ...DEFAULT_DATA,
    }
  }

  componentDidMount() {
    this.setState(this.props.defaultData);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.defaultData) !== JSON.stringify(this.props.defaultData)) {
      this.setState(this.props.defaultData);
    }
  }

  onUpload = () => {
    let e = document.getElementById('tree-upload-image');
    e.click();
  }

  onChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    return this.setState({ url }, () => {
      this.props.onChange(this.state);
    });
  }

  render() {
    let { classes } = this.props;
    return <Paper className={classes.paper}>
      <Grid container spacing={1}>
        <Grid item>
          <IconButton size="small" onClick={this.props.onDelete}>
            <DeleteRounded fontSize="small" />
          </IconButton>
        </Grid>

        <Grid item>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item>
          <input type="file" id="tree-upload-image" style={{ display: "none" }} onChange={this.onChange} />
          <IconButton size="small" onClick={this.onUpload}>
            <ImageRounded fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  }
}

ImageBar.defaultProps = {
  defaultData: { ...DEFAULT_DATA },
  onChange: () => { },
  onDelete: () => { },
}

ImageBar.propTypes = {
  defaultData: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
}

export default withStyles(styles)(ImageBar);