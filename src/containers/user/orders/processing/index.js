import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import Row, { Header } from './row';

import { getOrders } from 'modules/order.reducer';

import styles from './styles';


class ProcesingOrders extends Component {
  componentDidMount() {
    this.loadData(0);
  }

  loadData = (limit, page) => {
    const { getOrders } = this.props;
    const condition = { $and: [{ status: { $ne: 'canceled' } }, { status: { $ne: 'done' } }] }
    return getOrders(condition, limit, page);
  }

  onChangePage = (e, page) => {
    const { order: { pagination: { limit } } } = this.props;
    return this.loadData(limit, page);
  }

  onChangeRowsPerPage = (e) => {
    const limit = e.target.value;
    return this.loadData(limit, 0);
  }

  render() {
    const { classes, order: { data, pagination } } = this.props;
    if (!data.length) return null;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <Header />
            </TableHead>
            <TableBody>
              {data.map(order => <Row key={order._id} orderId={order._id} />)}
            </TableBody>
          </Table>
        </TableContainer>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProcesingOrders)));