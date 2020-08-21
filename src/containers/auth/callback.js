import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

import { logIn } from 'modules/auth.reducer';


class CallbackAuth extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
    }
  }

  componentDidMount() {
    const { logIn, location: { hash }, history } = this.props;
    const search = '?' + hash.substring(1);
    const params = new URLSearchParams(search);
    const token = params.get('access_token');
    const redirect_uri = params.get('state');
    return logIn({ service: 'facebook', accessToken: token }).then(re => {
      return history.replace(redirect_uri);
    }).catch(er => {
      return this.setState({ error: JSON.stringify(er) });
    });
  }

  render() {
    // const { classes } = this.props;
    const { error } = this.state;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Vui lòng chờ quá trình đăng nhập diễn ra...</Typography>
        {error ? <Typography color="error">{error}</Typography> : null}
      </Grid>
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