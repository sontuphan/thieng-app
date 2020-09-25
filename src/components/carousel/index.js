import React, { useRef } from 'react';
import { Swiper, SwiperSlide as CarouselChild } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper'
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';
import { useData } from './module';

/**
 * Config Swiper
 */
SwiperCore.use([Pagination]);


/**
 * CarouselChild
 * @param {*} props 
 */
export { CarouselChild };

/**
 * Carousel
 * @param {*} props 
 */
function Carousel(props) {
  const swiperRef = useRef();
  const { width } = useData(swiperRef);
  const theme = useTheme();
  const classes = useStyles();

  // Compute the number of slides per view
  const { childWidth: [minChildWidth, maxChildWidth], spacing } = props;
  let slidesPerView = 1;
  if (props.slidesPerView) slidesPerView = props.slidesPerView;
  else slidesPerView = Math.floor(width / ((minChildWidth + maxChildWidth) / 2 + spacing));
  // Compute pagination
  const { pagination } = props;
  const paginationProps = pagination ? {
    pagination: { bulletActiveClass: classes.bullet, clickable: true }
  } : null;
  // Compute the number of slides per group and freeMode
  let { slidesPerGroup } = props;
  const freeMode = !slidesPerGroup ? true : false;
  slidesPerGroup = Math.max(1, slidesPerGroup);
  // onChange
  const { onChange } = props;
  const onSlideChange = e => {
    return onchange(e.activeIndex)
  }
  // Other props
  const { autoplay } = props;

  // Total props
  const swiperProps = {
    // Layout
    slidesPerView,
    spaceBetween: spacing,
    // Parameters
    speed: theme.transitions.duration.standard,
    freeMode,
    slidesPerGroup,
    // Events
    onSlideChange,
    // Components
    autoplay,
    ...paginationProps,
  }
  console.log(swiperProps)

  return <Grid container spacing={2}>
    <Grid item xs={12} ref={swiperRef}>
      <Swiper {...swiperProps} >
        {props.children}
      </Swiper>
    </Grid>
  </Grid>
}

Carousel.defaultProps = {
  pagination: false,
  autoplay: false,
  centerMode: false,
  slidesPerGroup: 0, // Default: 0 - freely scroll
  slidesPerView: 0,
  spacing: 16,
  childWidth: [250, 300], // [min, max]
  onChange: () => { },
}

Carousel.propTypes = {
  pagination: PropTypes.bool,
  autoplay: PropTypes.bool,
  centerMode: PropTypes.bool,
  slidesPerGroup: PropTypes.number,
  slidesPerView: PropTypes.number,
  spacing: PropTypes.number,
  childWidth: PropTypes.array,
  onChange: PropTypes.func,
}

export default Carousel;