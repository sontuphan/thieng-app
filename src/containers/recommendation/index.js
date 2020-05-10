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

import { ProductCard } from 'components/cards';

import { recommendItems } from 'modules/recommendation.reducer';

import styles from './styles';

class Recommendation extends Component {

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.recommendItems(this.props.quantity);
  }

  onShuffle = () => {
    this.loadData();
  }

  render() {
    // let { classes } = this.props;
    let recommendation = this.props.recommendation.data;

    if (!recommendation) return null;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="space-between" spacing={2}>
              <Grid item>
                <Typography variant="h2">Gợi ý cho bạn</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ShuffleRounded />}
                  onClick={this.onShuffle}
                >
                  <Typography>Khác</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {recommendation.map((obj, index) => <Grid key={index} item xs={6} sm={4}>
            <ProductCard {...obj} />
          </Grid>)}
        </Grid>
      </Grid>
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
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Recommendation)));