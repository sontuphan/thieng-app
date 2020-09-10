import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';

import styles from './styles';
import branch from 'static/images/brand.png';

const FirstContent = `
  Theo Thiền Chánh Niệm, muôn loài đều mang hơi thở. Sống 
  gần thiên nhiên giúp ta điều hoà tinh thần và cảm nhận 
  lòng hướng thiện trong bản thân. Thế nhưng, cuộc sống 
  bộn bề có khiến ta bỏ quên mình, thiếu kiên nhẫn để 
  "giao tiếp" cùng vạn vật sinh?
`
const SecondContent = `
  Cầm một chiếc thìa, uống một cốc nước, hoàn thành việc 
  văn phòng hay trang trí nội thất, giờ đây bạn đều có 
  thể hoà cùng thiên nhiên với sản phẩm tre Thiêng Việt. 
  Mang phong vị thôn dã, từng lựa chọn tại Thiêng Việt 
  sẽ cùng ta sống gần thiên nhiên - bình yên tự tại.
`

class Policy extends Component {
  render() {
    const { ui: { type } } = this.props;

    return <Grid
      container
      spacing={2}
      alignItems="center"
      justify={type === 'xs' ? "center" : "space-between"}
    >
      <Grid item xs={8} sm={4}>
        <Image src={branch} aspectRatio={2000 / 2892} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Typography variant="h1">Phong cách</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">{FirstContent}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">{SecondContent}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain large />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Policy)));