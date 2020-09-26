import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import { } from '@material-ui/icons';

import { BaseCard, ImageCard } from 'components/cards';
import { NumericInput } from 'components/inputs';
import { UserCard } from 'components/cards';

import { setCart } from 'modules/cart.reducer';
import { useStyles } from './styles';
import { useData } from './module';
import utils from 'helpers/utils';

function RichItemCard(props) {
  // Define hooks
  const [amount, setAmount] = useState(props.amount);
  const classes = useStyles();
  const data = useData(props.itemId);
  // Define internal functions
  const useBuy = () => {
    if (!amount) return console.error('Invalid amount');
    return props.setCart({ _id: data._id, amount });
  }
  const useCancel = () => {
    return props.setCart({ _id: data._id, amount: 0 }).then(() => {
      return setAmount(1);
    }).catch(console.error);
  }
  // Define functions
  if (!data || data instanceof Error) return null;
  // Render component
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
                    <Typography>{utils.prettyNumber(data.price * amount, 'long')} ₫</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <NumericInput variant="outlined" size="small" value={amount} onChange={setAmount} />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" size="small" onClick={useBuy} fullWidth >
                  <Typography>Mua</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" size="small" onClick={useCancel} fullWidth  >
                  <Typography>Hủy</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>{data.descriptions[0]}</Typography>
          </Grid>
          <Grid item xs={12}>
            {props.body}
          </Grid>
          <Grid item xs={12} /> {/* Safe zone trick*/}
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

});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCart,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichItemCard);