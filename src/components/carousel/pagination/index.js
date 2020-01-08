import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { ArrowBack, ArrowForward } from '@material-ui/icons';

import styles from './styles';

class CarouselPagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      subtitle: props.subtitle,
      pagination: props.pagination,
    }
  }

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
              <Typography variant="h1">{this.state.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">{this.state.subtitle}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
              <IconButton color="secondary" size="small">
                <ArrowBack size="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>{this.state.pagination.page}/{this.state.pagination.total}</Typography>
            </Grid>
            <Grid item>
              <IconButton color="secondary" size="small">
                <ArrowForward size="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" size="large" fullWidth>
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
  pagination: PropTypes.object.isRequired
}

export default withStyles(styles)(CarouselPagination);