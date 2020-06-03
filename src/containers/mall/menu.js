import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

import { ExpandMoreRounded, ExpandLessRounded } from '@material-ui/icons';

import configs from 'configs';
import styles from './styles';

class Menu extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
      categories: configs.category.shortList,
    }
  }

  onMore = () => {
    return this.setState({
      expanded: true,
      categories: configs.category.fullList,
    });
  }

  onLess = () => {
    return this.setState({
      expanded: false,
      categories: configs.category.shortList,
    });
  }

  render() {
    const { match: { params: { category } } } = this.props;
    const { expanded, categories } = this.state;

    return <Grid container spacing={2} justify="center">
      {categories.map(item => <Grid item key={item.value}>
        <Grow in>
          <Button
            variant="outlined"
            color={category === item.value ? 'primary' : 'default'}
            startIcon={item.icon}
            component={RouterLink}
            to={'/mall/' + item.value}
          >
            <Typography>{item.name}</Typography>
          </Button>
        </Grow>
      </Grid>)}

      {!expanded ? <Grid item>
        <Button endIcon={<ExpandMoreRounded />} onClick={this.onMore}>
          <Typography>More</Typography>
        </Button>
      </Grid> : <Grid item>
          <Button endIcon={<ExpandLessRounded />} onClick={this.onLess}>
            <Typography>Less</Typography>
          </Button>
        </Grid>}
    </Grid>
  }
}

export default withRouter(withStyles(styles)(Menu));