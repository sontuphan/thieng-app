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

import { Favorite, LocalGroceryStore, Settings, Message } from '@material-ui/icons';

import Divider from 'components/divider';

import styles from './styles';

class CarouselSlide extends Component {
  constructor() {
    super();

    this.state = {
      animation: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.objs[0].displayname !== prevProps.objs[0].displayname) {
      this.setState({ animation: " animated zoomIn" }, () => {
        setTimeout(() => {
          this.setState({ animation: null });
        }, 1200);
      });
    }
  }

  renderSlides() {
    let { classes, objs } = this.props;

    let slides = [];
    for (let i = 0; i < objs.length; i++) {
      let obj = objs[i]
      slides.push(
        <Grid item key={i} className={this.state.animation ? classes.slide + this.state.animation : classes.slide}>
          <Card className={classes.card}>
            <CardMedia image={obj.avatar} className={classes.cardMedia} />
            <CardHeader className={classes.cardHeader}
              title={<Typography variant="body2">{obj.displayname}</Typography>}
              disableTypography
            />
            <CardContent className={classes.cardContent}>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Grid container direction="row" justify="flex-start" spacing={1}>
                    <Grid item>
                      <Favorite fontSize="small" />
                    </Grid>
                    <Grid item>
                      <Typography>Tim</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="flex-end" spacing={1}>
                    <Typography>{obj.noOfhearts}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Grid container direction="row" justify="flex-start" spacing={1}>
                    <Grid item>
                      <LocalGroceryStore fontSize="small" />
                    </Grid>
                    <Grid item>
                      <Typography>Sản phẩm</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="flex-end" spacing={1}>
                    <Typography>{obj.noOfProducts}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                    <IconButton color="secondary" size="small">
                      <Message fontSize="small" />
                    </IconButton>
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