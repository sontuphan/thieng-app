import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { withStyles } from '@material-ui/core/styles';

import { PortraitCard } from 'components/cards';

import styles from './styles';

class CarouselSlide extends Component {
  constructor() {
    super();

    this.state = {
      animation: null
    }
  }

  slide = () => {
    let animation = ' animated slideInRight faster';
    if (this.props.direction === 'right')
      animation = ' animated slideInLeft faster';
    this.setState({ animation: animation }, () => {
      setTimeout(() => {
        this.setState({ animation: null });
      }, 500);
    });
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.objs[0]) !== JSON.stringify(prevProps.objs[0])) {
      this.slide()
    }
  }

  render() {
    let { classes } = this.props;
    return <SwipeableViews
      resistance
      ignoreNativeScroll
      enableMouseEvents
      disableLazyLoading
      className={classes.root}
      slideClassName={classes.slide}
    >
      {this.props.objs.map((obj, i) =>
        <PortraitCard
          key={i}
          title={obj.displayname}
          image={obj.avatar}
          content={obj.content}
        />)}
    </SwipeableViews >
  }
}

CarouselSlide.propTypes = {
  objs: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}

export default withStyles(styles)(CarouselSlide);