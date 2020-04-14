import React, { Component, Fragment } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
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
    let { match: { params: { category } } } = this.props;

    return <Fragment>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'kitchen' ? 'primary' : 'default'}
          startIcon={<GiCookingPot />}
          component={RouterLink}
          to={'/mall/kitchen'}
        >
          <Typography>Kitchen</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'garden' ? 'primary' : 'default'}
          startIcon={<FaTree />}
          component={RouterLink}
          to={'/mall/garden'}
        >
          <Typography>Garden</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'others' ? 'primary' : 'default'}
          startIcon={<FaConciergeBell />}
          component={RouterLink}
          to={'/mall/others'}
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
    let { match: { params: { category } } } = this.props;

    return <Grid container spacing={2} justify="center">
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'chairs' ? 'primary' : 'default'}
          startIcon={<FaChair />}
          component={RouterLink}
          to={'/mall/chairs'}
        >
          <Typography>Chairs</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'desks' ? 'primary' : 'default'}
          startIcon={<GiDesk />}
          component={RouterLink}
          to={'/mall/desks'}
        >
          <Typography>Desks</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'floor' ? 'primary' : 'default'}
          startIcon={<MdTexture />}
          component={RouterLink}
          to={'/mall/floor'}
        >
          <Typography>Floor</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'light' ? 'primary' : 'default'}
          startIcon={<GiCeilingLight />}
          component={RouterLink}
          to={'/mall/light'}
        >
          <Typography>Light</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'bedroom' ? 'primary' : 'default'}
          startIcon={<GiBedLamp />}
          component={RouterLink}
          to={'/mall/bedroom'}
        >
          <Typography>Bedroom</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={category === 'playground' ? 'primary' : 'default'}
          startIcon={<FaTableTennis />}
          component={RouterLink}
          to={'/mall/playground'}
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

export default withRouter(withStyles(styles)(Menu));