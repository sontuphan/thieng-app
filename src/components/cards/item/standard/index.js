import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import {
  ExpandLessRounded, ExpandMoreRounded, ShoppingCartRounded,
  ShareRounded, RemoveShoppingCartRounded
} from '@material-ui/icons';

import { BaseCard, ImageCard } from 'components/cards';
import { NumericInput } from 'components/inputs';
import { UserCard } from 'components/cards';

import { setCart, toggleCart } from 'modules/cart.reducer';
import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function StandardItemCard(props) {
  // Define hooks
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(props.amount);
  const theme = useTheme();
  const classes = useStyles();
  const data = useData(props.itemId);
  // Define functions
  const onBuy = () => {
    if (!amount) return console.error('Invalid amount');
    return props.setCart({ ...data, amount });
  }
  const onCancel = () => {
    return props.setCart({ ...data, amount: 0 }).then(() => {
      return setAmount(1);
    }).catch(console.error);
  }
  const onCollapse = () => setChecked((prev) => !prev);
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
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} component={Link} to={`/item/${data._id}`}>
                <ImageCard _id={data.thumbnailId} />
              </Grid>
              <Grid item xs={12}>
                <UserCard userId={data.userId || ''} size="small" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {data.tags.map((tag, i) => <Grid item key={i}>
                    <Chip color="primary" label={tag} size="small" />
                  </Grid>)}
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.cursor}>
                <Typography variant="h6">{data.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center" justify="flex-end">
                  <Grid item>
                    <Typography variant="body2">{utils.prettyNumber(data.price * amount, 'long')} ₫</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <NumericInput variant="outlined" size="small" value={amount} onChange={setAmount} />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" size="small" onClick={onBuy} fullWidth >
                  <Typography>Mua</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" size="small" onClick={onCancel} fullWidth  >
                  <Typography>Hủy</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={checked} collapsedHeight={theme.spacing(4)}>
            <Grid item xs={12} style={{ padding: theme.spacing(1) }}>
              {props.body ? props.body :
                <Typography className={classes.longText} noWrap={!checked}>{data.descriptions[0]}</Typography>}
            </Grid>
          </Collapse>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} className={classes.action}>
            <Grid container spaing={2} justify="space-between">
              <Grid item>
                <Tooltip title="Giỏ hàng">
                  <IconButton size="small" onClick={props.toggleCart}>
                    {isInCart() ? <ShoppingCartRounded fontSize="small" color="primary" /> : <RemoveShoppingCartRounded fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Chi tiết">
                  <IconButton size="small" onClick={onCollapse}>
                    {checked ? <ExpandLessRounded fontSize="small" /> : <ExpandMoreRounded fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Chia sẻ">
                  <IconButton size="small" onClick={onVisible}>
                    <ShareRounded fontSize="small" color={visible ? 'primary' : 'inherit'} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BaseCard>
    </Grid>
  </Grid >
}

StandardItemCard.defaultProps = {
  amount: 1,
  body: null,
}

StandardItemCard.propTypes = {
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
)(StandardItemCard);


function WrapperStandardItemCard(props) {
  return <Grid item xs={12} sm={6} md={6} lg={4}>
    <StandardItemCard {...props} />
  </Grid>
}

export { WrapperStandardItemCard };