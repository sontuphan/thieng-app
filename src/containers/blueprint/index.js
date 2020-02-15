import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CropFree, TextFields, Image, VideoLibrary } from '@material-ui/icons';

import Drain from 'components/drain';

import styles from './styles';

const DEFAULT_CONTAINER = {
  type: 'container',
  width: 12,
  justify: 'flex-start',
  alignItems: 'flex-start',
  items: []
}

const DEFAULT_IMAGE = {
  type: 'image',
  width: 12,
  url: null,
}

const DEFAULT_TEXT = {
  type: 'text',
  width: 12,
  contents: null,
  font: {
    fontSize: 13,
    fontWeight: 400,
    fontFamily: ['"Open Sans"', 'sans-serif'],
    textAlign: 'start',
  }
}


class BluePrint extends Component {
  constructor() {
    super();

    this.state = {
      root: {
        id: null,
        item: null,
        status: null,
        thumbnail: null,
        render: {
          ...DEFAULT_CONTAINER
        }
      }
    }
  }

  renderItem = (item, key) => {
    let { classes } = this.props;

    if (item.type === 'container') {
      return this.renderContainer(item, key);
    }
    if (item.type === 'text') {
      return <Grid key={key} item xs={item.width}>
        <p style={{ ...item.font }}>{item.contents}</p>
      </Grid>
    }
    if (item.type === 'image') {
      return <Grid key={key} item xs={item.width}>
        <img className={classes.img} alt={item.url} src={item.url} />
      </Grid>
    }
    if (item.type === 'video') {

    }
  }

  renderContainer = (container, key) => {
    let { classes } = this.props;

    return <Grid key={key} item xs={container.width} className={classes.border}>
      <Grid
        container
        justify={container.justify}
        alignItems={container.alignItems}
        spacing={2} >
        {container.items.map(this.renderItem)}
        {this.renderMenu()}
      </Grid>
    </Grid>
  }

  renderMenu = () => {
    return <Grid item xs={12}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Tooltip title="Add container">
            <Fab color="primary" size="small"><CropFree /></Fab>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Add text">
            <Fab color="primary" size="small"><TextFields /></Fab>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Add image">
            <Fab color="primary" size="small"><Image /></Fab>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Add video">
            <Fab color="primary" size="small"><VideoLibrary /></Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  }

  render() {
    return <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          {this.renderContainer(this.state.root.render, 0)}
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BluePrint)));