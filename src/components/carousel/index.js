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
        paging: { page: 0, total: props.objects.length },
      },
      slide: {
        objs: props.objects,
        direction: 'left'
      }
    }
  }

  onNext = () => {
    let { slide, pagination } = this.state;
    // Update slide
    let objs = JSON.parse(JSON.stringify(slide.objs));
    let firstObj = objs.shift();
    objs.push(firstObj);
    slide.objs = objs;
    slide.direction = 'left';
    // Update pagination
    pagination.paging.page = (pagination.paging.page + 1) % pagination.paging.total;
    this.setState({ slide, pagination });
  }

  onBack = () => {
    let { slide, pagination } = this.state;
    // Update slide
    let objs = JSON.parse(JSON.stringify(slide.objs));
    let lastObj = objs.pop();
    objs.unshift(lastObj);
    slide.objs = objs;
    slide.direction = 'right';
    // Update pagination
    pagination.paging.page = (pagination.paging.page - 1 + pagination.paging.total) % pagination.paging.total;
    this.setState({ slide, pagination });
  }

  onMore = () => {
    console.log('onMore');
  }


  render() {
    return <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <CarouselPagination {...this.state.pagination} onNext={this.onNext} onBack={this.onBack} onMore={this.onMore} />
      </Grid>
      <Grid item xs={8}>
        <CarouselSlide {...this.state.slide} onNext={this.onNext} onBack={this.onBack} />
      </Grid>
    </Grid>
  }
}

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
}

export default withStyles(styles)(Carousel);