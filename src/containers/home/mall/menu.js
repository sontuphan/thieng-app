import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import Carousel, { CarouselChild } from 'components/carousel';

import configs from 'configs';
import styles from './styles';


class Menu extends Component {

  render() {
    // const { classes } = this.props;
    const { match: { params: { category } } } = this.props;
    const { category: { fullList } } = configs;

    return <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" noWrap>Sản phẩm</Typography>
      </Grid>
      <Grid item xs={12}>
        <Carousel spaceBetween={16} freeMode >
          {fullList.map((item, i) => <CarouselChild key={i}>
            <Chip
              icon={item.icon}
              color={category === item.value ? 'primary' : 'default'}
              component={RouterLink}
              to={'/home/' + item.value}
              label={item.name}
            />
          </CarouselChild>)}
        </Carousel>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Menu)));