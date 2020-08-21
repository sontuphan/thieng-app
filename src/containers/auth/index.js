import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CloseRounded } from '@material-ui/icons';
import { FaGoogle, FaFacebookF, FaApple, FaTwitter } from 'react-icons/fa';

import Support from 'components/support';

import styles from './styles';
import configs from 'configs';

import { toggleAuth, refreshSession, logIn } from 'modules/auth.reducer';


class Authentication extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
    }
  }

  componentDidMount() {
    this.props.refreshSession();
  }

  logIn = (data) => {
    if (data.googleId) {
      return this.setState({ error: null }, () => {
        this.props.toggleAuth();
        const user = {
          service: 'google',
          accessToken: data.tokenId,
          email: data.profileObj.email,
          displayname: data.profileObj.name,
          avatar: data.profileObj.imageUrl,
        }
        return this.props.logIn(user);
      });
    }
    else if (data.graphDomain === 'facebook') {
      return this.setState({ error: null }, () => {
        this.props.toggleAuth();
        const user = {
          service: 'facebook',
          accessToken: data.accessToken,
          email: data.email,
          displayname: data.name,
          avatar: data.picture.data.url,
        }
        return this.props.logIn(user);
      });
    } else {
      return this.setState({ error: 'Đã có lỗi xảy ra, vui lòng thử lại!' });
    }
  }

  render() {
    const { classes } = this.props;
    const { auth: { visible }, toggleAuth } = this.props;

    return <Dialog open={visible} onClose={toggleAuth} >
      <DialogTitle>
        <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
          <Grid item className={classes.stretch}>
            <Typography variant="h3">Đăng nhập</Typography>
          </Grid>
          <Grid item>
            <IconButton color="secondary" size="small" onClick={toggleAuth}>
              <CloseRounded />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Bạn có thể dễ dàng đăng nhập bằng dịch vụ ưa thích để tận hưởng đầy đủ các chức năng của ứng dụng.</Typography>
          </Grid>
          <Grid item xs={12}>
            {this.state.error ? <Typography color="primary">{this.state.error}</Typography> : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <GoogleLogin
              clientId={configs.auth.google.clientId}
              render={props => <Button
                variant="outlined"
                size="large"
                startIcon={<FaGoogle />}
                onClick={props.onClick}
                disabled={props.disabled}
                fullWidth>
                <Typography>Tiếp tục với Google</Typography>
              </Button>}
              onSuccess={this.logIn}
              onFailure={this.logIn}
              cookiePolicy={'single_host_origin'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FacebookLogin
              appId={configs.auth.facebook.appId}
              fields='name,email,picture'
              redirectUri={window.location.origin + '/auth'}
              state={window.location.href}
              responseType="token"
              render={props => <Button
                variant="outlined"
                size="large"
                startIcon={<FaFacebookF />}
                onClick={props.onClick}
                fullWidth>
                <Typography>Tiếp tục với Facebook</Typography>
              </Button>}
              callback={this.logIn} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FaApple />}
              onClick={() => { }}
              fullWidth
              disabled>
              <Typography>Tiếp tục với Apple</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FaTwitter />}
              onClick={() => { }}
              fullWidth
              disabled>
              <Typography>Tiếp tục với Twitter</Typography>
            </Button>
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

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleAuth, refreshSession, logIn
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Authentication)));