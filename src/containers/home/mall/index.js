import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ExpandMoreRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import { WrapperRichItemCard, RichItemCard } from 'components/cards/item';
import { CircularProgressButton } from 'components/buttons';
import Menu from './menu';

import configs from 'configs';
import styles from './styles';
import { getItems } from 'modules/items.reducer';


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
    let { items: { pagination: { limit, page } } } = this.props;
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
      {items.map((item, i) => <WrapperRichItemCard key={i} >
        <RichItemCard itemId={item._id} />
      </WrapperRichItemCard>)}
    </Grid >
  }

  render() {
    // const { classes } = this.props;
    const { items: { data }, match: { params: { category } } } = this.props;
    const item = configs.category.fullList.filter(e => e.value === category)[0];

    if (!item) return <Redirect to='/home/all' />
    return <Grid container justify="center" spacing={2} id="mall">
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12}>
        <Menu />
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12}>
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