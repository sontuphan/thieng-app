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

class Items extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      page: 0,
      limit: 12,
      category: 'chairs'
    }
  }

  componentDidMount() {
    this.readCategory();
    this.props.getItems(this.state.page, this.state.limit);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.match.params) !== JSON.stringify(this.props.match.params))
      this.readCategory();

    if (prevState.page !== this.state.page)
      this.props.getItems(this.state.page, this.state.limit);
    if (prevState.limit !== this.state.limit)
      this.props.getItems(this.state.page, this.state.limit);

    if (JSON.stringify(prevProps.items.data) !== JSON.stringify(this.props.items.data)) {
      let newItems = prevState.items.concat(this.props.items.data)
      this.setState({ items: newItems });
    }
  }

  readCategory = () => {
    let { match: { params: { category } } } = this.props;
    this.setState({ category });
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let { items } = this.state;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain large />
      </Grid>

      <Grid item xs={11} md={10}>
        <Menu />
      </Grid>

      <Grid item xs={11} md={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={11} md={10}>
        <Typography variant="h1">{this.capitalizeFirstLetter(this.state.category)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={11} md={10}>
        <Grid container spacing={2}>
          {items.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
            <ProductCard object={obj} />
          </Grid>)}
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Items)));