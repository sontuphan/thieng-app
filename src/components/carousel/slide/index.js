import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { ThumbUp, LocalGroceryStore, Settings, Message } from '@material-ui/icons';

import Divider from 'components/divider';

import styles from './styles';
import designerImg from 'static/images/designer.jpg';

class CarouselSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objs: props.objs
    }
  }

  renderSlides() {
    let slides = [];
    let { classes } = this.props;
    for (let i = 0; i < this.state.objs.length; i++) {
      slides.push(
        <Grid item key={i} xs={10} className={classes.slide}>
          <Card className={classes.card}>
            <CardMedia image={designerImg} className={classes.cardMedia} />
            <CardHeader className={classes.cardHeader}
              title={<Typography variant="body2">Lena</Typography>}
              disableTypography
            />
            <CardContent className={classes.cardContent}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    <Grid item>
                      <ThumbUp fontSize="small" />
                    </Grid>
                    <Grid item>
                      <Typography>Thích</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                    <Typography>31.257</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    <Grid item>
                      <LocalGroceryStore fontSize="small" />
                    </Grid>
                    <Grid item>
                      <Typography>Sản phẩm</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                    <Typography>57</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={8}>
                  <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                    <IconButton color="secondary" size="small">
                      <Message fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                    <IconButton color="secondary" size="small">
                      <Settings fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )
    }
    return slides;
  }

  render() {
    let { classes } = this.props;
    return <Grid container spacing={2} className={classes.slides}>
      {this.renderSlides()}
    </Grid>
  }
}

CarouselSlide.propTypes = {
  objs: PropTypes.array,
}

export default withStyles(styles)(CarouselSlide);