import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import Image from 'material-ui-image';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { InfoRounded, LockOpenRounded, DirectionsRunRounded } from '@material-ui/icons';

import Drain from 'components/drain';

import styles from './styles';
import lostImg from 'static/images/404.svg';

import { toggleAuth } from 'modules/auth.reducer';


class NotFound extends Component {

  redirect = () => {
    const { location: { search } } = this.props
    const params = new URLSearchParams(search);
    const redirect = params.get('redirect');
    return redirect;
  }

  render() {
    const { classes } = this.props;
    const { ui, auth, toggleAuth } = this.props;
    const path = this.redirect();

    if (path && auth.isValid) return <Redirect to={path} />
    return <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={11} lg={8}>
        <Image src={lostImg} aspectRatio={(829 / 414)} />
      </Grid>
      {ui.width >= 960 ? null : <Grid item xs={12}>
        <Drain small />
      </Grid>}
      <Grid item xs={12} md={11} lg={8} className={ui.width >= 960 ? classes.navigation : null}>
        <Grid container spacing={2} justify="flex-end" alignItems="center" className={classes.noWrap}>
          <Grid item>
            <Typography className={classes.message}>
              {auth.isValid ? 'Bạn đang bị lạc ?' : 'Bạn chưa có tài khoản ?'}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Trang bạn vừa truy cập yêu cầu người dùng phải đăng nhập. Hoặc có thể trang này không tồn tại.">
              <IconButton size="small">
                <InfoRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>{auth.isValid ?
            <Button variant="contained" color="primary" href="/mall" startIcon={<DirectionsRunRounded />} >
              <Typography>Về nhà</Typography>
            </Button> :
            <Button variant="contained" color="primary" startIcon={<LockOpenRounded />} onClick={toggleAuth}>
              <Typography>Đăng ký</Typography>
            </Button>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleAuth,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NotFound)));