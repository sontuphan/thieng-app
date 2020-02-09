import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

class Gallery extends Component {
  constructor() {
    super();

    this.state = {
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
    return <Grid key={key} item xs={container.width}>
      <Grid
        container
        justify={container.justify}
        alignItems={container.alignItems}
        spacing={2} >
        {container.items.map(this.renderItem)}
      </Grid>
    </Grid>
  }

  render() {
    let { project } = this.props;

    return <Grid container spacing={2}>
      {this.renderContainer(project.render, 0)}
    </Grid>
  }
}

Gallery.propTypes = {
  project: PropTypes.object.isRequired,
}

export default withStyles(styles)(Gallery);