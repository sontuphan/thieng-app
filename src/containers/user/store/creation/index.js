import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { AddBoxRounded, } from '@material-ui/icons';

import { ProductCard } from 'components/cards';
import Creator from './creator';

import { getItems } from 'modules/items.reducer';

import styles from './styles';

const COMPONENT = 'creation';


class Creation extends Component {
  constructor() {
    super();

    this.state = {
      editableId: null,
      visible: false,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let { items: { [COMPONENT]: { pagination: { limit, page } } } } = this.props;
    let condition = { status: 'creating' }
    return this.props.getItems(condition, limit, page + 1, COMPONENT);
  }

  onEdit = (editableId) => {
    return this.setState({ editableId, visible: true });
  }

  renderItems = () => {
    let { items: { [COMPONENT]: { data } } } = this.props;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard _id={obj._id} onClick={() => this.onEdit(obj._id)} />
      </Grid>)}
    </Grid>
  }

  render() {
    let { classes } = this.props;

    return <Grid container justify="center" spacing={2}>

      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="h3">Creation</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddBoxRounded />}
              onClick={() => this.setState({ visible: true })}
            >
              <Typography>New</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Creator
          _id={this.state.editableId}
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        />
      </Grid>

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
)(withStyles(styles)(Creation)));