import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';
import async from 'async';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Carousel from 'components/carousel';
import Welcome from './welcome';
import Policy from './policy';
import Contact from './contact';

import styles from './styles';
import objectGLB from 'static/images/bamboo.glb';
import objectUSDZ from 'static/images/bamboo.usdz';
// import bg from 'static/images/bg.hdr';

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
    this.scrollToHash();
    this.props.recommendItems({ status: 'selling' }, 10);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.location, this.props.location)) {
      this.scrollToHash();
    }
    if (!isEqual(prevProps.recommendation, this.props.recommendation)) {
      this.loadData()
    }
  }

  scrollToHash = () => {
    const { location: { hash } } = this.props;
    if (!hash) return console.warn('Invalid hashtag');
    const id = hash.replace('#', '');
    const e = window.document.getElementById(id);
    if (!e) return console.error('Invalid component');
    return setTimeout(() => e.scrollIntoView(), 100);
  }

  loadData = () => {
    const { recommendation: { data }, getItem, getFile } = this.props;
    if (!data || !data.length) return this.setState({ products: [] });

    let products = [];
    return async.eachSeries(data, (itemId, cb) => {
      return getItem(itemId).then(item => {
        products.push({ displayname: item.name });
        return getFile(item.thumbnailId || item.fileIds[0])
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

  onMore = () => {
    return this.props.history.push('/mall');
  }

  render() {
    const { classes } = this.props;
    const { products } = this.state;

    return <Grid container spacing={2}>
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
          // skybox-image={bg}
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
      <Grid item xs={12} md={6}>
        <Policy />
      </Grid>
      <Grid item xs={12} md={6}>
        <Carousel
          title={`Top ${products.length}`}
          subtitle="Sản phẩm"
          objects={products}
          onMore={this.onMore}
        />
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