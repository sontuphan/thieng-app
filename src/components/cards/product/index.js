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
import { loadData } from './module';
import utils from 'helpers/utils';

class ProductCard extends Component {
  constructor() {
    super();

    this.state = {
      source: '',
      type: '',
    }
  }

  componentDidMount() {
    let { thumbnail, files } = this.props;
    if (!thumbnail) thumbnail = files[0];
    return loadData(thumbnail).then(re => this.setState(re.data));
  }

  onChip = (tag) => {
    console.log('onChip:', tag);
  }

  render() {
    let { classes } = this.props;
    let { _id, name, tags, price } = this.props;
    let { source, type } = this.state;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} component={Link} href={`/mall/item/${_id}`}>
              <ImageCard image={source} imageType={type} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {
                  tags.map(tag => <Grid item key={tag}>
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
              <Typography>{name}</Typography>
              <Typography variant="h3">{utils.prettyNumber(price, 'long')} vnd</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid >
  }
}

ProductCard.defaultProps = {
  name: '',
  tags: [],
  files: [],
  price: 0,
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
}

export default withRouter(withStyles(styles)(ProductCard));