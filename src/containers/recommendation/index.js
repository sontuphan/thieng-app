import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ShuffleRounded } from '@material-ui/icons';

import { LiteItemCard } from 'components/cards/item';

import styles from './styles';
import { recommendItems } from 'modules/recommendation.reducer';


class Recommendation extends Component {

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { quantity, recommendItems } = this.props;
    return recommendItems({ status: 'selling' }, quantity);
  }

  onShuffle = () => {
    this.loadData();
  }

  render() {
    const { classes } = this.props;
    const { recommendation: { data } } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
          <Grid item className={classes.stretch}>
            <Typography variant="h4">Gợi ý cho bạn</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ShuffleRounded />}
              onClick={this.onShuffle}
            >
              <Typography>Khác</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {data.map((item, i) => <Grid key={i} item xs={6} md={4}>
        <LiteItemCard itemId={item._id} />
      </Grid>)}
    </Grid>
  }
}

const mapStateToProps = state => ({
  recommendation: state.recommendation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  recommendItems,
}, dispatch);

Recommendation.defaultProps = {
  quantity: 6
}

Recommendation.propTypes = {
  itemId: PropTypes.string.isRequired,
  quantity: PropTypes.number
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Recommendation)));