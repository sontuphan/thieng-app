import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Drain from 'components/drain';
import { ProductCard } from 'components/cards';
import Menu from './menu';

import { getItems } from 'modules/items.reducer';

import styles from './styles';
import utils from 'helpers/utils';


class Items extends Component {
  constructor() {
    super();

    this.state = {
      category: 'chairs'
    }
  }

  componentDidMount() {
    this.readParams();
    this.loadData();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.match.params) !== JSON.stringify(this.props.match.params))
      this.readParams();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  loadData = () => {
    let { items: { pagination: { limit, page } } } = this.props;
    let condition = { status: 'selling' }
    this.props.getItems(condition, limit, page + 1);
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadData();
    }
  }

  readParams = () => {
    let { match: { params: { category } } } = this.props;
    this.setState({ category });
  }

  render() {
    let { classes } = this.props;
    let { items: { data } } = this.props;
    if (!data || !data.length) return null;

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
        <Grid container spacing={2}>
          {
            data.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
              <ProductCard _id={obj._id} />
            </Grid>)
          }
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Items)));