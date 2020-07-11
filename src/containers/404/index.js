import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import Image from 'material-ui-image';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Drain from 'components/drain';

import styles from './styles';
import lostImg from 'static/images/404.svg';


class NotFound extends Component {
  redirect = () => {
    const { location: { search } } = this.props
    const params = new URLSearchParams(search);
    const redirect = params.get('redirect');
    return redirect;
  }

  render() {
    const { classes } = this.props;
    const { ui, auth } = this.props;
    const path = this.redirect();

    if (path && auth.isValid) return <Redirect to={path} />
    if (!auth.isValid) console.log('login')
    return <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={11} lg={8}>
        <Image src={lostImg} aspectRatio={(829 / 414)} />
      </Grid>
      <Grid item xs={11} lg={8} className={ui.width > 960 ? classes.navigation : null}>
        <Grid
          container
          spacing={2}
          justify={ui.width > 960 ? 'flex-end' : 'center'}
          alignItems="center"
          className={classes.noWrap}
        >
          <Grid item>

          </Grid>
          <Grid item>
            <Typography className={classes.message}>Bạn đang bị lạc ?</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/mall">
              <Typography>Về nhà</Typography>
            </Button>
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

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NotFound)));