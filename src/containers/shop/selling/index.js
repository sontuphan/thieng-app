import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ArrowForwardIos } from '@material-ui/icons';

import Drain from 'components/drain';
import Divider from 'components/divider';
import Minishelf from 'components/minishelf';

import styles from './styles';

import { getItems } from 'modules/items.reducer';

class Selling extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      page: 0,
      limit: 12,
    }
  }

  componentDidMount() {
    this.props.getItems(this.state.page, this.state.limit);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page)
      this.props.getItems(this.state.page, this.state.limit);
    if (prevState.limit !== this.state.limit)
      this.props.getItems(this.state.page, this.state.limit);

    if (JSON.stringify(prevProps.items.data) !== JSON.stringify(this.props.items.data)) {
      let newItems = prevState.items.concat(this.props.items.data)
      this.setState({ items: newItems });
    }
  }

  onMore = () => {
    this.setState({ page: this.state.page + 1 });
  }

  render() {
    let { items } = this.state;

    return <Grid container direction="row" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Đang bán</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      {items.map((obj, i) => <Grid key={i} item xs={6} md={2}>
        <Minishelf object={obj} />
      </Grid>)}
      <Grid item xs={12}>
        <Grid container direction="row" justify="flex-end" spacing={2}>
          <Grid item>
            <Button variant="outlined" color="primary" size="large" endIcon={<ArrowForwardIos />} onClick={this.onMore}>
              <Typography>Nhiều hơn</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Selling)));