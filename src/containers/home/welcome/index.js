import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Drain from 'components/drain';
import Divider from 'components/divider';

import styles from './styles';
import objectGLB from 'static/images/bamboo.glb';
import objectUSDZ from 'static/images/bamboo.usdz';

const contentOne = `
  - tự bao đời là biểu tượng cho hồn phách nước Việt. Từ ngàn xưa, 
  tre sống trong huyền thoại, phù vệ Thánh Gióng gìn giữ non sông. 
  Cây tre trăm đốt là hiện thân của chính nghĩa, chữ tín giúp chàng 
  trai nghèo nên duyên vợ chồng. Tre ôm ấp thôn làng, chứng kiến những 
  dấu mốc oai hùng và cả những nếp ngày đầm ấm.
`
const contentTwo = `
  Mạnh mẽ và uyển chuyển, "chất" tre ngày nay tiếp tục chảy trong 
  những vật dụng thân thuộc, bền theo thời gian và vững cho sức khoẻ. 
  Gìn giữ, phát triển sản phẩm từ tre nhằm lưu giữ hồn Việt, lan toả 
  phong cách sống an lành, lạc quan chính là ý nghĩa ẩn dưới thương 
  hiệu 
`

class Welcome extends Component {

  redirect = (to) => {
    this.props.history.push(to);
  }

  render() {
    const { classes } = this.props;

    return <Grid container spacing={2} justify="space-between">
      <Grid item xs={12} md={6} xl={5}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Chào mừng</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Tre</strong> {contentOne}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{contentTwo} <strong>Thiêng Việt</strong>.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Tôi là</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button onClick={() => this.redirect('/home/all#contact')} variant="contained" color="primary" size="large" fullWidth>
                  <Typography>Nhà thiết kế</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => this.redirect('/home/all#mall')} variant="contained" color="primary" size="large" fullWidth>
                  <Typography>Khách hàng</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <model-viewer
          src={objectGLB}
          ios-src={objectUSDZ}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          quick-look-browsers="safari chrome"
          camera-controls
          auto-rotate
          alt="A 3D model of an astronaut"
          shadow-intensity={1}
          shadow-softness={1.25}
          interaction-policy="allow-when-focused"
          class={classes.arViewer}
        />
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
)(withStyles(styles)(Welcome)));