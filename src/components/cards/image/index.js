import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import styles from './styles';

class ImageCard extends Component {

  render() {
    let { classes } = this.props;
    return <Grid container justify="center">
      <Grid item xs={12} onClick={this.props.onClick}>
        <div className={classes.image}>
          {this.props.imageType !== 'png' ?
            <div className={classes.imageJPG}
              style={{
                backgroundImage: `url('${this.props.image}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }} />
            :
            <div className={classes.imagePNG}
              style={{
                backgroundImage: `url('${this.props.image}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }} />
          }
        </div>
      </Grid>
    </Grid>
  }
}

ImageCard.defaultProps = {
  imageType: 'jpg',
  onClick: () => { }
}

ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  imageType: PropTypes.string,
  onClick: PropTypes.func,
}

export default withRouter(withStyles(styles)(ImageCard));