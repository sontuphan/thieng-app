import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import Drain from 'components/drain';

import styles from './styles';

class MiniShowcase extends Component {

  onView = () => {
    window.open('/mall/' + this.props.object.id, '_blank');
  }

  render() {
    let { classes, object } = this.props;
    let image = object.images[0];
    return <Grid container direction="row" justify="center" spacing={1}>
      <Grid item xs={12}>
        <div className={classes.image} onClick={this.onView}>
          {image.type !== 'png' ?
            <div className={classes.imageJPG}
              style={{
                backgroundImage: `url('${image.url}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }} />
            :
            <div className={classes.imagePNG}
              style={{
                backgroundImage: `url('${image.url}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }} />
          }
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
      <Grid item xs={12} className={classes.cursor} onClick={this.onView}>
        <Typography>{object.name}</Typography>
        <Typography variant="h3">{object.price} {object.unit}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
    </Grid>
  }
}

MiniShowcase.propTypes = {
  object: PropTypes.object.isRequired,
}

export default withStyles(styles)(MiniShowcase);