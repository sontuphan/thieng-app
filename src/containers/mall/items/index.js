import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Drain from 'components/drain';
import { ProductCard } from 'components/cards';
import Menu from './menu';

import { getItems } from 'modules/items.reducer';
import { getItem } from 'modules/bucket.reducer';

import styles from './styles';
import utils from 'helpers/utils';


class Items extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      category: 'chairs'
    }
  }

  componentDidMount() {
    this.readParams();
    this.loadData();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.match, this.props.match))
      this.readParams();
    if (!isEqual(prevState.category, this.state.category))
      this.loadData();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  loadData = () => {
    let { items: { mall: { pagination: { limit, page } } } } = this.props;
    let condition = { status: 'selling' }
    return this.props.getItems(condition, limit, page + 1);
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      return this.loadData();
    }
  }

  readParams = () => {
    let { match: { params: { category } } } = this.props;
    this.setState({ category });
  }

  renderItems = (items) => {
    if (!items || !items.length) return null;
    return <Grid container spacing={2}>
      {items.map(item => <Grid key={item._id} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard _id={item._id} />
      </Grid>)}
    </Grid>
  }

  render() {
    let { classes } = this.props;
    let { items: { mall: { data } } } = this.props;

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
            <Typography variant="h3">{utils.paramToHeader(this.state.category)}</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>

      <Grid item xs={11} md={10}>
        {this.renderItems(data)}
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
  getItem,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Items)));