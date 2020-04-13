import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
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
      category: 'chairs',
      expanded: false
    }
  }

  componentDidMount() {
    this.readCategory();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.match.params) !== JSON.stringify(this.props.match.params)) {
      this.readCategory();
    }
  }

  readCategory = () => {
    let { match: { params: { category } } } = this.props;
    this.setState({ category });
  }

  redirect = (to) => {
    this.props.history.push('/mall/' + to);
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
          color={this.state.category === 'kitchen' ? 'primary' : 'default'}
          startIcon={<GiCookingPot />}
          onClick={() => this.redirect('kitchen')}
        >
          <Typography>Kitchen</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.state.category === 'garden' ? 'primary' : 'default'}
          startIcon={<FaTree />}
          onClick={() => this.redirect('garden')}
        >
          <Typography>Garden</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.state.category === 'others' ? 'primary' : 'default'}
          startIcon={<FaConciergeBell />}
          onClick={() => this.redirect('others')}
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
          color={this.state.category === 'chairs' ? 'primary' : 'default'}
          startIcon={<FaChair />}
          onClick={() => this.redirect('chairs')}
        >
          <Typography>Chairs</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.state.category === 'desks' ? 'primary' : 'default'}
          startIcon={<GiDesk />}
          onClick={() => this.redirect('desks')}
        >
          <Typography>Desks</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.state.category === 'floor' ? 'primary' : 'default'}
          startIcon={<MdTexture />}
          onClick={() => this.redirect('floor')}
        >
          <Typography>Floor</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.state.category === 'light' ? 'primary' : 'default'}
          startIcon={<GiCeilingLight />}
          onClick={() => this.redirect('light')}
        >
          <Typography>Light</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.state.category === 'bedroom' ? 'primary' : 'default'}
          startIcon={<GiBedLamp />}
          onClick={() => this.redirect('bedroom')}
        >
          <Typography>Bedroom</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color={this.state.category === 'playground' ? 'primary' : 'default'}
          startIcon={<FaTableTennis />}
          onClick={() => this.redirect('playground')}
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