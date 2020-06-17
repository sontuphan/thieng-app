import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Image from 'material-ui-image';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Carousel from 'components/carousel';
import Welcome from './welcome';
import Policy from './policy';
import Contact from './contact';

import styles from './styles';
import peopleImg from 'static/images/people.svg';


const NAMES = ['Mirror', 'Lamp', 'Chair', 'Desk', 'Lamp']
const PRODUCTS = NAMES.map(name => ({
  displayname: name,
  avatar: 'https://source.unsplash.com/featured/?interior',
  content: [
    {
      icon: 'like',
      key: 'Thích',
      value: Math.floor(Math.random() * 10000)
    },
    {
      icon: 'product',
      key: 'Đã bán',
      value: Math.floor(Math.random() * 100)
    }
  ]
}))

class Home extends Component {

  componentDidMount() {
    this.scrollToHash();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.location) !== JSON.stringify(this.props.location))
      this.scrollToHash();
  }

  scrollToHash = () => {
    const { location: { hash } } = this.props;
    if (!hash) return console.warn('Invalid hashtag');
    const id = hash.replace('#', '');
    const e = window.document.getElementById(id);
    if (!e) return console.error('Invalid component');
    return setTimeout(() => e.scrollIntoView(), 100);
  }

  onMore = () => {
    return this.props.history.push('/mall');
  }

  render() {
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={6}>
        <Welcome />
      </Grid>
      <Grid item xs={12} md={6}>
        <Image src={peopleImg} aspectRatio={(568 / 485)} />
      </Grid>
      <Grid item xs={12}>
        <Drain large />
      </Grid>
      <Grid item xs={12} md={6}>
        <Policy />
      </Grid>
      <Grid item xs={12} md={6}>
        <Carousel
          title="Top 10"
          subtitle="Sản phẩm"
          objects={PRODUCTS}
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

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home)));