import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Drain from 'components/drain';

import styles from './styles';
import utils from 'helpers/utils';

const content = `
  Say đắm chất liệu thiên nhiên, tin vào năng lực dân tộc, và với tinh thần 
  "Thượng tôn tinh hoa đất Việt", Thiêng Việt mang tầm nhìn phát triển 
  những thế mạnh của quê hương trong đời sống hiện đại. Thiêng Việt đề 
  ra sứ mệnh dùng tre để gầy dựng đời sống bền vững cho người sản xuất, 
  người sử dụng lẫn môi trường:
`
const items = [
  'Sản phẩm thân thiện, bảo vệ với môi trường. Phát triển không gian xanh qua việc trồng tre gây rừng.',
  'Gìn giữ khả năng thủ công - mỹ nghệ truyền thống & tạo thu nhập đến các nghệ nhân.',
  'Truyền cảm hứng và gợi mở hướng phát triển.',
  'Tôn vinh giá trị văn hoá Việt giữa đời sống hiện đại.'
]
const conclusion = `
Tất cả sẽ tạo ra một vòng tròn phát triển lành mạnh về sức khoẻ - kinh tế - tinh thần giữa cộng đồng.
`

const bullet = <strong>•</strong>

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      email: ''
    }
  }

  onEmail = (e) => {
    return this.setState({ email: e.target.value });
  }

  onSend = () => {
    const { email } = this.state;
    if (!utils.isEmail(email)) return console.error('Invalid email');
    return console.log(email);
  }

  onCancel = () => {
    return this.setState({ email: '' });
  }

  render() {
    const { classes } = this.props;
    return <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Về chúng tôi</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h6">{content}</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            {items.map((item, i) => <Typography key={i} variant="h6">
              {bullet} {item}
            </Typography>)}
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h6">{conclusion}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} id="contact">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Liên hệ</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h6"><span className={classes.underline}>Địa chỉ:</span> Số 30, Đường 68 CL, Phường Cát Lái, Quận 2, Thành phố Hồ Chí Minh.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h6"><span className={classes.underline}>Số điện thoại:</span>  078.3333.689</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h6">Đăng ký email để nhận thông báo về các chương trình khuyến mãi và quà tặng từ Thiêng Việt.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <TextField
              label="Email"
              variant="outlined"
              color="secondary"
              onChange={this.onEmail}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={this.onSend}
                  fullWidth
                >
                  <Typography>Gửi</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={this.onCancel}
                  fullWidth
                >
                  <Typography>Hủy</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Contact)));