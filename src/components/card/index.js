import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

class Card extends Component {
  render() {
    let { classes } = this.props;
    let { title, subtitle, color, img, width } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.card} style={{ background: color }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={7} md={12}>
              <Grid container justify="center" alignItems="center" spacing={2}>
                {width >= 960 ? <Grid item xs={12} /> : null}
                <Grid item xs={12}>
                  <Typography align="center" variant="h3" style={{ color: "#FFFFFF" }}>{title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center" variant="body2">{subtitle}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5} md={12}>
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                  <div id="image" className={classes.image}
                    style={{
                      backgroundImage: `url('${img}')`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain'
                    }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
}

export default withStyles(styles)(Card);