import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import { withStyles } from '@material-ui/core/styles';

import { PortraitCard } from 'components/cards';

import styles from './styles';

const CircularSwipeableViews = virtualize(SwipeableViews);

class CarouselSlide extends Component {

  renderCircular = (params) => {
    let obj = this.props.objects[mod(params.index, this.props.objects.length)];
    return <PortraitCard
      key={params.key}
      title={obj.displayname}
      image={obj.avatar}
      content={obj.content}
      disabled={this.props.index !== params.index}
    />
  }

  render() {
    let { classes } = this.props;
    return <CircularSwipeableViews
      resistance
      ignoreNativeScroll
      enableMouseEvents
      disableLazyLoading
      className={classes.root}
      slideClassName={classes.slide}
      index={this.props.index}
      onChangeIndex={this.props.onChange}
      overscanSlideAfter={1}
      overscanSlideBefore={1}
      slideRenderer={this.renderCircular}
    />
  }
}

CarouselSlide.defaultProps = {
  index: 0,
  onChange: () => { },
}

CarouselSlide.propTypes = {
  objects: PropTypes.array.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func,
}

export default withStyles(styles)(CarouselSlide);