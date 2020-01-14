import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import styles from './styles';

class MiniShowcase extends Component {

  render() {
    let { classes, object } = this.props;
    let random = Math.floor(Math.random() * object.images.length);
    let image = object.images[random];
    return <Grid container direction="row" justify="center" spacing={1}>
      <Grid item xs={12}>
        <div className={classes.image}
          style={image.type !== 'png' ? {
            backgroundImage: `url('${image.url}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          } : null}>
          <div className={classes.imageShelf}
            style={image.type === 'png' ? {
              backgroundImage: `url('${image.url}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            } : null} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {
            object.tags.map(tag => <Grid item key={tag}>
              <Chip color="primary" label={tag} size="small" />
            </Grid>)
          }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>{object.name}</Typography>
        <Typography variant="h3">{object.price} {object.unit}</Typography>
      </Grid>
    </Grid>
  }
}

MiniShowcase.propTypes = {
  object: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(MiniShowcase));