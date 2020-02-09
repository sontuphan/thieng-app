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
import Mission from './mission';
import Policy from './policy';
import Contact from './contact';

import styles from './styles';
import peopleImg from 'static/images/people.svg';
import designerImg1 from 'static/images/designer-1.jpg';
import designerImg2 from 'static/images/designer-2.jpg';
import designerImg3 from 'static/images/designer-3.jpg';

import { randInterior } from 'data/items';

const DESIGNERS = [
  {
    displayname: 'Maria Guys',
    avatar: designerImg1,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'flower',
        key: 'Thiết kế',
        value: 35
      }
    ]
  },
  {
    displayname: 'Philip Martin',
    avatar: designerImg2,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'flower',
        key: 'Thiết kế',
        value: 35
      }
    ]
  },
  {
    displayname: 'Aiony Haust',
    avatar: designerImg3,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'flower',
        key: 'Thiết kế',
        value: 35
      }
    ]
  },
]

const PRODUCTS = [
  {
    displayname: 'Mirror',
    avatar: randInterior(true).url,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'product',
        key: 'Đã bán',
        value: 35
      }
    ]
  },
  {
    displayname: 'Lamp',
    avatar: randInterior(true).url,
    content: [
      {
        icon: 'like',
        key: 'Thích',
        value: 2245
      },
      {
        icon: 'product',
        key: 'Đã bán',
        value: 35
      }
    ]
  },
]

class Home extends Component {

  componentDidMount() {
    this.scrollToHash();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.location) !== JSON.stringify(this.props.location))
      this.scrollToHash();
  }

  scrollToHash = () => {
    let hash = this.props.location.hash;
    if (!hash) return;
    let id = hash.replace('#', '');
    let e = window.document.getElementById(id);
    if (!e) return;
    setTimeout(() => {
      e.scrollIntoView();
    }, 100);
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
        <Mission />
      </Grid>
      <Grid item xs={12} md={6}>
        <Carousel
          title="Top 10"
          subtitle="Nhà thiết kế"
          objects={DESIGNERS}
        />
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
        />
      </Grid>
      <Grid item xs={12}>
        <Drain large />
      </Grid>
      <Grid item xs={12} id="contact">
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