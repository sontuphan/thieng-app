import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './styles';

class Card extends Component {

  renderCard = () => {
    let { classes } = this.props;
    let { title, subtitle, color, img, width, disabled } = this.props;

    return <Paper className={disabled ? classes.disbaleCard : classes.card} style={{ background: color }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={7} sm={9} md={12}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            {width >= 960 ? <Grid item xs={12} /> : null}
            <Grid item xs={12}>
              <Typography align="center" variant="h3" style={{ color: "#FFF" }}>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" style={{ color: "#FFF" }}>{subtitle}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} sm={3} md={12}>
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
  }
  
  render() {
    let { classes } = this.props;
    let { tooltip, to } = this.props;

    return <Grid container spacing={2} >
      <Grid item xs={12} className={classes.link} component={RouterLink} to={to}>
        {tooltip ? <Tooltip title={tooltip}>
          {this.renderCard()}
        </Tooltip> : this.renderCard()}
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
  to: PropTypes.string,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
}

Card.defaultProps = {
  to: '#',
  tooltip: 'Comming soon'
}

export default withStyles(styles)(Card);