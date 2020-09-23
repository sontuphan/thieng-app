import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    const { classes } = this.props;
    const { match: { params: { category } }, ui: { width } } = this.props;
    const { expanded, categories } = this.state;

    return <Grid container spacing={2} className={width >= 960 ? classes.noWrap : null}>
      <Grid item xs={width >= 960 ? 'auto' : 12}>
        <Typography variant="h4" noWrap>Sản phẩm</Typography>
      </Grid>
      <Grid item xs={width >= 960 ? 'auto' : 12} className={width >= 960 ? classes.stretch : null}>
        <Grid container spacing={2} justify="flex-end">
          {/* Menu */}
          {categories.map(item => <Grid item key={item.value}>
            <Grow in>
              <Button
                variant="outlined"
                color={category === item.value ? 'primary' : 'default'}
                startIcon={item.icon}
                component={RouterLink}
                to={'/home/' + item.value}
              >
                <Typography>{item.name}</Typography>
              </Button>
            </Grow>
          </Grid>)}
          {/* Action */}
          {!expanded ? <Grid item>
            <Button endIcon={<ExpandMoreRounded />} onClick={this.onMore}>
              <Typography>Thêm</Typography>
            </Button>
          </Grid> : <Grid item>
              <Button endIcon={<ExpandLessRounded />} onClick={this.onLess}>
                <Typography>Thu lại</Typography>
              </Button>
            </Grid>}
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Menu)));