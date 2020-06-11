import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import { RichComment } from 'components/comments';
import Stall from 'containers/stall';
import Recommendation from 'containers/recommendation';

import { getItem } from 'modules/bucket.reducer';
import { getComments } from 'modules/comments.reducer';

import styles from './styles';

class Item extends Component {
  constructor() {
    super();

    this.state = {
      _id: null,
      isLoading: false,
    }
  }

  handleParams = () => {
    const { match: { params: { id } } } = this.props;
    return this.setState({ _id: id });
  }

  componentDidMount() {
    return this.handleParams();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match, this.props.match)) {
      this.handleParams();
    }
  }

  onSend = () => {
    return console.log('Submit comment');
  }

  onMore = () => {
    return this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 3000);
    });
  }

  render() {
    const { _id } = this.state;
    if (!_id) return null;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Stall itemId={this.state._id} />
      </Grid>

      <Grid item xs={12}>
        <Drain />
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10}>
            <Recommendation itemId={this.state._id} quatity={6} />
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
        </Grid>
      </Grid>


      <Grid item xs={12} md={6}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={10} md={8}>
            <Typography variant="h2">Nhận xét</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <RichComment
              user={this.props.auth}
              comments={this.props.comments.data}
              onSend={this.onSend}
              onMore={this.onMore}
              isLoading={this.state.isLoading}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Drain small />
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  comments: state.comments,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItem,
  getComments,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Item)));