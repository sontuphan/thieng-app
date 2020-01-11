import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ArrowForwardIos } from '@material-ui/icons';

import Drain from 'components/drain';
import Carousel from 'components/carousel';

import styles from './styles';
import interiorImg1 from 'static/images/interior-1.jpg';
import interiorImg2 from 'static/images/interior-2.jpg';

const OBJECTS = [
  {
    displayname: 'Mirror',
    avatar: interiorImg1,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'product',
        key: 'Đã bán',
        value: 35
      }
    ]
  },
  {
    displayname: 'Lamp',
    avatar: interiorImg2,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'product',
        key: 'Đã bán',
        value: 35
      }
    ]
  },
]
class Policy extends Component {
  render() {
    return <Fragment>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Chính sách</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis vel consectetur amet, felis. Ullamcorper est lectus faucibus augue feugiat maecenas sed id. Ornare sit egestas eget luctus aenean malesuada a. Feugiat gravida aenean quam ante purus erat interdum orci. Et vel ut sit ut tristique. In vel fusce suspendisse sit enim aliquam.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet turpis sed gravida amet. Luctus sed parturient lacus vestibulum nisl neque. Vehicula risus tellus viverra cursus et. Porta arcu tincidunt enim ut platea in amet, at. Aliquet risus sem arcu pretium rutrum. Sit enim nec viverra sapien semper imperdiet. A cursus.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Button variant="outlined" color="primary" size="large" endIcon={<ArrowForwardIos />}>
              <Typography>Nhiều hơn</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Carousel
          title="Top 10"
          subtitle="Sản phẩm"
          objects={OBJECTS}
        />
        <Drain />
      </Grid>
    </Fragment >
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Policy)));