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

  const { childWidth: [minChildWidth, maxChildWidth], spacing } = props;
  let slidesPerView = 1;
  if (props.slidesPerView) slidesPerView = props.slidesPerView;
  else slidesPerView = Math.floor(width / ((minChildWidth + maxChildWidth) / 2 + spacing));

  const swiperProps = {
    // Layout
    slidesPerView,
    spaceBetween: spacing,
    // Parameters
    speed: theme.transitions.duration.standard,
    // Events
    onSlideChange: (e) => {
      console.log(e.activeIndex)
    },
    // Components
    autoplay: props.autoplay,
    pagination: {
      bulletActiveClass: classes.bullet,
      clickable: true
    }
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} ref={swiperRef}>
      <Swiper {...swiperProps} >
        {props.children}
        <div className="swiper-pagination">asd</div>
      </Swiper>
    </Grid>
  </Grid>
}

Carousel.defaultProps = {
  arrows: false,
  autoplay: false,
  centerMode: false,
  slidesToScroll: 0, // Default: 0 - freely scroll
  slidesPerView: 0,
  spacing: 16,
  childWidth: [250, 300], // [min, max]
}

Carousel.propTypes = {
  arrows: PropTypes.bool,
  autoplay: PropTypes.bool,
  centerMode: PropTypes.bool,
  slidesToScroll: PropTypes.number,
  slidesPerView: PropTypes.number,
  spacing: PropTypes.number,
  childWidth: PropTypes.array,
}

export default Carousel;