import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import {
  MoreHoriz, ShoppingCartRounded, ImportContactsRounded,
  ShareRounded, CheckCircleRounded
} from '@material-ui/icons';

import Carousel, { CarouselChild } from 'components/carousel';
import { BaseCard, ImageCard, UserCard } from 'components/cards';
import { NumericInput } from 'components/inputs';

import { setCart, toggleCart } from 'modules/cart.reducer';
import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';


/**
 * Description
 * @param {*} props 
 */
function Description(props) {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    return setHeight(ref.current.offsetWidth)
  }, [ref]);
  const { descriptions } = props;
  let contents = null;
  if (!descriptions.length) contents = <Typography color="textSecondary">Sản phẩm này chưa có mô tả.</Typography>
  else contents = descriptions.map((description, i) => <Typography key={i}>{description}</Typography>);
  return <Grid container spacing={2}>
    <Grid item xs={12} ref={ref} style={{ height, overflow: 'auto' }}>
      {contents}
    </Grid>
  </Grid>
}

Description.defaultProps = {
  descriptions: [],
}

Description.propTypes = {
  descriptions: PropTypes.array,
}


/**
 * RichItemCard
 * @param {*} props 
 */
function RichItemCard(props) {
  // Define hooks
  const [anchorEl, setVisible] = useState(null);
  const [amount, setAmount] = useState(props.amount);
  const classes = useStyles();
  const data = useData(props.itemId);
  // Define functions
  const onBuy = () => {
    if (!amount) return console.error('Invalid amount');
    return props.setCart({ ...data, amount });
  }
  const onVisible = (e) => setVisible(e.currentTarget);
  const onUnvisible = () => setVisible(null);
  const isInCart = () => {
    if (!data) return false;
    const { data: carts } = props.cart || {};
    if (!carts || carts.length <= 0) return false;
    return carts.map(({ _id }) => _id).includes(data._id);
  }
  // Render component
  if (!data || data instanceof Error) return null;
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <BaseCard>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <Grid container spacing={2} className={classes.noWrap}>
              <Grid item className={classes.stretch}>
                <UserCard userId={data.userId || ''} size="small" />
              </Grid>
              <Grid item>
                <Tooltip title={'Chức năng khác'}>
                  <IconButton size="small" onClick={onVisible}>
                    <MoreHoriz />
                  </IconButton>
                </Tooltip>
                <Popover
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={onUnvisible}
                  onClick={onUnvisible}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <ShareRounded color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Chia sẻ" />
                    </ListItem>
                  </List>
                </Popover>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Carousel pagination>
              <CarouselChild>
                <Grid container spacing={2}>
                  <Grid item xs={12} component={Link} to={`/item/${data._id}`}>
                    <ImageCard _id={data.thumbnailId} />
                  </Grid>
                </Grid>
              </CarouselChild>
              <CarouselChild>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Description descriptions={data.descriptions} />
                  </Grid>
                </Grid>
              </CarouselChild>
              {data.fileIds.map((fileId, index) => <CarouselChild key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} component={Link} to={`/item/${data._id}`}>
                    <ImageCard _id={fileId} />
                  </Grid>
                </Grid>
              </CarouselChild>)}
            </Carousel>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {data.tags.map((tag, i) => <Grid item key={i}>
                <Chip color="primary" label={tag} size="small" />
              </Grid>)}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6">{data.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} justify="flex-end">
                  <Grid item>
                    <Typography variant="body2">{utils.prettyNumber(data.price * amount, 'long')} ₫</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} className={classes.noWrap} alignItems="center">
              <Grid item>
                <Tooltip title={'Xem mô tả sản phẩm'}>
                  <IconButton color="secondary">
                    <ImportContactsRounded fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item className={classes.stretch}>
                <NumericInput variant="outlined" size="small" value={amount} onChange={setAmount} />
              </Grid>
              <Grid item>
                {isInCart() ?
                  <Tooltip title={'Đã mua / Bấm để xem giỏ hàng'}>
                    <IconButton color="primary" onClick={props.toggleCart}>
                      <CheckCircleRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  :
                  <Tooltip title={'Thêm vào giỏ'}>
                    <IconButton color="secondary" onClick={onBuy}>
                      <ShoppingCartRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BaseCard>
    </Grid>
  </Grid >
}

RichItemCard.defaultProps = {
  amount: 1,
  body: null,
}

RichItemCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  amount: PropTypes.number,
  body: PropTypes.object,
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCart, toggleCart,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichItemCard);


/**
 * WrapperRichItemCard
 * @param {*} props 
 */
function WrapperRichItemCard(props) {
  return <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
    {props.children}
  </Grid>
}

export { WrapperRichItemCard };