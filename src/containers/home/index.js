import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';
import async from 'async';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import Slick, { SlickChild } from 'components/slick';
import { PortraitCard } from 'components/cards';
import Welcome from './welcome';
import Policy from './policy';
import Contact from './contact';

import styles from './styles';
import objectGLB from 'static/images/bamboo.glb';
import objectUSDZ from 'static/images/bamboo.usdz';

import { recommendItems } from 'modules/recommendation.reducer';
import { getItem, getFile } from 'modules/bucket.reducer';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    this.props.recommendItems({ status: 'selling' }, 10);
  }

  componentDidUpdate(prevProps) {
    const { recommendation } = this.props;
    if (!isEqual(prevProps.recommendation, recommendation)) {
      this.loadData()
    }
  }

  loadData = () => {
    const { recommendation: { data }, getItem, getFile } = this.props;
    if (!data || !data.length) return this.setState({ products: [] });

    let products = [];
    return async.eachSeries(data, (itemId, cb) => {
      return getItem(itemId).then(item => {
        products.push({ _id: item._id, displayname: item.name });
        return getFile(item.thumbnailId);
      }).then(file => {
        products[products.length - 1].avatar = file.source;
        return cb();
      }).catch(er => {
        return cb(er);
      });
    }, (er) => {
      if (er) console.error(er);
      return this.setState({ products });
    });
  }

  redirect = (to) => {
    return this.props.history.push(to);
  }

  render() {
    const { classes } = this.props;
    const { products } = this.state;

    return <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={6}>
        <Welcome />
      </Grid>
      <Grid item xs={12} md={6}>
        <model-viewer
          src={objectGLB}
          ios-src={objectUSDZ}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          quick-look-browsers="safari chrome"
          camera-controls
          auto-rotate
          alt="A 3D model of an astronaut"
          shadow-intensity={1}
          shadow-softness={1.25}
          class={classes.arViewer}
        ></model-viewer>
      </Grid>
      <Grid item xs={12}>
        <Drain large />
      </Grid>
      <Grid item xs={10}>
        <Policy />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Typography variant="h1">Top {products.length} sản phẩm</Typography >
          </Grid>
          <Grid item xs={12}>
            <Slick autoplay centerMode>
              {products.map((product, index) => <SlickChild key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <PortraitCard
                      title={product.displayname}
                      image={product.avatar}
                      onClick={() => this.redirect(`/item/${product._id}`)}
                    />
                  </Grid>
                </Grid>
              </SlickChild>)}
            </Slick>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain large />
      </Grid>
      <Grid item xs={12}>
        <Contact />
      </Grid>
    </Grid >
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  recommendation: state.recommendation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  recommendItems,
  getItem, getFile,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home)));