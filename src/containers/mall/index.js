import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import { ThreeDRotation } from '@material-ui/icons';

import Drain from 'components/drain';
import ColorSelect from 'components/colorSelect';

import styles from './styles';
import designerImg4 from 'static/images/designer-4.jpg';
import product from 'static/images/product.png';

class Mall extends Component {
  constructor() {
    super();

    this.state = {
      amount: 1
    }
  }

  onColor = (color) => {
    console.log(color);
  }

  render() {
    let { classes } = this.props;

    return <Fragment>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} justify="center" className={classes.showcase}>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item>
                <IconButton>
                  <ThreeDRotation color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <img alt="alt" src={product} height="auto" width="100%" />
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
              <Grid item>
                <Grid container spacing={1} direction="row" alignItems="center">
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={designerImg4} className={classes.avatar} />
                  </Grid>
                  <Grid item>
                    <Typography>Remy Sharp</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <ColorSelect colors={["#B28B67", "#915B3C", "#1C1D1A"]} onChange={this.onColor} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Drain />
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Grid container spacing={1}>
              <Grid item>
                <Chip color="primary" label="New" size="small" />
              </Grid>
              <Grid item>
                <Chip color="primary" label="20%" size="small" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">Tellus lacus vitae nisl.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem amet sem mus in in fermentum gravida id luctus.</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum urna tempus adipiscing amet dignissim.</Typography>
          </Grid>
          <Drain />
          <Grid item xs={10} md={8}>
            <Typography variant="h1">6.490.000 vnd</Typography>
          </Grid>
          <Drain />
          <Grid item xs={10} md={8}>
            <TextField label="Số lượng" variant="outlined" color="secondary" value={this.state.amount} fullWidth />
          </Grid>
          <Grid item xs={10} md={8}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" size="large" fullWidth>
                  <Typography>Mua</Typography>
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
    </Fragment>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Mall)));