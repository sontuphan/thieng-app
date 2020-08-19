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

  renderCircular = (objects, params) => {
    const { index } = this.props;
    if (!objects || !objects.length)
      return <div key={params.key} />; // Prevent react-swipeable-view warning
    const obj = objects[mod(params.index, objects.length)];
    return <PortraitCard
      key={params.key}
      title={obj.displayname}
      image={obj.avatar}
      content={obj.content}
      disabled={index !== params.index}
    />
  }

  render() {
    const { classes } = this.props;
    const { index, objects, onChange } = this.props;
    return <CircularSwipeableViews
      resistance
      ignoreNativeScroll
      enableMouseEvents
      disableLazyLoading
      className={classes.root}
      slideClassName={classes.slide}
      index={index}
      onChangeIndex={onChange}
      overscanSlideAfter={1}
      overscanSlideBefore={1}
      slideRenderer={(params) => this.renderCircular(objects, params)}
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