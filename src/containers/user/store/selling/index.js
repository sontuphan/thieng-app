import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ProductCard } from 'components/cards';

import { getItems } from 'modules/items.reducer';

import styles from './styles';

const COMPONENT = 'selling';


class Selling extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let { items: { [COMPONENT]: { pagination: { limit, page } } } } = this.props;
    let condition = { status: 'selling' }
    return this.props.getItems(condition, limit, page + 1, COMPONENT);
  }

  renderItems = () => {
    let { items: { [COMPONENT]: { data } } } = this.props;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard itemId={obj._id} />
      </Grid>)}
    </Grid>
  }

  render() {
    // let { classes } = this.props;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        {this.renderItems()}
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
)(withStyles(styles)(Selling)));