import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {
  MoreHoriz, ShoppingCartRounded,
  ShareRounded, DoneRounded
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
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(props.amount);
  const classes = useStyles();
  const data = useData(props.itemId);
  // Define functions
  const onBuy = () => {
    if (!amount) return console.error('Invalid amount');
    return props.setCart({ ...data, amount });
  }
  const onVisible = () => setVisible((prev) => !prev);
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
                <Tooltip title={'Chia sẻ'}>
                  <IconButton size="small" onClick={onVisible}>
                    <ShareRounded color={visible ? 'primary' : 'inherit'} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={'Chức năng khác'}>
                  <IconButton size="small">
                    <MoreHoriz />
                  </IconButton>
                </Tooltip>
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
              <Grid item className={classes.stretch}>
                <NumericInput variant="outlined" size="small" value={amount} onChange={setAmount} />
              </Grid>
              <Grid item>
                {isInCart() ?
                  <Button
                    startIcon={<DoneRounded fontSize="small" />}
                    color="secondary"
                    size="small"
                    onClick={props.toggleCart}
                    fullWidth
                  >
                    <Typography noWrap>Đã mua</Typography>
                  </Button>
                  :
                  <Button
                    startIcon={<ShoppingCartRounded fontSize="small" />}
                    color="primary"
                    size="small"
                    onClick={onBuy}
                    fullWidth
                  >
                    <Typography noWrap>Mua</Typography>
                  </Button>}
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