import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import {
  MailRounded, Facebook, PhoneRounded,
  PolicyRounded, GavelRounded
} from '@material-ui/icons';

import Policy from './policy';
import Terms from './terms';

import styles from './styles';


class Footer extends Component {
  constructor() {
    super();

    this.state = {
      email: 'thiengviet@gmail.com',
      facebook: 'https://www.facebook.com/Tre-Thi%C3%AAng-Vi%E1%BB%87t-101229158264093/',
      phone: '078.3333.689',
      visiblePolicy: false,
      visibleTerms: false,
    }
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.hash === '#policy') this.setState({ visiblePolicy: true });
    if (location.hash === '#terms') this.setState({ visibleTerms: true });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (!isEqual(prevProps.location, location)) {
      if (location.hash === '#policy') this.setState({ visiblePolicy: true });
      if (location.hash === '#terms') this.setState({ visibleTerms: true });
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
    const { visiblePolicy, visibleTerms } = this.state;

    return <Grid container alignItems="center" className={classes.footer} spacing={2}>
      <Grid item xs={12} md={4}>
        <Grid container alignItems="center" justify={width >= 960 ? 'flex-start' : 'center'} spacing={2}>
          <Grid item>
            <IconButton onClick={this.onPhone} color="secondary">
              <PhoneRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={this.onEmail} color="secondary">
              <MailRounded fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={this.onFacebook} color="secondary">
              <Facebook fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} id="policy">
        <Grid container justify="center" spacing={2} className={classes.noWrap}>
          <Grid item>
            <Policy visible={visiblePolicy} onClose={() => this.setState({ visiblePolicy: false })} />
            <Button
              color="primary"
              onClick={() => this.setState({ visiblePolicy: true })}
              startIcon={<PolicyRounded />}
            >
              <Typography noWrap>Privacy Policy</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Terms visible={visibleTerms} onClose={() => this.setState({ visibleTerms: false })} />
            <Button
              color="primary"
              onClick={() => this.setState({ visibleTerms: true })}
              startIcon={<GavelRounded />}
            >
              <Typography noWrap>Terms & Conditions</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
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