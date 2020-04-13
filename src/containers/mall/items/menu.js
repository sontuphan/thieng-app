import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ExpandMoreRounded, ExpandLessRounded } from '@material-ui/icons';
import { FaChair, FaTableTennis, FaTree, FaConciergeBell } from 'react-icons/fa';
import { GiDesk, GiBedLamp, GiCookingPot, GiCeilingLight } from 'react-icons/gi';
import { MdTexture } from 'react-icons/md';

import styles from './styles';

class Menu extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false
    }
  }

  onMore = () => {
    return this.setState({ expanded: true });
  }

  onLess = () => {
    return this.setState({ expanded: false });
  }

  renderHiddenOptions = () => {
    if (!this.state.expanded) return null;
    return <Fragment>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'kitchen' ? "primary" : 'default'}
          startIcon={<GiCookingPot />}
          href="/mall/kitchen"
        >
          <Typography>Kitchen</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'garden' ? "primary" : 'default'}
          startIcon={<FaTree />}
          href="/mall/garden"
        >
          <Typography>Garden</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'others' ? "primary" : 'default'}
          startIcon={<FaConciergeBell />}
          href="/mall/others"
        >
          <Typography>Others</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button endIcon={<ExpandLessRounded />} onClick={this.onLess}>
          <Typography>Less</Typography>
        </Button>
      </Grid>
    </Fragment>
  }

  render() {
    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'chairs' ? "primary" : 'default'}
          startIcon={<FaChair />}
          href="/mall/chairs"
        >
          <Typography>Chairs</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'desks' ? "primary" : 'default'}
          startIcon={<GiDesk />}
          href="/mall/desks"
        >
          <Typography>Desks</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'floor' ? "primary" : 'default'}
          startIcon={<MdTexture />}
          href="/mall/floor"
        >
          <Typography>Floor</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'light' ? "primary" : 'default'}
          startIcon={<GiCeilingLight />}
          href="/mall/light"
        >
          <Typography>Light</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'bedroom' ? "primary" : 'default'}
          startIcon={<GiBedLamp />}
          href="/mall/bedroom"
        >
          <Typography>Bedroom</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.props.category === 'playground' ? "primary" : 'default'}
          startIcon={<FaTableTennis />}
          href="/mall/playground"
        >
          <Typography>Playground</Typography>
        </Button>
      </Grid>

      {!this.state.expanded ?
        <Grid item>
          <Button endIcon={<ExpandMoreRounded />} onClick={this.onMore}>
            <Typography>More</Typography>
          </Button>
        </Grid>
        : null
      }

      {this.renderHiddenOptions()}
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