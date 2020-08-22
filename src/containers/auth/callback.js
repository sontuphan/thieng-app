import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Image from 'material-ui-image';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Drain from 'components/drain';

import styles from './styles';
import peopleImg from 'static/images/people.svg';

import { logIn } from 'modules/auth.reducer';


class CallbackAuth extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      timer: 5,
    }
  }

  componentDidMount() {
    const { logIn, location: { hash }, history } = this.props;
    const search = '?' + hash.substring(1);
    const params = new URLSearchParams(search);
    const token = params.get('access_token');
    const redirect_uri = params.get('state');
    return logIn({ service: 'facebook', accessToken: token }).then(re => {
      window.location.href = redirect_uri;
    }).catch(er => {
      return this.setState({ error: JSON.stringify(er), timer: 5 }, () => {
        return setInterval(() => {
          const { timer } = this.state;
          if (timer !== 0) return this.setState({ timer: timer - 1 });
          return history.push('/home');
        }, 1000);
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { error, timer } = this.state;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={6}>
        <Image src={peopleImg} aspectRatio={(568 / 485)} />
      </Grid>
      <Grid item xs={10}>
        <Grid container alignItems="center" justify="center" className={classes.noWrap} spacing={2}>
          <Grid item>
            <CircularProgress size={24} />
          </Grid>
          <Grid item>
            <Typography>Vui lòng chờ quá trình đăng nhập diễn ra...</Typography>
          </Grid>
        </Grid>
      </Grid>
      {error ? <Grid item xs={10}>
        <Grid container justify="center" spacing={2}>
          <Grid item >
            <Typography color="error">Xin lỗi! Đã có lỗi xảy ra. Bạn sẽ được chuyển hướng về tran chủ trong vòng {timer} giây</Typography>
          </Grid>
        </Grid>
      </Grid> : null}
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logIn,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CallbackAuth)));