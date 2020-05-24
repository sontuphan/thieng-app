import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { ArrowBackRounded, ArrowForwardRounded } from '@material-ui/icons';

import styles from './styles';

class CarouselPagination extends Component {

  render() {
    let { classes } = this.props;
    return <Grid container
      direction="column"
      justify="space-between"
      className={classes.maxHeight}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">{this.props.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">{this.props.subtitle}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <IconButton color="secondary" size="small" onClick={this.props.onNext}>
                <ArrowBackRounded />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>{this.props.paging.page + 1}/{this.props.paging.total}</Typography>
            </Grid>
            <Grid item>
              <IconButton color="secondary" size="small" onClick={this.props.onBack}>
                <ArrowForwardRounded />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.props.onMore}
            fullWidth
          >
            <Typography>Nhiều hơn</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  }
}

CarouselPagination.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  paging: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onMore: PropTypes.func.isRequired,
}

export default withStyles(styles)(CarouselPagination);