import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';

import styles from './styles';

const FirstContent = `
  Theo Thiền Chánh Niệm, muôn loài đều mang hơi thở. Sống 
  gần thiên nhiên giúp ta điều hoà tinh thần và cảm nhận 
  lòng hướng thiện trong bản thân. Thế nhưng, cuộc sống 
  bộn bề có khiến ta bỏ quên mình, thiếu kiên nhẫn để 
  "giao tiếp" cùng vạn vật sinh?
`
const SecondContent= `
  Cầm một chiếc thìa, uống một cốc nước, hoàn thành việc 
  văn phòng hay trang trí nội thất, giờ đây bạn đều có 
  thể hoà cùng thiên nhiên với sản phẩm tre Thiêng Việt. 
  Mang phong vị thôn dã, từng lựa chọn tại Thiêng Việt 
  sẽ cùng ta sống gần thiên nhiên - bình yên tự tại.
`

class Policy extends Component {
  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={10} md={8}>
        <Typography variant="h1">Phong cách</Typography>
      </Grid>
      <Grid item xs={10} md={8}>
        <Typography variant="h6">{FirstContent}</Typography>
      </Grid>
      <Grid item xs={10} md={8}>
        <Typography variant="h6">{SecondContent}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Drain />
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
)(withStyles(styles)(Policy)));