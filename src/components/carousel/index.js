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
    this.setState({ page: this.state.page + 1 });
  }

  onBack = () => {
    this.setState({ page: this.state.page - 1 });
  }

  onChange = (index) => {
    this.setState({ page: index });
  }

  render() {
    const { title, subtitle, objects } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={4}>
        <CarouselPagination {...this.state.pagination}
          title={title}
          subtitle={subtitle}
          paging={{
            page: (this.state.page % objects.length + objects.length) % objects.length,
            total: objects.length
          }}
          onBack={this.onBack}
          onNext={this.onNext}
          onMore={this.props.onMore}
        />
      </Grid>
      <Grid item xs={8}>
        <CarouselSlide
          objects={objects}
          index={this.state.page}
          onChange={this.onChange}
        />
      </Grid>
    </Grid>
  }
}

Carousel.defaultProps = {
  onMore: () => { },
}

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  onMore: PropTypes.func,
}

export default withStyles(styles)(Carousel);