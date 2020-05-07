import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';

import { ImageCard } from 'components/cards';

import styles from './styles';
import utils from 'helpers/utils';

class ProductCard extends Component {

  onChip = (tag) => {
    console.log('onChip:', tag);
  }

  render() {
    let { classes, object } = this.props;
    let image = object.images[0];
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} component={Link} href={`/mall/item/${object.id}`}>
              <ImageCard image={image.url} imageType={image.type} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {
                  object.tags.map(tag => <Grid item key={tag}>
                    <Chip
                      className={classes.chip}
                      color="primary"
                      label={tag}
                      size="small"
                      onClick={() => this.onChip(tag)}
                    />
                  </Grid>)
                }
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.cursor} onClick={this.onView}>
              <Typography>{object.name}</Typography>
              <Typography variant="h3">{utils.prettyNumber(object.price, 'long')} vnd</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid >
  }
}

ProductCard.propTypes = {
  object: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProductCard));