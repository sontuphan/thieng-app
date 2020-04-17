import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ExploreRounded, SentimentSatisfiedAltRounded } from '@material-ui/icons';

import styles from './styles';

class Menu extends Component {

  render() {
    let { match: { params: { page } } } = this.props;

    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Button
          variant="outlined"
          color={page === 'for-me' ? 'primary' : 'default'}
          startIcon={<SentimentSatisfiedAltRounded />}
          component={RouterLink}
          to={'/newsfeed/for-me'}
        >
          <Typography>For Me</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={page === 'discovery' ? 'primary' : 'default'}
          startIcon={<ExploreRounded />}
          component={RouterLink}
          to={'/newsfeed/discovery'}
        >
          <Typography>Discovery</Typography>
        </Button>
      </Grid>
    </Grid>
  }
}

Menu.defaultProps = {
  category: ''
}

Menu.propTypes = {
  category: PropTypes.string
}

export default withRouter(withStyles(styles)(Menu));