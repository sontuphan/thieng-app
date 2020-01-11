import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { } from '@material-ui/icons';

import Drain from 'components/drain';
import Showcase from 'components/showcase';

import styles from './styles';
import designerImg4 from 'static/images/designer-4.jpg';
import product from 'static/images/product.png';
import interior1 from 'static/images/interior-1.jpg';
import interior2 from 'static/images/interior-2.jpg';
import interior3 from 'static/images/interior-3.jpg';

class Mall extends Component {
  constructor() {
    super();

    this.state = {
      amount: 1,
      author: {
        displayname: "Remy Sharp lajsdb asnbli asdbkl",
        avatar: designerImg4,
        link: '/artist/remy-sharp'
      },
      objects: [
        {
          name: "Tellus lacus vitae nisl.",
          description1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem amet sem mus in in fermentum gravida id luctus.",
          description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum urna tempus adipiscing amet dignissim.",
          price: "6.490.000",
          unit: "vnd",
          tags: ["New", "20%"],
          images: [
            {
              url: product,
              type: 'png',
              color: "#B28B67"
            },
            {
              url: interior1,
              type: 'jpg',
              color: "#915B3C"
            },
            {
              url: interior2,
              type: 'jpg',
              color: "#1C1D1A"
            },
            {
              url: interior3,
              type: 'jpg',
              color: null
            }
          ]
        }
      ]
    }
  }

  onColor = (color) => {
    console.log(color);
  }

  render() {
    // let { classes } = this.props;
    let object = this.state.objects[0];

    return <Fragment>
      <Grid item xs={12} md={6}>
        <Showcase author={this.state.author} objects={object.images} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Drain />
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Grid container spacing={1}>
              {
                object.tags.map(tag => <Grid item key={tag}>
                  <Chip color="primary" label={tag} size="small" />
                </Grid>)
              }
            </Grid>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography variant="h1">{object.name}</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>{object.description1}</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <Typography>{object.description2}</Typography>
          </Grid>
          <Drain />
          <Grid item xs={10} md={8}>
            <Typography variant="h1">{object.price} {object.unit}</Typography>
          </Grid>
          <Drain />
          <Grid item xs={10} md={8}>
            <TextField label="Số lượng" size="small" variant="outlined" color="secondary" value={this.state.amount} fullWidth />
          </Grid>
          <Grid item xs={10} md={8}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" size="large" fullWidth>
                  <Typography>Mua</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" size="large" fullWidth>
                  <Typography>Huỷ</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Drain />
    </Fragment>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Mall)));