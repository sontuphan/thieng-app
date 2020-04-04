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
      page: 0
    }
  }

  onNext = () => {
    this.setState({ page: this.state.page - 1 });
  }

  onBack = () => {
    this.setState({ page: this.state.page + 1 });
  }

  onMore = () => {
    console.log('onMore');
  }

  onChange = (index) => {
    this.setState({ page: index });
  }

  render() {
    return <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <CarouselPagination {...this.state.pagination}
          title={this.props.title}
          subtitle={this.props.subtitle}
          paging={{
            page: (this.state.page % this.props.objects.length + this.props.objects.length) % this.props.objects.length,
            total: this.props.objects.length
          }}
          onBack={this.onBack}
          onNext={this.onNext}
          onMore={this.onMore}
        />
      </Grid>
      <Grid item xs={8}>
        <CarouselSlide
          objects={this.props.objects}
          index={this.state.page}
          onChange={this.onChange}
        />
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