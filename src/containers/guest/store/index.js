import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { ExpandMoreRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import { LiteItemCard } from 'components/cards/item';
import { CircularProgressButton } from 'components/buttons';

import { getItems, updateItem } from 'modules/items.reducer';

import styles from './styles';


class GuestStore extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.loadData(true);
  }

  loadData = (reset = false) => {
    return this.setState({ isLoading: true }, () => {
      const { match: { params: { userId } }, getItems } = this.props;
      let { items: { pagination: { limit, page } } } = this.props;
      page = reset ? 0 : page + 1;
      const condition = { status: 'selling', userId: userId }
      return getItems(condition, limit, page).then(() => {
        return this.setState({ isLoading: false });
      }).catch(console.error);
    });
  }

  renderItems = () => {
    const { items: { data } } = this.props;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
        <LiteItemCard itemId={obj._id} />
      </Grid>)}
    </Grid>
  }

  render() {
    const { classes } = this.props;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">Cửa hàng</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {this.renderItems()}
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
  getItems, updateItem,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GuestStore)));