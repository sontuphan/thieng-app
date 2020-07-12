import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { SettingsRounded, ExpandMoreRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import { ProductCard } from 'components/cards';
import Menu from './menu';
import { CircularProgressButton } from 'components/buttons';

import { getItems } from 'modules/items.reducer';

import configs from 'configs';
import styles from './styles';


class Mall extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    this.loadData(true);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match, this.props.match)) {
      const { match: { params: { category } } } = this.props;
      if (category) this.loadData(true);
    }
  }

  loadData = (reset = false) => {
    let { items: { mall: { pagination: { limit, page } } } } = this.props;
    let condition = { status: 'selling' }
    const { match: { params: { category } } } = this.props;
    if (category !== 'all') condition.category = category;
    page = reset ? 0 : page + 1;
    return this.setState({ isLoading: true }, () => {
      return this.props.getItems(condition, limit, page).then(() => {
        return this.setState({ isLoading: false });
      }).catch(console.error);
    });
  }

  renderItems = (items) => {
    if (!items || !items.length) return null;
    return <Grid container spacing={2}>
      {items.map((item, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard itemId={item._id} />
      </Grid>)}
    </Grid>
  }

  render() {
    const { classes } = this.props;
    const { items: { mall: { data } } } = this.props;
    const { match: { params: { category } } } = this.props;
    const item = configs.category.fullList.filter(e => e.value === category)[0]

    if (!item) return <Redirect to='/mall/all' />
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain large />
      </Grid>
      <Grid item xs={11} md={10}>
        <Menu />
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={11} md={10}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="h3">{item.name}</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <IconButton size="small">
              <SettingsRounded fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={11} md={10}>
        {this.renderItems(data)}
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
            <CircularProgressButton
              endIcon={<ExpandMoreRounded />}
              isLoading={this.state.isLoading}
              onClick={() => this.loadData(false)}
            >
              <Typography>Thêm</Typography>
            </CircularProgressButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Mall)));