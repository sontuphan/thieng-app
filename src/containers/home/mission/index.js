import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import Carousel from 'components/carousel';

import styles from './styles';
import designerImg1 from 'static/images/designer-1.jpg';
import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';

const OBJECTS = [
  {
    displayname: 'Maria Guys',
    avatar: designerImg1,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'flower',
        key: 'Thiết kế',
        value: 35
      }
    ]
  },
  {
    displayname: 'Philip Martin',
    avatar: designerImg2,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'flower',
        key: 'Thiết kế',
        value: 35
      }
    ]
  },
  {
    displayname: 'Aiony Haust',
    avatar: designerImg3,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'flower',
        key: 'Thiết kế',
        value: 35
      }
    ]
  },
]

class Mission extends Component {
  render() {
    return <Fragment>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Sứ mệnh</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis vel consectetur amet, felis. Ullamcorper est lectus faucibus augue feugiat maecenas sed id. Ornare sit egestas eget luctus aenean malesuada a. Feugiat gravida aenean quam ante purus erat interdum orci. Et vel ut sit ut tristique. In vel fusce suspendisse sit enim aliquam.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet turpis sed gravida amet. Luctus sed parturient lacus vestibulum nisl neque. Vehicula risus tellus viverra cursus et. Porta arcu tincidunt enim ut platea in amet, at. Aliquet risus sem arcu pretium rutrum. Sit enim nec viverra sapien semper imperdiet. A cursus.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Carousel
          title="Top 10"
          subtitle="Nhà thiết kế"
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
)(withStyles(styles)(Mission)));