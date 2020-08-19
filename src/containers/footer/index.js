import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { MailRounded, Facebook, PhoneRounded } from '@material-ui/icons';

import styles from './styles';


class Footer extends Component {
  constructor() {
    super();

    this.state = {
      email: 'thiengviet@gmail.com',
      facebook: 'https://www.facebook.com/Tre-Thi%C3%AAng-Vi%E1%BB%87t-101229158264093/',
      phone: '078.3333.689'
    }
  }

  onPhone = () => {
    const { phone } = this.state;
    return window.open(`tel:${phone}`);
  }

  onEmail = () => {
    const { email } = this.state;
    return window.open(`mailto:${email}`);
  }

  onFacebook = () => {
    const { facebook } = this.state;
    return window.open(facebook, '_blank');
  }

  render() {
    const { classes, ui: { width } } = this.props;

    return <Grid container alignItems="center" className={classes.footer} spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid container alignItems="center" justify={width >= 960 ? 'flex-start' : 'center'} spacing={2}>
          <Grid item>
            <IconButton onClick={this.onPhone} color="secondary">
              <PhoneRounded />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={this.onEmail} color="secondary">
              <MailRounded />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={this.onFacebook} color="secondary">
              <Facebook />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container justify={width >= 960 ? 'flex-end' : 'center'} spacing={2}>
          <Grid item>
            <Typography>Copyright © 2020 Thiêng Việt</Typography>
          </Grid>
        </Grid>
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
)(withStyles(styles)(Footer)));