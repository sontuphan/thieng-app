import React from 'react';
import PropTypes from 'prop-types';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { ArrowForwardRounded } from '@material-ui/icons';

import OrderThumbnail from './thumbnail';

import utils from 'helpers/utils';
import { useStyles } from './styles';
import { useData } from './module';

export function Header(props) {
  const classes = useStyles();
  return <TableRow>
    <TableCell>
      <Typography className={classes.header}>Mã đơn hàng</Typography >
    </TableCell>
    <TableCell />
    <TableCell align="right">
      <Typography className={classes.header}>Ngày tạo</Typography >
    </TableCell>
    <TableCell align="right">
      <Typography className={classes.header}>Hóa đơn</Typography >
    </TableCell>
    <TableCell align="right">
      <Typography className={classes.header}>Thanh toán</Typography >
    </TableCell>
    <TableCell align="right">
      <Typography className={classes.header}>Trạng thái</Typography >
    </TableCell>
    <TableCell />
  </TableRow>
}

function Row(props) {
  const classes = useStyles();
  const data = useData(props.orderId);
  if (!data) return null;

  const getTotalPrice = (items) => {
    return `${utils.prettyNumber(items.reduce((total, { amount, price }) => total + amount * price, 0), 'long')} ₫`;
  }
  const getOrderStatus = (status) => {
    switch (status) {
      case 'waiting':
        return <span className={classes.warning}>Chờ xử lý</span>;
      case 'packaging':
        return <span className={classes.info}>Đang đóng gói</span>;
      case 'delivering':
        return <span className={classes.info}>Đang vận chuyển</span>;
      case 'canceled':
        return 'Đã hủy';
      case 'done':
        return <span className={classes.success}>Hoàn thành</span>;
      default:
        return <span className={classes.error}>Lỗi</span>;
    }
  }
  const getPaymentStatus = (status) => {
    if (!status) return <span className={classes.error}>Chưa</span>
    return <span className={classes.success}>Rồi</span>
  }

  return <TableRow>
    <TableCell component="th" scope="row">
      <Typography>{data._id}</Typography >
    </TableCell>
    <TableCell>
      <AvatarGroup max={3}>
        {data.items.map((item, i) => <OrderThumbnail key={i} itemId={item.itemId} />)}
      </AvatarGroup>
    </TableCell>
    <TableCell align="right">
      <Typography>{utils.prettyDatetime(data.createdAt)}</Typography >
    </TableCell>
    <TableCell align="right">
      <Typography>{getTotalPrice(data.items)}</Typography >
    </TableCell>
    <TableCell align="right">
      <Typography>{getPaymentStatus(data.paymentStatus)}</Typography >
    </TableCell>
    <TableCell align="right">
      <Typography>{getOrderStatus(data.status)}</Typography >
    </TableCell>
    <TableCell>
      <IconButton size="small" onClick={props.onClick}>
        <ArrowForwardRounded />
      </IconButton>
    </TableCell>
  </TableRow>
}

Row.defaultProps = {
  onClick: () => { },
}

Row.propTypes = {
  orderId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Row;