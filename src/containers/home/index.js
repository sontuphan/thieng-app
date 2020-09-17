import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';
import async from 'async';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import Slick, { SlickChild } from 'components/slick';
import Welcome from './welcome';
import Policy from './policy';
import Contact from './contact';

import styles from './styles';
import objectGLB from 'static/images/bamboo.glb';
import objectUSDZ from 'static/images/bamboo.usdz';

import utils from 'helpers/utils';
import { recommendItems } from 'modules/recommendation.reducer';
import { getItem, getFile } from 'modules/bucket.reducer';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
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
    if (!data || !data.length) return this.setState({ items: [] });

    let items = [];
    return async.eachSeries(data, (itemId, cb) => {
      return getItem(itemId).then(item => {
        items.push(item);
        return getFile(item.thumbnailId || item.fileIds[0]);
      }).then(file => {
        items[items.length - 1].thumbnail = file.source;
        return cb();
      }).catch(er => {
        return cb(er);
      });
    }, (er) => {
      if (er) console.error(er);
      return this.setState({ items });
    });
  }

  redirect = (to) => {
    return this.props.history.push(to);
  }

  render() {
    const { classes } = this.props;
    const { items } = this.state;

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
            <Typography variant="h1">Top {items.length} sản phẩm</Typography >
          </Grid>
          <Grid item xs={12}>
            <Slick autoplay centerMode>
              {items.map((item, index) => <SlickChild key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card elevation={4} className={classes.card}>
                      <CardActionArea onClick={() => this.redirect(`/item/${item._id}`)}>
                        <CardMedia image={item.thumbnail} className={classes.media} />
                        <CardContent>
                          <Grid container spacing={2} justify="flex-end">
                            <Grid item xs={12}>
                              <Typography variant="h4">{item.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>{item.descriptions[0]}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="h5">{utils.prettyNumber(item.price, 'long')} ₫</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
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