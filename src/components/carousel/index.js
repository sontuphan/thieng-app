import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CarouselPagination from './pagination';
import CarouselSlide from './slide';

import styles from './styles';
import designerImg1 from 'static/images/designer-1.jpg';
import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        title: props.title,
        subtitle: props.subtitle,
        paging: { page: 0, total: 3 },
      },
      slide: {
        objs: [
          {
            displayname: 'Maria Guys',
            avatar: designerImg1,
            noOfhearts: 2245,
            noOfProducts: 35
          },
          {
            displayname: 'Philip Martin',
            avatar: designerImg2,
            noOfhearts: 1234,
            noOfProducts: 186
          },
          {
            displayname: 'Aiony Haust',
            avatar: designerImg3,
            noOfhearts: 2345,
            noOfProducts: 65
          },
        ]
      }
    }
  }

  onNext = () => {
    let { slide, pagination } = this.state;
    // Update slide
    let objs = JSON.parse(JSON.stringify(slide.objs));
    let firstObj = objs.shift();
    objs.push(firstObj);
    slide.objs = objs
    // Update pagination
    pagination.paging.page = (pagination.paging.page + 1) % pagination.paging.total
    this.setState({ slide, pagination });
  }

  onBack = () => {
    let { slide, pagination } = this.state;
    // Update slide
    let objs = JSON.parse(JSON.stringify(slide.objs));
    let lastObj = objs.pop();
    objs.unshift(lastObj);
    slide.objs = objs
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
        <CarouselSlide {...this.state.slide} />
      </Grid>
    </Grid>
  }
}

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default withStyles(styles)(Carousel);