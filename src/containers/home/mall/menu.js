import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Carousel, { CarouselChild } from 'components/carousel';

import configs from 'configs';
import styles from './styles';


class Menu extends Component {

  render() {
    const { classes } = this.props;
    const { match: { params: { category } } } = this.props;
    const { category: { fullList } } = configs;

    return <Grid container spacing={2} className={classes.noWrap} alignItems="center">
      <Grid item >
        <Typography variant="h4" noWrap>Sản phẩm</Typography>
      </Grid>
      <Grid item className={classes.stretch}>
        <Carousel spaceBetween={16} slidesPerView={0} >
          {fullList.map((item, i) => <CarouselChild key={i}>
            <Button
              variant="outlined"
              color={category === item.value ? 'primary' : 'default'}
              startIcon={item.icon}
              component={RouterLink}
              to={'/home/' + item.value}
            >
              <Typography>{item.name}</Typography>
            </Button>
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