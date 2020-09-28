import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import { CloseRounded } from '@material-ui/icons';

import Support from 'components/support';

import styles from './styles';
import guide from 'static/images/guide.png';

const MESSAGE = `Quý khách vui lòng thực hiện đầy đủ quá trình thanh toán. 
  Sau đó, quý khách có thể tắt thông báo này vào tiếp tục các bước còn lại. 
  Để xác nhận chuyển khoản thành công, Thiêng Việt sẽ liên lạc lại để thông 
  báo cho quý khách.`

class PaymentGuide extends Component {

  render() {
    const { classes } = this.props;
    const { visible, onClose } = this.props;
    return <Dialog open={visible} onClose={onClose}>
      <DialogTitle>
        <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
          <Grid item className={classes.stretch}>
            <Typography variant="h6">Hướng dẫn chuyển khoản</Typography>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={10} md={8}>
            <Image src={guide} aspectRatio={(845 / 338)} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container className={classes.noWrap} spacing={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body2">Thông tin chuyển khoản</Typography>
                  </Grid>
                  <Grid item className={classes.stretch}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography>Số tài khoản</Typography>
                <Typography color="textSecondary">0531002532898‬</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Chủ tài khoản</Typography>
                <Typography color="textSecondary">HUỲNH THỊ CẨM LIỄU</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Ngân hàng</Typography>
                <Typography color="textSecondary">Ngân hàng Vietcombank - Chi nhánh Đông Sài Gòn</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container className={classes.noWrap} spacing={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body2">Nội dung chuyển khoản</Typography>
                  </Grid>
                  <Grid item className={classes.stretch}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>Số tiền</Typography>
                <Typography color="textSecondary">{this.props.value}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Tên khách hàng + Số điện thoại</Typography>
                <Typography color="textSecondary">Ví dụ: Nguyen Van A + 0123456789</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography>{MESSAGE}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Support />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  }
}

PaymentGuide.defaultProps = {
  visible: false,
  onClose: () => { },
  value: '0 ₫',
}

PaymentGuide.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  value: PropTypes.string,
}

export default withStyles(styles)(PaymentGuide);