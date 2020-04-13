import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ExpandMoreRounded } from '@material-ui/icons';
import { FaChair, FaTableTennis, FaTree } from 'react-icons/fa';
import { GiDesk, GiBedLamp, GiCookingPot } from 'react-icons/gi';

import styles from './styles';

class Menu extends Component {
  render() {
    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'chairs' ? "primary" : 'secondary'}
          startIcon={<FaChair />}
          href="/mall/chairs"
        >
          <Typography>Chairs</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'desks' ? "primary" : 'secondary'}
          startIcon={<GiDesk />}
          href="/mall/desks"
        >
          <Typography>Tables</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'bedroom' ? "primary" : 'secondary'}
          startIcon={<GiBedLamp />}
          href="/mall/bedroom"
        >
          <Typography>Bedroom</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'kitchen' ? "primary" : 'secondary'}
          startIcon={<GiCookingPot />}
          href="/mall/kitchen"
        >
          <Typography>Kitchen</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'playyard' ? "primary" : 'secondary'}
          startIcon={<FaTableTennis />}
          href="/mall/playyard"
        >
          <Typography>Play Yard</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'garden' ? "primary" : 'secondary'}
          startIcon={<FaTree />}
          href="/mall/garden"
        >
          <Typography>Garden</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button endIcon={<ExpandMoreRounded />}>
          <Typography>More</Typography>
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

export default withStyles(styles)(Menu);