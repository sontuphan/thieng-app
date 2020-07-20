import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Parallax } from 'rc-scroll-anim';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { getFile, getUser } from 'modules/bucket.reducer';

import styles from './styles';


class Panel extends Component {
  constructor() {
    super();

    this.state = {
      panelUrl: 'https://source.unsplash.com/featured/?interior'
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (!isEqual(prevProps.userId, userId)) {
      this.loadData();
    }
  }

  loadData = (reset = false) => {
    const { userId } = this.props;
    const { getUser, getFile } = this.props;
    if (!userId) return null;
    return getUser(userId, reset).then(user => {
      if (!user || !user.panel) return null;
      return getFile(user.panel);
    }).then(panel => {
      if (!panel || !panel.source) return null;
      return this.setState({ panelUrl: panel.source });
    }).catch(console.error);
  }

  render() {
    const { classes } = this.props;
    return <Grid item xs={12}>
      <div className={classes.panel}>
        <div className={classes.frame}>
          <Parallax
            animation={{ scale: 1.5, playScale: [1, 2] }}
            style={{ transform: 'scale(1)' }}
          >
            <div className={classes.image}
              style={{
                backgroundImage: `url(${this.state.panelUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }} />
          </Parallax>
        </div>
      </div>
    </Grid>
  }
}

Panel.propTypes = {
  userId: PropTypes.string.isRequired
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getFile, getUser,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Panel)));