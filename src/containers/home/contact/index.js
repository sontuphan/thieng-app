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

class Contact extends Component {
  render() {
    return <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Về chúng tôi</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu vestibulum, lorem felis eget. Gravida auctor risus erat pharetra vel odio molestie mi. Ipsum vitae urna porta amet potenti mi pellentesque eu. Est, integer gravida felis eget dolor turpis vitae adipiscing massa. Nulla adipiscing amet, ipsum mattis amet volutpat ac. Dolor pellentesque volutpat massa nibh tincidunt bibendum a, quisque massa. Duis nulla malesuada vulputate nunc egestas elit habitasse bibendum id. Hendrerit dapibus lectus vel id parturient. At sed porttitor vestibulum commodo, sed quam. Amet.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Liên hệ</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eu sit diam, sagittis, sed id turpis egestas elementum. A eget mi dis magna in tortor nec. Et purus pharetra cras feugiat lectus vel vitae lobortis non. Viverra ut nibh quis nulla ultricies tristique feugiat. Bibendum enim vitae tellus auctor viverra non scelerisque. Massa.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem nibh at lacus amet, magna pharetra est. Tortor in.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <TextField label="Email" variant="outlined" color="secondary" fullWidth />
          </Grid>
          <Grid item xs={10} md={8}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" size="large" fullWidth>
                  <Typography>Gửi</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" size="large" fullWidth>
                  <Typography>Huỷ</Typography>
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