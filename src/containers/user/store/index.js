import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import async from 'async';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { ExpandMoreRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import { ProductCard } from 'components/cards';
import Action from './action';
import { CircularProgressButton } from 'components/buttons';

import { getItems, updateItem } from 'modules/items.reducer';

import styles from './styles';


class UserStore extends Component {
  constructor() {
    super();

    this.state = {
      selected: [],
      multipleChoice: false,
      isDeleteing: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.loadData(true);
  }

  loadData = (reset = false) => {
    return this.setState({ isLoading: true }, () => {
      let { items: { pagination: { limit, page } } } = this.props;
      page = reset ? 0 : page + 1;
      const { getItems, auth: { _id } } = this.props;
      const condition = { status: 'selling', userId: _id }
      return getItems(condition, limit, page).then(() => {
        return this.setState({ isLoading: false });
      }).catch(console.error);
    });
  }

  onToggle = (e) => {
    return this.setState({ multipleChoice: e.target.checked });
  }

  onClick = (itemId) => {
    if (!this.state.multipleChoice) return null;
    return () => {
      let { selected } = this.state;
      const index = selected.indexOf(itemId);
      if (index === -1) selected.push(itemId);
      else if (index === selected.length - 1) selected.pop();
      else selected[index] = selected.pop();
      return this.setState({ selected });
    }
  }

  onMove = (status) => {
    const { updateItem } = this.props;
    const { selected } = this.state;
    return this.setState({ isWarehouse: status === 'archived', isFactory: status === 'creating' }, () => {
      return async.eachSeries(selected, (itemId, cb) => {
        return updateItem({ _id: itemId, status }).then(re => {
          return cb();
        }).catch(er => {
          return cb(er);
        });
      }, (er) => {
        if (er) console.error(er);
        else this.loadData(true);
        return this.setState({ selected: [], isWarehouse: false, isFactory: false });
      });
    });
  }

  renderItems = () => {
    const { items: { data } } = this.props;
    const { multipleChoice, selected } = this.state;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard
          itemId={obj._id}
          onClick={this.onClick(obj._id)}
          selective={multipleChoice}
          selected={selected.includes(obj._id)}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    const { classes } = this.props;
    const { multipleChoice, isLoading, isWarehouse, isFactory } = this.state;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">Cửa hàng</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography color="textSecondary">Tùy chọn</Typography>
          </Grid>
          <Grid item>
            <Switch color="primary" checked={multipleChoice} onChange={this.onToggle} />
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
              isLoading={isLoading}
              onClick={() => this.loadData(false)}
            >
              <Typography>Thêm</Typography>
            </CircularProgressButton>
          </Grid>
        </Grid>
      </Grid>
      {multipleChoice ? <Action
        isWarehouse={isWarehouse}
        onWarehouse={() => this.onMove('archived')}
        isFactory={isFactory}
        onFactory={() => this.onMove('creating')}
      /> : null}
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
)(withStyles(styles)(UserStore)));