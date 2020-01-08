import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CarouselPagination from './pagination';
import CarouselSlide from './slide';

import styles from './styles';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        title: props.title,
        subtitle: props.subtitle,
        pagination: props.pagination,
      },
      slide: {
        objs: [1, 2, 3]
      }
    }
  }
  render() {
    return <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <CarouselPagination {...this.state.pagination} />
      </Grid>
      <Grid item xs={8}>
        <CarouselSlide {...this.state.slide} />
      </Grid>
    </Grid>
  }
}

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  pagination: PropTypes.object.isRequired
}

export default withStyles(styles)(Carousel);