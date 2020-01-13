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

class Welcome extends Component {
  render() {
    return <Grid container direction="row" justify="center" spacing={2}>
      <Grid item xs={10} md={8}>
        <Typography variant="h1">Chào mừng</Typography>
      </Grid>
      <Grid item xs={10} md={8}>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam congue leo gravida morbi. Fusce tortor laoreet nunc eu. Scelerisque enim scelerisque velit scelerisque sagittis, cursus posuere viverra. Gravida id mauris nisi et. Laoreet sed quis turpis sit eu enim. Duis etiam hendrerit eu non cras fermentum neque aliquam. Facilisis purus.</Typography>
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10} md={8}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10} md={8}>
        <Typography variant="h2">Tôi là</Typography>
      </Grid>
      <Grid item xs={10} md={8}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" size="large" fullWidth>
              <Typography>Nhà thiết kế</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" size="large" fullWidth>
              <Typography>Khách hàng</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain />
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