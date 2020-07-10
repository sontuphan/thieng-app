import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import Row, { Header } from '../row';
import Order from '../order';
import SearchField from 'components/search';

import { getOrders } from 'modules/order.reducer';

import styles from './styles';


class DataTable extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      orderId: null,
    }
  }

  componentDidMount() {
    const { order: { pagination: { limit } } } = this.props;
    const condition = this.buildCondition();
    this.loadData(condition, limit, 0);
  }

  componentDidUpdate(prevProps) {
    const { order: { pagination: { limit } }, status } = this.props;
    if (!isEqual(status, prevProps.status)) {
      const condition = this.buildCondition();
      this.loadData(condition, limit, 0);
    }
  }

  buildCondition = () => {
    const { status } = this.props;
    return { $or: status.map(e => ({ status: e })) }
  }

  loadData = (condition, limit, page) => {
    const { getOrders } = this.props;
    return getOrders(condition, limit, page);
  }

  onChangePage = (e, page) => {
    const { order: { pagination: { limit } } } = this.props;
    const condition = this.buildCondition();
    return this.loadData(condition, limit, page);
  }

  onChangeRowsPerPage = (e) => {
    const limit = e.target.value;
    const condition = this.buildCondition();
    return this.loadData(condition, limit, 0);
  }

  onOpenOrder = (orderId) => {
    return this.setState({ visible: true, orderId });
  }

  onCloseOrder = () => {
    return this.setState({ visible: false, orderId: null });
  }

  onSearch = (value) => {
    const condition = { ...this.buildCondition(), _id: value }
    return this.loadData(condition, 5, 0);
  }

  onClear = () => {
    let condition = this.buildCondition();
    return this.loadData(condition, 5, 0);
  }

  render() {
    const { classes } = this.props;
    const { order: { data, pagination } } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12} >
        <Slide direction="right" in={!this.state.visible} mountOnEnter unmountOnExit>
          <SearchField
            variant="contained"
            placeholder="Mã đơn hàng"
            onSearch={this.onSearch}
            onClear={this.onClear}
            fullWidth
          />
        </Slide>
      </Grid>
      <Grid item xs={12}>
        <Slide direction="right" in={!this.state.visible} mountOnEnter unmountOnExit>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <Header />
              </TableHead>
              <TableBody>
                {data.map((order, i) => <Row
                  key={i}
                  orderId={order._id}
                  onClick={() => this.onOpenOrder(order._id)}
                />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Slide>
        <Slide direction="right" in={!this.state.visible} mountOnEnter unmountOnExit>
          <TablePagination
            labelRowsPerPage="Số dòng:"
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={-1}
            labelDisplayedRows={({ page }) => `Trang ${page + 1}`}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
          />
        </Slide>
        <Order
          visible={this.state.visible}
          orderId={this.state.orderId}
          onClose={this.onCloseOrder}
        />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders,
}, dispatch);

DataTable.defaultProps = {
  status: ['waiting', 'packaging', 'delivering', 'canceled', 'done']
}

DataTable.propTypes = {
  status: PropTypes.array,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DataTable)));